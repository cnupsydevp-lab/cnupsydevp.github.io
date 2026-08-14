/* 문의 폼 전송 — 대학원 진학(admissions.html) · 인턴(intern.html) 공용.
 *
 * 원래 두 페이지에 똑같은 48줄이 인라인으로 각각 들어 있었다(2026-08-13 정리).
 * 글자 하나 다르지 않은 사본이어서 한쪽만 고치면 다른 쪽이 조용히 어긋났다.
 * 두 페이지의 폼 마크업은 <input type="hidden" name="type"> 값만 다르고
 * (admissions / intern) 그 값을 아래에서 폼에서 읽어 보내므로 한 파일로 충분하다.
 * → 문의 폼을 쓰는 페이지를 새로 만들면 같은 id 들을 그대로 쓰고
 *   이 파일을 <script src="contact-form.js"></script> 로 불러오면 된다.
 *
 * 보내는 곳은 웹진 서버(growingmind.ppai-lab.com)의 API 다 — 이 홈페이지는
 * GitHub Pages 정적 사이트라 자체 서버가 없다. 즉 브라우저가 다른 출처로
 * 보내는 요청이므로 그쪽에서 CORS 를 열어 줘야 전송이 성공한다.
 *
 * [결과를 알리는 방식 — 알림창 하나로 통일 (2026-08-14)]
 * 전에는 성공하면 폼을 통째로 감추고 그 자리에 완료 문단을 남겼고, 실패하면
 * 버튼 옆에 작은 오류 글씨를 켰다. 같은 '보내기'의 결과인데 자리도 모양도
 * 달랐고 둘 다 화면에 계속 남았다. 지금은 성공·실패 모두 같은 알림창
 * (.inq-toast)이 떴다가 스스로 사라진다. 폼은 그대로 있고 버튼도 곧바로
 * 원래 상태로 돌아온다.
 * → 완료 문단(.inquiry-done)과 오류 문단(#inq-error) 마크업은 두 페이지에서 삭제했다.
 */
(function () {
  var CONTACT_API = 'https://growingmind.ppai-lab.com/api/contact';
  var form = document.getElementById('contact-form');
  if (!form) return;          // 폼이 없는 페이지에 실려도 조용히 지나간다

  var btn = document.getElementById('inq-btn');

  /* ── 알림창 ──────────────────────────────────────────────────
     마크업을 HTML 이 아니라 여기서 만든다 — 문의 폼을 쓰는 페이지가 늘어도
     각 페이지에 같은 상자를 또 적을 필요가 없게.
     빈 채로 미리 <body> 에 붙여 두는 이유: 읽어 주는 기계는 '살아 있는 영역'
     (role=status/alert)이 먼저 있어야 그 안의 글자 변화를 알아챈다. 상자를
     만들면서 동시에 글을 넣으면 아무 말도 하지 않는다. */
  var SHOW_MS  = { ok: 3200, err: 6000 };   // 오류는 더 오래 — 다시 시도할지 판단할 시간
  var FADE_MS  = 260;                       // style.css 의 .is-closing 애니메이션 길이와 같게

  var layer = document.createElement('div');
  layer.className = 'inq-toast';
  layer.hidden = true;
  var box = document.createElement('p');
  box.className = 'inq-toast-box';
  layer.appendChild(box);
  document.body.appendChild(layer);

  var showTimer = null;
  var fadeTimer = null;

  function hideToast() {
    if (layer.hidden) return;
    clearTimeout(showTimer);
    box.classList.add('is-closing');
    fadeTimer = setTimeout(function () {
      layer.hidden = true;
      box.classList.remove('is-closing');
    }, FADE_MS);
  }

  function showToast(message, isError) {
    clearTimeout(showTimer);
    clearTimeout(fadeTimer);
    box.classList.remove('is-closing');
    box.classList.toggle('is-error', !!isError);
    layer.setAttribute('role', isError ? 'alert' : 'status');
    layer.hidden = false;
    // 창이 화면에 붙은 다음 프레임에 글을 넣어야 읽어 주는 기계가 변화를 잡는다
    requestAnimationFrame(function () { box.textContent = message; });
    showTimer = setTimeout(hideToast, isError ? SHOW_MS.err : SHOW_MS.ok);
  }

  // 다 읽었으면 기다리지 않고 닫을 수 있게 — 상자 클릭 또는 Esc
  box.addEventListener('click', hideToast);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideToast();
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    /* 버튼 글자는 '보내기' 그대로 둔다 — 결과는 알림창이 알려 준다.
       disabled 는 응답이 오기 전에 두 번 눌려 중복 전송되는 것만 막고,
       끝나면 성공이든 실패든 아래 finally 에서 곧바로 원래대로 돌아온다. */
    btn.disabled = true;

    var payload = {
      type:     form.querySelector('[name="type"]').value,
      name:     form.querySelector('[name="name"]').value.trim(),
      email:    form.querySelector('[name="email"]').value.trim(),
      subject:  form.querySelector('[name="subject"]').value.trim(),
      message:  form.querySelector('[name="message"]').value.trim(),
      _gotcha:  form.querySelector('[name="_gotcha"]').value,
    };

    try {
      var res  = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      var json = await res.json().catch(function () { return {}; });
      if (!res.ok) {
        // 서버가 이유를 말해 준 경우만 그 말을 그대로 보여 준다 (fromApi 표시)
        var apiErr = new Error(json.error || '');
        apiErr.fromApi = true;
        throw apiErr;
      }
      form.reset();   // 보낸 내용이 그대로 남아 있으면 보낸 것인지 아닌지 헷갈린다
      showToast('문의가 전달되었습니다.\n검토 후 입력하신 이메일로 회신 드리겠습니다.', false);
    } catch (err) {
      /* fetch 자체가 실패하면(네트워크 끊김·CORS 막힘) 브라우저가 "Failed to fetch"
         같은 영어 메시지를 준다. 그건 방문자에게 아무 도움이 안 되므로 감추고
         우리말 안내로 바꾼다 — 서버가 준 이유(fromApi)만 그대로 통과시킨다. */
      showToast((err.fromApi && err.message) || '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', true);
    } finally {
      btn.disabled = false;
    }
  });
}());
