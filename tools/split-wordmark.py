#!/usr/bin/env python3
"""히어로 이름 로고를 움직일 수 있는 열 겹으로 가르는 스크립트.

첫 화면의 이름 로고(images/logo/logo-fullname.png)는 3D 렌더 한 장이라
그대로는 끈·구슬·별을 따로 움직일 수 없다. 이 스크립트가 그 한 장을
images/logo/wordmark/ 아래 열 장으로 갈라 놓고, index.html·style.css 에
넣을 좌표와 키프레임 값을 찍어 준다.

사용법 (저장소 루트에서):
    python3 tools/split-wordmark.py

  필요 패키지: pillow, numpy, scipy

언제 다시 돌리나
    logo-fullname.png 를 새로 렌더링했을 때만. 그림이 그대로면 돌릴 일이 없다.
    다시 돌린 뒤에는 맨 끝에 찍히는 값들을 index.html 의 인라인 style 과
    style.css 의 @keyframes wmSway*, .wm-d/.wm-star-* 에 옮겨 적어야 한다.
    (좌표가 그림에 딸린 값이라 자동으로 따라가지 않는다.)
    끝에 같이 찍히는 wmSlide* (구슬이 끈을 따라 미끄러지는 값)은 지금 쓰지 않는다
    — 2026-08-12 에 뺐다. 되살릴 때를 위해 계산만 남겨 두었다.

가르는 원리
    ① 별  — 글자에서 완전히 떨어져 있어 연결요소만 세면 나온다.
    ② 끈  — 굵기로 가른다. 반지름 13px 원으로 형태학적 열림(opening)을 하면
            굵은 글자만 남고 얇은 끈은 지워진다. 그 차집합이 끈이다.
            색으로 가르려 하면 안 된다 — 끈(크림)과 'Noh'·'Digital'(노랑)이
            너무 가깝다.
    ③ 구슬 — 원판이다. 거리변환의 극대점이 중심(반지름 38px)이다.
            원판 안이라도 끈에 해당하는 픽셀은 빼고, 바깥테는 색으로 한 번 더
            거른다(파랑은 B-R, 분홍은 R+B-2G). 이걸 안 하면 끈이 구슬과 만나며
            굵어지는 자리가 구슬에 딸려 들어가, 구슬이 끈에서 따로 움직일 때
            같이 끌려간다.
    ④ 글자 — 나머지. 나비매듭의 매듭도 여기 들어간다(묶인 곳이라 붙박이가 맞다).

두 가지를 지킨다
    · 모든 픽셀이 정확히 한 겹에만 들어간다. 반투명한 가장자리까지 최근접
      배정으로 나눠 주므로, 열 장을 겹치면 원본과 픽셀 단위로 같은 그림이 된다.
      (모션 줄이기 설정에서 애니메이션이 꺼지면 그 상태가 그대로 보인다.)
    · 가려져 있던 자리를 그려 넣는다. 끈은 글자 뒤·구슬 밑으로 지나가느라
      그 부분이 원본에 없다. 움직이면 없는 자리가 드러나므로,
      글자 뒤로는 11px 연장하고 구슬 밑으로는 끈 단면을 쓸어서 이어 붙인다.
"""
import json
import os
import sys
from math import ceil

import numpy as np
from PIL import Image
from scipy import ndimage

SRC = 'images/logo/logo-fullname.png'
OUT = 'images/logo/wordmark'
# 좁은 화면용 축소본. 화폭 800px 은 눈대중이 아니다 — 가장 넓은 휴대폰(430px)에서
# 로고가 398px 로 보이고, 배율 2배 화면이면 796px 이 필요하다. 딱 그만큼이다.
# 이 한 벌로 배율 2배 휴대폰 전 기종이 덮인다(배율 3배는 1194px 이 필요해 원본을 받는다).
SMALL = 'images/logo/wordmark/w800'
SMALL_CANVAS = 800

# 구슬 중심·반지름 (거리변환 극대점에서 읽은 값). 원본이 바뀌면 다시 재야 한다.
BEADS = {'beadBlue': (1130, 111, 38), 'beadPink': (107, 599, 38)}
# 끈 조각을 흔들림 단위로 묶는 방법. 구슬이 단위 '경계'가 아니라 '안쪽'에
# 오도록 묶는 게 핵심이다 — 경계에 두면 양옆 끈이 따로 흔들려 구슬에서 끈이 꺾인다.
UNITS = {'cordA': [1, 2], 'cordB': [5], 'cordC': [3, 4, 6], 'cordD': [7]}
BEAD_UNIT = {'beadBlue': 'cordA', 'beadPink': 'cordC'}
# 흔들림 진폭 (원본 픽셀). 글자 뒤 연장분(11px)보다 반드시 작아야 한다.
SWAY = {'cordA': 3.8, 'cordB': 3.2, 'cordC': 3.8}
SLIDE = 12          # 구슬이 끈을 따라 미끄러지는 거리 (원본 픽셀). 지금은 미사용.
WEBP_QUALITY = 86


def shrink(im, k):
    """RGBA 그림을 k 배로 줄인다.

    ⚠ 알파를 곱해 두고(premultiply) 줄인 뒤 다시 나눈다. 그냥 줄이면 투명한
      자리의 검정(0,0,0)이 이웃 픽셀에 섞여 글자 가장자리에 검은 테가 생긴다
      (images/logo/README.md 에 같은 경고가 있다).
    """
    a = np.array(im.convert('RGBA'), float)
    al = a[..., 3:4]
    pm = np.concatenate([a[..., :3] * (al / 255), al], 2)
    # 내림이 아니라 올림이다. 반올림하면 겹에 따라 필요한 폭보다 0.5px 모자랄 수
    # 있고, 그러면 그 겹만 원본을 받아 열 겹의 크기가 섞인다(주석의 약속이 깨진다).
    w, h = max(1, ceil(im.width * k)), max(1, ceil(im.height * k))
    sm = np.array(Image.fromarray(pm.astype(np.uint8)).resize((w, h), Image.LANCZOS), float)
    aa = np.clip(sm[..., 3:4], 0, 255)
    rgb = np.where(aa > 0, sm[..., :3] / np.maximum(aa / 255, 1e-6), 0)
    return Image.fromarray(np.clip(np.concatenate([rgb, aa], 2), 0, 255).astype(np.uint8))


def disk(r):
    y, x = np.ogrid[-r:r + 1, -r:r + 1]
    return x * x + y * y <= r * r


def main():
    if not os.path.exists(SRC):
        sys.exit(f'원본을 찾을 수 없다: {SRC} (저장소 루트에서 실행할 것)')
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(SMALL, exist_ok=True)

    a = np.array(Image.open(SRC).convert('RGBA'))
    H, W = a.shape[:2]
    alpha = a[..., 3]
    full, core = alpha > 0, alpha > 60
    rgbi = a[..., :3].astype(int)
    Y, X = np.mgrid[0:H, 0:W]

    # ── ① 별: 글자와 떨어진 작은 연결요소
    lab0, n0 = ndimage.label(core, np.ones((3, 3)))
    sz0 = ndimage.sum(core, lab0, range(1, n0 + 1))
    star_ids = [i + 1 for i in range(n0) if sz0[i] < 5000]
    star_masks = [lab0 == c for c in star_ids]
    stars = np.isin(lab0, star_ids)

    # ── ② 끈: 굵기로 가른다
    body = core & ~stars
    op = ndimage.binary_opening(body, disk(13))
    thick = ndimage.binary_dilation(op, disk(3)) & body
    cord = body & ~thick

    # ── ③ 구슬: 원판 ∩ 끈 아님 ∩ (안쪽이거나 색이 맞거나)
    blueness = rgbi[..., 2] - rgbi[..., 0]                       # 파랑구슬 +23 / 끈 -62
    pinkness = rgbi[..., 0] + rgbi[..., 2] - 2 * rgbi[..., 1]    # 분홍구슬 +47 / 끈 -5
    coltest = {'beadBlue': blueness > -15, 'beadPink': pinkness > 12}
    bead_masks = {}
    for k, (cx, cy, r) in BEADS.items():
        rr2 = (X - cx) ** 2 + (Y - cy) ** 2
        bead_masks[k] = (rr2 <= (r + 2) ** 2) & core & ~cord & ((rr2 <= 26 ** 2) | coltest[k])

    letters = thick & ~bead_masks['beadBlue'] & ~bead_masks['beadPink']

    labC, nC = ndimage.label(cord, np.ones((3, 3)))
    szC = ndimage.sum(cord, labC, range(1, nC + 1))
    keep = [i + 1 for i in range(nC) if szC[i] >= 300]
    arcs = {j: labC == c for j, c in enumerate(keep, 1)}
    print(f'끈 조각 {len(arcs)}개 (300px 미만 부스러기는 최근접 조각에 흡수)')
    if len(arcs) != 7:
        print('  ⚠ 조각 수가 7이 아니다 — UNITS 의 번호 묶음을 다시 확인할 것')

    names, masks = [], []
    for i, m in enumerate(star_masks, 1):
        names.append(f'star{i}'); masks.append(m)
    for k in BEADS:
        names.append(k); masks.append(bead_masks[k])
    for u, ids in UNITS.items():
        m = np.zeros((H, W), bool)
        for i in ids:
            m |= arcs[i]
        names.append(u); masks.append(m)
    names.append('letters'); masks.append(letters)

    # ── 반투명 가장자리까지 정확히 한 겹씩 배정
    seed = np.zeros((H, W), np.int32)
    for i, m in enumerate(masks):
        seed[m] = i + 1
    un = full & (seed == 0)
    _, ii = ndimage.distance_transform_edt(seed == 0, return_indices=True)
    final = seed.copy()
    final[un] = seed[ii[0][un], ii[1][un]]
    recon = np.zeros_like(a)
    for i in range(len(names)):
        m = final == i + 1
        recon[m] = a[m]
    if not np.array_equal(recon, a):
        sys.exit('배정이 원본과 어긋난다 — 더 진행하면 안 된다')
    print('무손실 분해 확인: 열 겹을 합치면 원본과 픽셀 단위로 같다')

    lay = {}
    for i, n in enumerate(names):
        out = np.zeros_like(a); m = final == i + 1; out[m] = a[m]; lay[n] = out
    letters_solid = lay['letters'][..., 3] >= 200

    def bilinear(img, xs, ys):
        x0 = np.clip(np.floor(xs).astype(int), 0, W - 2)
        y0 = np.clip(np.floor(ys).astype(int), 0, H - 2)
        fx = (xs - np.floor(xs))[..., None]; fy = (ys - np.floor(ys))[..., None]
        p = img.astype(float)
        return (p[y0, x0] * (1 - fx) * (1 - fy) + p[y0, x0 + 1] * fx * (1 - fy)
                + p[y0 + 1, x0] * (1 - fx) * fy + p[y0 + 1, x0 + 1] * fx * fy)

    # ── 구슬 밑에 감춰져 있던 끈을 단면 쓸기로 되살린다
    slides = {}
    for bead, (cx, cy, r) in BEADS.items():
        img = lay[BEAD_UNIT[bead]]
        r2 = (X - cx) ** 2 + (Y - cy) ** 2
        ring = (img[..., 3] > 60) & (r2 > 44 ** 2) & (r2 < 125 ** 2)
        ys, xs = np.nonzero(ring)
        pts = np.stack([xs - cx, ys - cy], 1).astype(float)
        _, _, vt = np.linalg.svd(pts - pts.mean(0), full_matrices=False)
        ax = vt[0] / np.linalg.norm(vt[0])
        if ax[0] < 0:
            ax = -ax
        nrm = np.array([-ax[1], ax[0]])
        t, nn = pts @ ax, pts @ nrm
        S = np.array([(t[(t >= lo) & (t < lo + 15)].mean(), nn[(t >= lo) & (t < lo + 15)].mean())
                      for lo in range(-120, 120, 15) if ((t >= lo) & (t < lo + 15)).sum() > 40])
        c2 = np.polyfit(S[:, 0], S[:, 1], 2)     # 끈 중심선의 2차 근사

        HW, TA, SPAN = 11.0, 50.0, 58.0
        tt = np.arange(-SPAN, SPAN, 0.4); nv = np.arange(-HW, HW, 0.4)
        TT, NN = np.meshgrid(tt, nv, indexing='ij')
        prof = [bilinear(img,
                         cx + ax[0] * ts + nrm[0] * (np.polyval(c2, ts) + nv),
                         cy + ax[1] * ts + nrm[1] * (np.polyval(c2, ts) + nv)) for ts in (-TA, TA)]
        w = ((TT + SPAN) / (2 * SPAN))[..., None]
        col = prof[0][None, :, :] * (1 - w) + prof[1][None, :, :] * w
        gx = cx + ax[0] * TT + nrm[0] * (np.polyval(c2, TT) + NN)
        gy = cy + ax[1] * TT + nrm[1] * (np.polyval(c2, TT) + NN)
        gxi = np.clip(np.round(gx).astype(int), 0, W - 1)
        gyi = np.clip(np.round(gy).astype(int), 0, H - 1)
        canvas = np.zeros((H, W, 4)); cnt = np.zeros((H, W))
        np.add.at(canvas, (gyi, gxi), col); np.add.at(cnt, (gyi, gxi), 1)
        ok = cnt > 0; canvas[ok] /= cnt[ok][..., None]

        rr = np.sqrt(r2)
        under = ok & (lay[bead][..., 3] >= 250)          # 구슬이 완전히 덮은 안쪽 → 통째 교체
        img[under] = np.clip(canvas[under], 0, 255).astype(np.uint8)
        # 구슬 둘레의 접촉 음영: 원본에 구워져 있어 구슬만 비키면 끈에 혹처럼 남는다.
        # 색만 깨끗한 단면으로 섞고 알파(실루엣)는 건드리지 않는다 —
        # 알파까지 바꾸면 끈 바깥으로 번져 정지 화면이 원본과 달라진다.
        edge = ok & ~under & (rr <= 56) & (img[..., 3] > 0)
        ww = np.clip((rr - 42.0) / 14.0, 0, 1)[edge][..., None]
        img[..., :3][edge] = np.clip(canvas[..., :3][edge] * (1 - ww)
                                     + img[..., :3][edge].astype(float) * ww, 0, 255).astype(np.uint8)
        print(f'{bead}: 구슬 밑·둘레 끈 {int((under | edge).sum())}px 재구성 '
              f'(접선각 {np.degrees(np.arctan2(ax[1], ax[0])):+.1f}°)')
        slides[bead] = [[round((ax * d + nrm * (np.polyval(c2, d) - np.polyval(c2, 0)))[0] / W * 100, 4),
                         round((ax * d + nrm * (np.polyval(c2, d) - np.polyval(c2, 0)))[1] / H * 100, 4)]
                        for d in (-SLIDE, SLIDE)]

    # ── 글자 뒤로 끈 끝을 연장 (흔들려도 옆으로 삐져나오지 않게)
    for u in UNITS:
        img = lay[u]; m = img[..., 3] > 0
        ext = ndimage.binary_dilation(m, disk(11)) & letters_solid & ~m
        _, jj = ndimage.distance_transform_edt(~m, return_indices=True)
        img[ext] = img[jj[0][ext], jj[1][ext]]

    # ── 잘라 저장 + 좌표 계산
    geo = {}
    for n in names:
        img = lay[n]
        ys, xs = ndimage.find_objects(img[..., 3] > 0)[0]
        if n == 'letters':
            x0, y0, x1, y1 = 0, 0, W, H          # 글자는 원본 화폭 그대로 (히어로 높이의 기준)
        else:
            x0, y0 = max(0, xs.start - 4), max(0, ys.start - 4)
            x1, y1 = min(W, xs.stop + 4), min(H, ys.stop + 4)
        sub = Image.fromarray(img[y0:y1, x0:x1])
        sub.save(f'{OUT}/{n}.png', optimize=True)
        sub.save(f'{OUT}/{n}.webp', quality=WEBP_QUALITY, method=6, exact=True)
        smaller = shrink(sub, SMALL_CANVAS / W)
        smaller.save(f'{SMALL}/{n}.webp', quality=WEBP_QUALITY, method=6, exact=True)
        geo[n] = dict(x=x0, y=y0, w=x1 - x0, h=y1 - y0, smallw=smaller.width,
                      left=round(x0 / W * 100, 4), top=round(y0 / H * 100, 4),
                      width=round((x1 - x0) / W * 100, 4))

    print('\n── index.html 인라인 style ──')
    for n in names:
        g = geo[n]
        if n != 'letters':
            print(f'  {n:9s} left:{g["left"]}%;top:{g["top"]}%;width:{g["width"]}%  '
                  f'(width="{g["w"]}" height="{g["h"]}")')

    # ── index.html 에 그대로 붙일 <picture> 줄
    # sizes 는 "이 겹이 화면에서 몇 px 로 보이는가" 다. 겹의 폭 = 로고 폭 × 제 비율이고,
    # 로고 폭은 .container(max-width 1080px)의 안쪽이라 좌우 padding 만큼 빠진다.
    # padding 이 화면 폭에 따라 2 → 1.5 → 1.25 → 1rem 로 바뀌므로 그 구간을 그대로 옮겼다.
    # 브라우저는 이 값 × 화면 배율(DPR)보다 큰 것 중 가장 작은 후보를 고른다 —
    # 계산해 보면 어느 겹이든 조건이 "800 ≥ 로고폭 × DPR" 로 같아진다.
    print('\n── index.html <picture> ──')
    for n in names:
        g = geo[n]
        f = g['width'] / 100
        sizes = (f'(min-width:1080px) {1016 * f:.0f}px,'
                 f'(min-width:861px) calc((100vw - 64px)*{f:.4f}),'
                 f'(min-width:641px) calc((100vw - 48px)*{f:.4f}),'
                 f'(min-width:481px) calc((100vw - 40px)*{f:.4f}),'
                 f'calc((100vw - 32px)*{f:.4f})')
        src = (f'<source type="image/webp" srcset="{SMALL}/{n}.webp {g["smallw"]}w, '
               f'{OUT}/{n}.webp {g["w"]}w" sizes="{sizes}">')
        if n == 'letters':
            print(f'<picture>{src}\n    <img class="wm-letters" src="{OUT}/{n}.png" alt="…" '
                  f'width="{g["w"]}" height="{g["h"]}" fetchpriority="high"></picture>')
        else:
            print(f'<picture>{src}<img class="wm-layer" '
                  f'style="left:{g["left"]}%;top:{g["top"]}%;width:{g["width"]}%" '
                  f'src="{OUT}/{n}.png" alt="" width="{g["w"]}" height="{g["h"]}"></picture>')

    print('\n── style.css @keyframes 값 ──')
    for n, amp in SWAY.items():
        m = (final == names.index(n) + 1) & (alpha > 60)
        ys, xs = np.nonzero(m)
        v = np.array([xs.mean() - W / 2, ys.mean() - H / 2]); u = v / np.linalg.norm(v)
        print(f'  wmSway{n[-1]}  25% translate({u[0]*amp/W*100:+.4f}%, {u[1]*amp/H*100:+.4f}%)')
    for b, off in slides.items():
        print(f'  wmSlide{b[4:]}  25% translate({off[1][0]:+.4f}%, {off[1][1]:+.4f}%)   '
              f'75% translate({off[0][0]:+.4f}%, {off[0][1]:+.4f}%)')

    print('\n── transform-origin ──')
    for i in (1, 2, 3):
        n = f'star{i}'
        m = (final == names.index(n) + 1) & (alpha > 60)
        ys, xs = np.nonzero(m); g = geo[n]
        print(f'  .wm-star-{i}  {(xs.mean()-g["x"])/g["w"]*100:.1f}% {(ys.mean()-g["y"])/g["h"]*100:.1f}%')
    m = (final == names.index('cordD') + 1) & (alpha > 60)
    ys, xs = np.nonzero(m); kx = xs.max() + 9; ky = ys[xs >= xs.max() - 3].mean()
    print(f'  .wm-d (나비매듭 축)  {kx/W*100:.2f}% {ky/H*100:.2f}%')

    # transform-origin (별의 진짜 한가운데, 나비매듭 축) 도 함께 기록해 둔다 —
    # 이 파일 하나만 보면 CSS 에 들어간 값이 어디서 나왔는지 되짚을 수 있다.
    for i in (1, 2, 3):
        n = f'star{i}'
        m = (final == names.index(n) + 1) & (alpha > 60)
        ys, xs = np.nonzero(m); g = geo[n]
        geo[n]['origin'] = [round((xs.mean() - g['x']) / g['w'] * 100, 1),
                            round((ys.mean() - g['y']) / g['h'] * 100, 1)]
    json.dump({'canvas': [W, H], 'layers': geo, 'slides': slides,
               'bowPivot': [round(kx / W * 100, 2), round(ky / H * 100, 2)]},
              open(f'{OUT}/geometry.json', 'w'), indent=1)
    total = sum(os.path.getsize(f'{OUT}/{n}.webp') for n in names)
    print(f'\n{OUT}/ 에 {len(names)}겹 저장. WebP 합계 {total/1024:.0f} KB')


if __name__ == '__main__':
    main()
