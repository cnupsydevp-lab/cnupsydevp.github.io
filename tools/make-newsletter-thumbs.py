#!/usr/bin/env python3
"""소식지 사진 정리 스크립트.

소식지 목록은 폴라로이드 정사각 인화면(화면에서 163~181px)이라 원본을 그대로
쓰면 4MB 사진을 163px 로 줄여 보여주는 낭비가 된다. 그래서 두 벌을 둔다.

    images/newsletter/<이름>.jpeg          표시용 — 모달에서 보이는 사진 (긴 변 1600px)
    images/newsletter/thumb/<이름>.jpeg    목록용 — 폴라로이드 썸네일 (500x500)

사용법 (저장소 루트에서):
    python3 tools/make-newsletter-thumbs.py            # 빠진 썸네일 생성 + 점검
    python3 tools/make-newsletter-thumbs.py --shrink   # 큰 표시용 사진도 1600px 로 줄임
    python3 tools/make-newsletter-thumbs.py --force     # 썸네일 전체 재생성

사진을 새로 추가하는 순서:
    1. images/newsletter/ 에 사진을 넣는다.
       파일명은 <촬영일>_<행사코드>_<번호>.jpeg 형식 (예: 2026-07-22_ICAP_01.jpeg).
       촬영일은 EXIF 기준 — 카카오톡 파일명의 날짜는 '전송한 날'이라 다를 수 있다
       (이 스크립트가 EXIF 날짜를 읽어 파일명과 다르면 알려준다).
       행사코드는 presentations/ 의 PDF 와 같은 약칭을 쓴다 (KPS79, KDPA50, KPLS, KHPA70, ICAP…).
    2. 이 스크립트를 실행한다.
    3. posts.js 의 POSTS.newsletter 에 image 경로를 적는다. 썸네일 경로는
       newsletter.html 이 자동으로 thumb/ 를 붙여 찾으므로 따로 적지 않아도 된다.

EXIF 는 저장할 때 지워진다 — 회전 정보를 사진에 굽고, 촬영 위치(GPS)가
공개 저장소에 올라가지 않게 하려는 것이다.
"""
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit('Pillow 가 필요합니다: pip install Pillow')

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'images' / 'newsletter'
THUMB = SRC / 'thumb'

THUMB_PX = 500          # 폴라로이드 인화면은 정사각
DISPLAY_PX = 1600       # 모달 최대 표시 크기의 넉넉한 2배
THUMB_Q, DISPLAY_Q = 82, 85
CENTERING = (0.5, 0.4)  # 정사각으로 자를 때 위쪽(얼굴)을 조금 더 남긴다
EXTS = {'.jpeg', '.jpg', '.png'}


def load(path):
    """EXIF 회전을 실제 픽셀에 굽고 RGB 로 통일."""
    return ImageOps.exif_transpose(Image.open(path)).convert('RGB')


def exif_date(path):
    try:
        v = Image.open(path).getexif().get(306)      # DateTime
        return v.split()[0].replace(':', '-') if v else None
    except Exception:
        return None


def main():
    force = '--force' in sys.argv
    shrink = '--shrink' in sys.argv
    THUMB.mkdir(exist_ok=True)

    photos = sorted(p for p in SRC.iterdir() if p.suffix.lower() in EXTS)
    if not photos:
        sys.exit(f'{SRC} 에 사진이 없습니다.')

    made = shrunk = 0
    warn = []
    for p in photos:
        t = THUMB / f'{p.stem}.jpeg'
        if force or not t.exists() or t.stat().st_mtime < p.stat().st_mtime:
            im = load(p)
            ImageOps.fit(im, (THUMB_PX, THUMB_PX), Image.LANCZOS, centering=CENTERING) \
                    .save(t, 'JPEG', quality=THUMB_Q, optimize=True, progressive=True)
            made += 1
            print(f'썸네일 생성  thumb/{t.name}  ({t.stat().st_size // 1024}KB)')

        im = Image.open(p)
        long_edge = max(im.size)
        kb = p.stat().st_size // 1024
        if long_edge > DISPLAY_PX or kb > 600:
            if shrink:
                d = load(p)
                d.thumbnail((DISPLAY_PX, DISPLAY_PX), Image.LANCZOS)
                d.save(p, 'JPEG', quality=DISPLAY_Q, optimize=True, progressive=True)
                shrunk += 1
                print(f'표시용 축소  {p.name}  {kb}KB → {p.stat().st_size // 1024}KB')
            else:
                warn.append(f'{p.name}: {long_edge}px · {kb}KB — --shrink 로 줄일 수 있습니다')

        # 파일명의 날짜와 EXIF 촬영일이 다르면 알려준다 (카카오톡 전송일로 지은 이름 탐지)
        d = exif_date(p)
        if d and not p.stem.startswith(d):
            warn.append(f'{p.name}: EXIF 촬영일은 {d} — 파일명 날짜를 확인하세요')

    orphans = [t.name for t in THUMB.iterdir()
               if t.suffix.lower() in EXTS and not any(s.stem == t.stem for s in photos)]
    for o in orphans:
        warn.append(f'thumb/{o}: 원본이 없는 썸네일 — 지워도 됩니다')

    print(f'\n사진 {len(photos)}장 · 썸네일 {made}개 생성'
          + (f' · 표시용 {shrunk}개 축소' if shrunk else ''))
    for w in warn:
        print('  ⚠', w)
    if not warn:
        print('  문제 없음')


if __name__ == '__main__':
    main()
