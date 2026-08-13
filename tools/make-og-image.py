#!/usr/bin/env python3
"""링크 미리보기 그림(images/og-image-v2.png) 생성 스크립트.

카카오톡·디스코드·페이스북 등에 주소를 붙여 넣으면 뜨는 카드 그림이다.
모든 페이지의 <head> 가 이 한 장을 가리킨다:

    <meta property="og:image" content=".../images/og-image-v2.png">

그래서 이 파일이 없으면 열두 페이지의 링크 미리보기가 전부 그림 없이 뜬다.

⚠️ 그림을 갈아 끼울 때는 반드시 파일명 뒤 번호를 올린다 (og-image-v2 → v3 …)
   그리고 열두 페이지의 <head> 경로도 같이 고친다. 같은 파일명에 덮어쓰면
   카카오톡이 예전 그림을 계속 물고 있는다 — 카카오는 주소 단위로 미리보기를
   저장해 두고, 개인이 그 저장분을 지울 방법이 없다 (2026-08-13에 겪은 일).
   경로 일괄 수정:  sed -i 's|og-image-v2|og-image-v3|g' *.html tools/make-og-image.py

사용법 (저장소 루트에서):
    python3 tools/make-og-image.py --font <IBMPlexSansKR-*.ttf 가 있는 폴더>

    폰트를 안 주면 흔한 자리를 뒤져 보고, 못 찾으면 어디서 받는지 알려 준다.
    IBM Plex Sans KR = 이 사이트 본문 폰트 (SIL OFL, Google Fonts 에서 받음).
    저장소에 폰트를 두지 않는 이유: 이 그림 한 장 만들자고 6MB 짜리 한글
    폰트를 올릴 이유가 없다. 그림은 결과물(png)만 커밋한다.

[크기 1200x630 인 이유]
OG 표준 권장값이자 가로세로 1.91:1 이다. 카카오톡·디스코드·트위터가 모두 이
비율로 큰 카드를 그린다. 더 크게 만들어도 어차피 줄여 보여 주고, 작게 만들면
카드가 작은 썸네일 모양으로 바뀐다.

[구성]
종이색 바탕에 NOMAD Lab 풍선 로고 한 장, 그 아래 한글 한 줄 + 영문 한 줄이다.
히어로의 긴 워드마크(logo-fullname.png)를 쓰지 않은 것은 미리보기 카드가
실제로는 폭 300px 안팎으로 보이기 때문이다 — 그 크기에서 'Noh Mental health
And Digital care' 는 뭉개져 읽히지 않지만 'NOMAD Lab' 은 또렷하다.
"""
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit('Pillow 가 필요합니다: pip install Pillow')

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / 'images' / 'logo' / 'logo-full.png'
OUT = ROOT / 'images' / 'og-image-v2.png'

W, H = 1200, 630

# style.css 의 원색을 그대로 옮긴 값이다. 저기를 바꾸면 여기도 바꿔야 카드와
# 사이트의 바탕색이 어긋나지 않는다 (--paper / --ink).
PAPER = (237, 232, 220)
INK = (61, 74, 51)
# 영문 줄 — 잉크를 종이에 0.72 로 섞은 색. 한글 줄보다 한 단 물러나게 해서
# '이름 → 설명' 순으로 읽히게 한다 (종이 위 대비 4.9:1, 큰 글자라 충분하다).
INK_SOFT = (110, 118, 98)

LINE_KO = '충남대학교 심리학과 발달·노화 심리 연구실'
LINE_EN = 'Noh Mental health And Digital care Lab'

LOGO_W = 540            # 로고 폭 — 세로는 원본 비율대로 따라온다
LOGO_TOP = 52
GAP_LOGO_KO = 44        # 로고 아래 ~ 한글 줄 위
GAP_KO_EN = 26          # 한글 줄 아래 ~ 영문 줄 위
SIZE_KO, SIZE_EN = 46, 30

FONT_DIRS = [
    Path.home() / '.fonts',
    Path('/usr/share/fonts/truetype/ibm-plex'),
    ROOT / 'tools' / 'fonts',
]


def find_font(hint: str | None) -> Path:
    """IBMPlexSansKR-Bold.ttf 가 있는 폴더를 찾는다."""
    dirs = [Path(hint)] if hint else FONT_DIRS
    for d in dirs:
        if (d / 'IBMPlexSansKR-Bold.ttf').exists():
            return d
    sys.exit(
        'IBMPlexSansKR-Bold.ttf / -Regular.ttf 를 찾지 못했습니다.\n'
        '  https://fonts.google.com/specimen/IBM+Plex+Sans+KR 에서 받아\n'
        '  아무 폴더에 두고 --font <폴더> 로 알려 주세요.\n'
        f'  찾아본 곳: {", ".join(str(d) for d in dirs)}'
    )


def main() -> None:
    hint = None
    if '--font' in sys.argv:
        hint = sys.argv[sys.argv.index('--font') + 1]
    font_dir = find_font(hint)
    f_ko = ImageFont.truetype(str(font_dir / 'IBMPlexSansKR-Bold.ttf'), SIZE_KO)
    f_en = ImageFont.truetype(str(font_dir / 'IBMPlexSansKR-Regular.ttf'), SIZE_EN)

    canvas = Image.new('RGB', (W, H), PAPER)

    # 로고는 투명 여백을 잘라 내고 얹는다 — 여백째 얹으면 눈에 보이는 그림이
    # 가운데에서 밀린다. 알파를 마스크로 줘야 풍선 둘레가 검게 물들지 않는다.
    logo = Image.open(LOGO).convert('RGBA')
    logo = logo.crop(logo.getbbox())
    logo_h = round(LOGO_W * logo.height / logo.width)
    logo = logo.resize((LOGO_W, logo_h), Image.LANCZOS)
    canvas.paste(logo, ((W - LOGO_W) // 2, LOGO_TOP), logo)

    draw = ImageDraw.Draw(canvas)
    y = LOGO_TOP + logo_h + GAP_LOGO_KO
    for text, font, color, gap in (
        (LINE_KO, f_ko, INK, GAP_KO_EN),
        (LINE_EN, f_en, INK_SOFT, 0),
    ):
        # anchor='ma' = 가로 가운데 맞춤 + y 를 글자 윗선으로 읽기.
        # 글자마다 다른 위아래 여백(bbox)에 휘둘리지 않아 줄 간격이 일정하다.
        draw.text((W // 2, y), text, font=font, fill=color, anchor='ma')
        y += font.getbbox(text)[3] + gap

    # 256색으로 줄여 저장한다 (161KB → 68KB). 이 그림은 종이색 바탕이 대부분이고
    # 색이 도는 곳은 풍선 몇 개뿐이라, 오차확산(디더)을 켜면 그러데이션에 띠가
    # 생기지 않는다 — 원본과 나란히 놓고 확인했다. 미리보기 카드는 실제로 폭
    # 300px 안팎으로 줄여 그려지므로 여유는 더 크다.
    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.quantize(colors=256, dither=Image.FLOYDSTEINBERG).save(OUT, optimize=True)
    print(f'{OUT.relative_to(ROOT)} — {W}x{H}, {OUT.stat().st_size // 1024}KB')


if __name__ == '__main__':
    main()
