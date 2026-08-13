#!/usr/bin/env python3
"""브라우저 탭·주소창 아이콘(파비콘) 한 벌 생성 스크립트.

favicon.svg 한 장으로는 부족하다. 사파리가 SVG 파비콘을 읽지 않기 때문이다.
사파리는 favicon.ico 를 찾고, 그것도 없으면 apple-touch-icon.png 로 내려앉는다.
2026-08-13 에 겪은 일: apple-touch-icon.png 만 옛 DPWL 시절 갈색 D 로 남아 있어서
크롬에서는 새 N 마크가, 맥 사파리 주소창에서는 갈색 D 가 뜨고 있었다.

그래서 같은 그림을 세 형식으로 함께 만든다:

    favicon-v3.svg           손으로 관리 (이 스크립트가 건드리지 않음) — 크롬·파이어폭스
    favicon-v3.ico           16·32·48 세 크기를 한 파일에 — 사파리·구형 브라우저
    apple-touch-icon-v3.png  180x180 — iOS 홈 화면, 맥 사파리 대체용

파일명 끝의 -v3 은 캐시를 끊기 위한 것이다. 아래 두 번째 경고를 보라.

그림은 favicon.svg 와 똑같이 맞춘다: 짙은 녹색 모서리 둥근 사각형에 크림색 N.
색을 바꾸려면 아래 BG·FG 만 고치면 세 형식에 함께 반영된다.

사용법 (저장소 루트에서):
    python3 tools/make-favicon.py

⚠️ 색이나 글자를 바꾸면 favicon-v3.svg 도 같이 손으로 고쳐야 한다.
   그 한 장만 따로 놀면 크롬과 사파리가 서로 다른 아이콘을 보여 준다.

⚠️ 그림을 바꿀 때는 ?v= 쿼리를 올리지 말고 파일명의 -v3 을 -v4 로 올린다.
   파비콘은 일반 캐시와 다른 곳(크롬 Favicons DB, 사파리 Favicon Cache)에
   따로 저장되고 강력 새로고침으로도 안 지워진다. 게다가 그 계층은 아이콘
   요청의 쿼리스트링을 무시하기 때문에 ?v= 를 올려도 캐시가 끊기지 않는다 —
   2026-08-13 에 ?v=2 를 붙여 배포했는데도 시크릿 창에서까지 DPWL 시절 D 가
   계속 뜬 것이 이 때문이었다. 파일명을 바꿔야 확실히 끊긴다.
   일괄 수정 (og-image-v3 까지 같이 바뀌지 않게 접두사를 붙여 지정한다):
       sed -i -e 's|favicon-v3|favicon-v4|g' \
              -e 's|apple-touch-icon-v3|apple-touch-icon-v4|g' *.html
   그리고 이 파일의 출력 이름(ICO_NAME·TOUCH_NAME)도 같이 올린다.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent

# favicon.svg 와 같은 값. style.css 의 --blush / --ink 다.
BG = '#E7CCCC'
FG = '#3D4A33'
LETTER = 'N'

# 블러시는 밝아서 흰 탭 막대 위에 놓으면 아이콘 테두리가 배경에 묻는다.
# 잉크를 22% 섞은 값으로 가장자리만 한 겹 둘러 형태를 잡아 준다.
EDGE = '#C2AFAA'

# favicon.svg 의 64 단위 좌표. 어떤 크기로 그리든 이 비율을 지킨다.
RADIUS_R = 14 / 64   # 모서리 둥글기
FONT_R = 38 / 64     # 글자 크기
BASELINE_R = 45 / 64  # 글자 밑선 위치

# 세리프 볼드 — favicon.svg 의 Georgia 자리를 메운다.
FONT_PATH = '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf'

SS = 8  # 이 배율로 크게 그린 뒤 줄여서 가장자리를 매끄럽게 만든다

# 캐시를 끊는 것은 쿼리가 아니라 파일명이다 (위 두 번째 경고).
# 그림을 바꿀 때 여기와 열두 페이지 <head> 를 같은 번호로 올린다.
ICO_NAME = 'favicon-v3.ico'
TOUCH_NAME = 'apple-touch-icon-v3.png'


def draw_mark(size, rounded):
    """size 픽셀 정사각형에 마크를 그려 돌려준다."""
    big = size * SS
    img = Image.new('RGBA', (big, big), (0, 0, 0, 0))
    pen = ImageDraw.Draw(img)

    if rounded:
        pen.rounded_rectangle([0, 0, big - 1, big - 1],
                              radius=RADIUS_R * big, fill=BG,
                              outline=EDGE, width=max(1, round(big / 32)))
    else:
        # iOS 는 홈 화면에서 제 방식대로 모서리를 깎는다. 미리 깎아 두면
        # 두 번 깎여 이상해지므로 여기서는 꽉 찬 사각형으로 둔다.
        pen.rectangle([0, 0, big - 1, big - 1], fill=BG)

    font = ImageFont.truetype(FONT_PATH, int(FONT_R * big))
    # anchor 'ms' = 가로 가운데 + 세로 밑선 기준 (svg 의 text-anchor:middle 과 같다)
    pen.text((big / 2, BASELINE_R * big), LETTER, font=font, fill=FG, anchor='ms')

    return img.resize((size, size), Image.LANCZOS)


def main():
    ico = ROOT / ICO_NAME
    # 한 .ico 안에 세 크기를 넣는다. 탭은 16, 즐겨찾기는 32, 바탕화면은 48 을 쓴다.
    sizes = [16, 32, 48]
    # 큰 것부터. Pillow 는 원본보다 큰 크기를 말없이 건너뛰므로 가장 큰 장을
    # 원본으로 넘겨야 한다 — 16 을 원본으로 주면 .ico 안에 16 한 장만 남는다.
    frames = [draw_mark(s, rounded=True) for s in sorted(sizes, reverse=True)]
    frames[0].save(ico, format='ICO',
                   sizes=[(s, s) for s in sizes],
                   append_images=frames[1:])
    print(f'{ico.relative_to(ROOT)} — {"·".join(map(str, sizes))}px, '
          f'{ico.stat().st_size // 1024 or 1}KB')

    touch = ROOT / TOUCH_NAME
    # 애플은 투명한 곳을 검게 칠한다. 알파를 없애고 배경색으로 눌러 둔다.
    flat = Image.new('RGB', (180, 180), BG)
    mark = draw_mark(180, rounded=False)
    flat.paste(mark, (0, 0), mark)
    flat.save(touch, optimize=True)
    print(f'{touch.relative_to(ROOT)} — 180x180, {touch.stat().st_size // 1024 or 1}KB')


if __name__ == '__main__':
    main()
