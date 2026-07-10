#!/usr/bin/env python3
"""공용 마크업 동기화 스크립트.

내비게이션(partials/nav.html)과 푸터(partials/footer.html)가 단일 소스이며,
이 스크립트가 루트의 모든 *.html에 해당 블록을 덮어쓴다.

사용법 (저장소 루트에서):
    python3 tools/sync-partials.py

- 메뉴/푸터를 고칠 때는 partials/ 안의 파일만 수정한 뒤 이 스크립트를 실행할 것.
- 개별 페이지의 <header class="site-nav">…</header> 를 직접 고치면
  다음 동기화 때 덮어써지므로 금지.
- 현재 페이지 메뉴 활성(active) 표시는 script.js(initActiveNav)가 처리하므로
  partial에 class="active"를 넣지 않는다.
"""
import glob
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

BLOCKS = {
    'nav':    (r'<header class="site-nav">.*?</header>',   ROOT / 'partials' / 'nav.html'),
    'footer': (r'<footer class="site-footer">.*?</footer>', ROOT / 'partials' / 'footer.html'),
}


def main():
    partials = {name: path.read_text(encoding='utf-8').strip()
                for name, (_, path) in BLOCKS.items()}
    changed = 0
    for page in sorted(ROOT.glob('*.html')):
        src = orig = page.read_text(encoding='utf-8')
        for name, (pattern, _) in BLOCKS.items():
            matches = re.findall(pattern, src, re.S)
            if len(matches) != 1:
                sys.exit(f'오류: {page.name}에서 {name} 블록이 {len(matches)}개 발견됨 (1개여야 함)')
            src = re.sub(pattern, lambda m: partials[name], src, flags=re.S)
        if src != orig:
            page.write_text(src, encoding='utf-8')
            changed += 1
            print(f'{page.name}: 동기화됨')
    print(f'완료 — {changed}개 파일 갱신')


if __name__ == '__main__':
    main()
