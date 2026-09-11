#!/usr/bin/env python3
"""히어로 이름 로고(LIFE:ON LAB)를 별 3장 + 글자 1장으로 가르는 스크립트.

2026-08 판(NOMAD Lab, split-wordmark.py)은 끈·구슬까지 열 장으로 갈랐다.
그건 끈 흔들림·구슬 미끄러짐 애니메이션이 있었기 때문인데, 그 움직임은
2026-08-12/13 에 이미 뺐다(정적). 2026-09-11 로고 교체(LIFE:ON LAB) 이후
실제로 살아 있는 애니메이션은 별 반짝임(wmTwinkle/wmFlash)과 글자 위 빛
지나가기(wmShine)뿐이라, 이번엔 처음부터 두 종류로만 가른다:
  ① star1~3 — 몸통과 완전히 떨어진 작은 반짝임.
  ② letters — 나머지 전부(고리·끈·구슬·사각형·글자·리본 한 장).
     흐름을 잡는 유일한 겹이자 빛 지나가기의 마스크 대상이다.

사용법 (저장소 루트에서):
    python3 tools/build-wordmark.py

  필요 패키지: pillow, numpy, scipy

언제 다시 돌리나
    logo-fullname.png 를 새로 렌더링했을 때만. 그림이 그대로면 돌릴 일이 없다.
    STAR_LABELS 는 원본을 라벨링했을 때 나온 연결요소 번호를 손으로 박아 둔
    것이다 — 원본이 바뀌면 아래 '① 연결요소 확인' 단계를 다시 밟아 몇 번이
    별인지 확인부터 해야 한다(끝에 찍히는 목록으로 확인할 것).
    다시 돌린 뒤에는 맨 끝에 찍히는 값들을 index.html 의 인라인 style/alt·
    width·height 와 style.css 의 .wm-star-N 에 옮겨 적어야 한다(그림에
    딸린 값이라 자동으로 안 따라간다).

가르는 원리
    ① 연결요소 확인 — 알파>60 기준으로 라벨링하면 원본마다 몇 개의 조각으로
       쪼개지는지 나온다. 몸통(고리+끈+대부분의 글자)과 완전히 떨어진 작은
       조각이 별이다. 몸통에 닿아 있는 장식(예: 이번 판의 별 하나는 끈에
       닿아 있다)은 애니메이션을 못 주므로 몸통 쪽(letters)에 남긴다.
    ② 반투명 가장자리 배정 — 이 그림은 전체에 은은한 번짐(광원)이 깔려 있어
       (알파 1~60 인 픽셀이 core 에서 최대 200px 가까이 퍼져 있다), 무작정
       최근접으로만 배정하면 외딴 별이 주변 빈 캔버스의 옅은 번짐을 전부
       끌어와 자르는 상자가 실제 별보다 훨씬 커진다. 그래서 별에는 반경
       GLOW_R 안의 번짐만 붙이고, 그보다 먼 건 전부 letters(기본값, 어차피
       캔버스 전체를 쓰는 겹)로 보낸다.

두 가지를 지킨다
    · 모든 픽셀이 정확히 한 겹에만 들어간다. 네 장을 겹치면 원본과 픽셀
      단위로 같은 그림이 된다(모션 줄이기 설정에서 애니메이션이 꺼지면
      그 상태가 그대로 보인다) — 스크립트가 끝에 이를 직접 검증한다.
    · letters 는 항상 원본 화폭 그대로 자른다(0,0,W,H) — 흐름에 남는
      유일한 겹이라 히어로 높이의 기준이 되기 때문이다.
"""
import colorsys
import json
import os
from math import ceil

import numpy as np
from PIL import Image
from scipy import ndimage

SRC = 'images/logo/logo-fullname.png'
OUT = 'images/logo/wordmark'
SMALL = f'{OUT}/w800'
SMALL_CANVAS = 800
WEBP_QUALITY = 86
PAD = 4          # 별을 자를 때 알파 상자 둘레에 더하는 여백(px)
GLOW_R = 40      # 반투명 번짐을 별에 붙이는 최대 반경(px) — 위 docstring 참고

# 2026-09-11, logo-fullname.png 를 한 번 라벨링해 확인한 값(알파>60 기준).
# comp2(분홍, 우상단) comp7(주황, L 위) comp11(초록, 좌하단) = 몸통과 완전히
# 떨어진 별 셋. comp12(보라, 우하단)는 끈에 닿아 있어 letters 에 남는다.
STAR_LABELS = [2, 7, 11]


def shrink_premultiplied(im, w, h):
    """RGBA 그림을 (w,h) 로 줄인다. 알파를 곱해 두고 줄인 뒤 다시 나눈다 —
    그냥 줄이면 투명한 자리의 검정이 이웃 픽셀에 섞여 가장자리에 검은 테가
    생긴다(images/logo/README.md 에 같은 경고가 있다)."""
    a = np.array(im.convert('RGBA'), float)
    al = a[..., 3:4]
    pm = np.concatenate([a[..., :3] * (al / 255), al], 2)
    sm = np.array(Image.fromarray(pm.astype(np.uint8)).resize((w, h), Image.LANCZOS), float)
    aa = np.clip(sm[..., 3:4], 0, 255)
    rgb = np.where(aa > 0, sm[..., :3] / np.maximum(aa / 255, 1e-6), 0)
    return Image.fromarray(np.clip(np.concatenate([rgb, aa], 2), 0, 255).astype(np.uint8))


def main():
    if not os.path.exists(SRC):
        raise SystemExit(f'원본을 찾을 수 없다: {SRC} (저장소 루트에서 실행할 것)')
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(SMALL, exist_ok=True)

    im = Image.open(SRC).convert('RGBA')
    a = np.array(im)
    H, W = a.shape[:2]
    alpha = a[..., 3]
    full, core = alpha > 0, alpha > 60

    lab0, n0 = ndimage.label(core, np.ones((3, 3)))
    sizes = ndimage.sum(core, lab0, range(1, n0 + 1))
    print(f'연결요소 {n0}개 (알파>60 기준) — 원본이 바뀌었다면 아래에서 별 번호를 다시 확인할 것')
    order = np.argsort(-sizes)
    for i in order:
        comp = i + 1
        ys, xs = np.nonzero(lab0 == comp)
        flag = ' ← STAR_LABELS' if comp in STAR_LABELS else ''
        print(f'  comp {comp}: size={sizes[i]:.0f} bbox x[{xs.min()},{xs.max()}] '
              f'y[{ys.min()},{ys.max()}]{flag}')
    missing = set(STAR_LABELS) - set(np.unique(lab0))
    if missing:
        raise SystemExit(f'STAR_LABELS 중 없는 라벨: {missing}')

    seed = np.zeros((H, W), np.int32)  # 0=미배정, 1..3=별, 4=letters(나머지 전부)
    names = ['star1', 'star2', 'star3', 'letters']
    for i, lbl in enumerate(STAR_LABELS, 1):
        seed[lab0 == lbl] = i
    seed[core & (seed == 0)] = 4

    star_mask = np.isin(lab0, STAR_LABELS)
    dist_star, idx_star = ndimage.distance_transform_edt(~star_mask, return_indices=True)
    unassigned = full & (seed == 0)
    near_star = unassigned & (dist_star <= GLOW_R)
    final = seed.copy()
    final[near_star] = seed[idx_star[0][near_star], idx_star[1][near_star]]
    final[unassigned & ~near_star] = 4

    recon = np.zeros_like(a)
    for i in range(1, 5):
        recon[final == i] = a[final == i]
    if not np.array_equal(recon, a):
        raise SystemExit('배정이 원본과 어긋난다 — 더 진행하면 안 된다')
    print('무손실 분해 확인: 네 겹을 합치면 원본과 픽셀 단위로 같다')

    lay = {}
    for i, n in enumerate(names, 1):
        out = np.zeros_like(a)
        m = final == i
        out[m] = a[m]
        lay[n] = out

    geo = {}
    for n in names:
        img = lay[n]
        ys, xs = ndimage.find_objects(img[..., 3] > 0)[0]
        if n == 'letters':
            x0, y0, x1, y1 = 0, 0, W, H
        else:
            x0, y0 = max(0, xs.start - PAD), max(0, ys.start - PAD)
            x1, y1 = min(W, xs.stop + PAD), min(H, ys.stop + PAD)
        sub = Image.fromarray(img[y0:y1, x0:x1])
        sub.save(f'{OUT}/{n}.png', optimize=True)
        sub.save(f'{OUT}/{n}.webp', quality=WEBP_QUALITY, method=6, exact=True)
        smaller = shrink_premultiplied(sub, max(1, ceil(sub.width * SMALL_CANVAS / W)),
                                        max(1, ceil(sub.height * SMALL_CANVAS / W)))
        smaller.save(f'{SMALL}/{n}.webp', quality=WEBP_QUALITY, method=6, exact=True)
        geo[n] = dict(x=x0, y=y0, w=x1 - x0, h=y1 - y0, smallw=smaller.width,
                      left=round(x0 / W * 100, 4), top=round(y0 / H * 100, 4),
                      width=round((x1 - x0) / W * 100, 4))

    # letters-mask.png — wm-shine 이 쓰는 흑백 마스크. letters 알파를 500px 로
    # 줄이고 8단계로 뭉갠다(자세한 이유는 images/logo/README.md).
    la = lay['letters'][..., 3]
    mw = 500
    mh = round(H * mw / W)
    ms = Image.fromarray(la).resize((mw, mh), Image.LANCZOS)
    mq = ms.point(lambda v: 0 if v < 24 else min(255, (v // 32) * 32 + 16))
    Image.merge('LA', (Image.new('L', (mw, mh), 255), mq)).save(
        f'{OUT}/letters-mask.png', optimize=True)

    origins, flash = {}, {}
    for i, n in enumerate(names[:3], 1):
        m = (final == i) & (alpha > 60)
        ys, xs = np.nonzero(m)
        g = geo[n]
        origins[n] = (round((xs.mean() - g['x']) / g['w'] * 100, 1),
                      round((ys.mean() - g['y']) / g['h'] * 100, 1))
        rgb = a[..., :3][m].astype(float).mean(axis=0) / 255
        h_, s_, v_ = colorsys.rgb_to_hsv(*rgb)
        r2, g2, b2 = colorsys.hsv_to_rgb(h_, min(1.0, s_ * 2.6), v_)
        flash[n] = tuple(int(round(c * 255)) for c in (r2, g2, b2))

    print('\n── index.html <picture> (별) ──')
    for i, n in enumerate(names[:3], 1):
        g = geo[n]
        f = g['width'] / 100
        sizes_attr = (f'(min-width:1080px) {1016 * f:.0f}px,'
                      f'(min-width:861px) calc((100vw - 64px)*{f:.4f}),'
                      f'(min-width:641px) calc((100vw - 48px)*{f:.4f}),'
                      f'(min-width:481px) calc((100vw - 40px)*{f:.4f}),'
                      f'calc((100vw - 32px)*{f:.4f})')
        print(f'<picture><source type="image/webp" sizes="{sizes_attr}" '
              f'srcset="{OUT}/w800/{n}.webp {g["smallw"]}w, {OUT}/{n}.webp {g["w"]}w">'
              f'<img class="wm-layer wm-star wm-star-{i}" '
              f'style="left:{g["left"]}%;top:{g["top"]}%;width:{g["width"]}%" '
              f'src="{OUT}/{n}.png" alt="" width="{g["w"]}" height="{g["h"]}"></picture>')

    print('\n── index.html <picture> (letters) ──')
    g = geo['letters']
    print(f'<img class="wm-letters" src="{OUT}/letters.png" alt="LIFE:ON LAB" '
          f'width="{g["w"]}" height="{g["h"]}" fetchpriority="high"> '
          f'(srcset small={g["smallw"]}w big={g["w"]}w)')

    print('\n── style.css .wm-star-N ──')
    for i, n in enumerate(names[:3], 1):
        print(f'  .wm-star-{i}  transform-origin: {origins[n][0]}% {origins[n][1]}%;  '
              f'--flash-rgb: {flash[n][0]}, {flash[n][1]}, {flash[n][2]};')

    json.dump({'canvas': [W, H], 'layers': geo, 'origins': origins, 'flash': flash},
              open(f'{OUT}/geometry.json', 'w'), indent=1)
    total = sum(os.path.getsize(f'{OUT}/{n}.webp') for n in names)
    print(f'\n{OUT}/ 에 {len(names)}겹 저장. WebP 합계 {total/1024:.0f} KB')


if __name__ == '__main__':
    main()
