(function () {
  var FORMS = [
    /* ── 계약/법률 ── */
    { s:'geunro-contract',   ko:'표준근로계약서',       i:'📄', c:'contract', url:'forms/geunro-contract.html',   internal:true },
    { s:'jungse-contract',   ko:'주택임대차계약서',     i:'🏠', c:'contract', url:'forms/jungse-contract.html',   internal:true },
    { s:'estate-contract',   ko:'부동산매매계약서',     i:'🏘️', c:'contract', url:'forms/estate-contract.html',  internal:true },
    { s:'service-contract',  ko:'용역계약서',           i:'🤝', c:'contract', url:'forms/service-contract.html', internal:true },
    { s:'nda',               ko:'비밀유지서약서(NDA)',  i:'🔒', c:'contract', url:'forms/nda.html',              internal:true },
    /* ── 업무/비즈니스 ── */
    { s:'estimate',          ko:'견적서',               i:'💰', c:'business', url:'forms/estimate.html',         internal:true },
    { s:'transaction',       ko:'거래명세서',           i:'🧾', c:'business', url:'forms/transaction.html',      internal:true },
    { s:'order',             ko:'발주서',               i:'📦', c:'business', url:'forms/order.html',            internal:true },
    { s:'handover',          ko:'인수인계서',           i:'🤝', c:'business', url:'forms/handover.html',         internal:true },
    { s:'business-trip',     ko:'출장신청서',           i:'✈️', c:'business', url:'forms/business-trip.html',    internal:true },
    { s:'expense-report',    ko:'지출결의서',           i:'🧾', c:'business', url:'forms/expense-report.html',   internal:true },
    { s:'meeting-minutes',   ko:'회의록',               i:'📋', c:'business', url:'forms/meeting-minutes.html',  internal:true },
    { s:'proposal',          ko:'기안서',               i:'📝', c:'business', url:'forms/proposal.html',         internal:true },
    /* ── 인사/HR ── */
    { s:'resume',            ko:'이력서',               i:'📝', c:'hr',       url:'forms/resume.html',           internal:true },
    { s:'employment-cert',   ko:'재직증명서',           i:'🏢', c:'hr',       url:'forms/employment-cert.html',  internal:true },
    { s:'resign',            ko:'퇴직원',               i:'🚪', c:'hr',       url:'forms/resign.html',           internal:true },
    { s:'leave',             ko:'휴가신청서',           i:'🌴', c:'hr',       url:'forms/leave.html',            internal:true },
    { s:'career-cert',       ko:'경력증명서',           i:'📋', c:'hr',       url:'forms/career-cert.html',      internal:true },
    /* ── 재무/회계 ── */
    { s:'payslip',           ko:'급여명세서',           i:'💵', c:'finance',  url:'forms/payslip.html',          internal:true },
    { s:'receipt',           ko:'영수증 양식',          i:'🧾', c:'finance',  url:'forms/receipt.html',          internal:true },
    { s:'invoice',           ko:'청구서',               i:'📄', c:'finance',  url:'forms/invoice.html',          internal:true },
  ];

  /* ── 현재 페이지 slug 감지 ── */
  var slug = window.location.pathname.replace(/.*\/forms\//, '').replace(/\.html.*$/, '');

  var current = null;
  for (var i = 0; i < FORMS.length; i++) {
    if (FORMS[i].s === slug) { current = FORMS[i]; break; }
  }
  if (!current) return;

  /* ── 같은 카테고리 중 현재 제외, 최대 4개 ── */
  var pool = FORMS.filter(function (f) { return f.c === current.c && f.s !== slug; });
  pool.sort(function () { return Math.random() - 0.5; });
  /* 4개 미만이면 다른 카테고리에서 보충 */
  if (pool.length < 4) {
    var extra = FORMS.filter(function (f) { return f.c !== current.c; });
    extra.sort(function () { return Math.random() - 0.5; });
    pool = pool.concat(extra).slice(0, 4);
  }
  var picks = pool.slice(0, 4);
  if (!picks.length) return;

  /* ── 스타일 ── */
  var accent = '#2563EB';
  var style = document.createElement('style');
  style.textContent =
    '.wf-related{margin:28px 0 8px;}' +
    '.wf-related-heading{font-size:1rem;font-weight:700;margin:0 0 14px;color:#1F2937;padding-bottom:8px;border-bottom:2px solid ' + accent + ';}' +
    '.wf-related-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}' +
    '@media(max-width:640px){.wf-related-grid{grid-template-columns:repeat(2,1fr);}}' +
    '.wf-form-card{background:#F9FAFB;border:1px solid #E5E7EB;border-radius:10px;padding:14px 10px;text-decoration:none;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;position:relative;overflow:hidden;transition:border-color .2s,transform .2s;}' +
    '.wf-form-card::before{content:\'\';position:absolute;top:0;left:0;right:0;height:3px;background:' + accent + ';}' +
    '.wf-form-card:hover{border-color:' + accent + ';transform:translateY(-2px);}' +
    '.wf-form-icon{font-size:1.4rem;line-height:1;}' +
    '.wf-form-name{font-size:.82rem;font-weight:700;color:' + accent + ';line-height:1.3;word-break:keep-all;}';
  document.head.appendChild(style);

  /* ── 카드 HTML ── */
  var depth = window.location.pathname.includes('/forms/') ? '../' : '';
  var cards = picks.map(function (f) {
    var href = f.internal ? (depth + f.url) : f.url;
    var target = f.internal ? '' : ' target="_blank" rel="noopener"';
    return '<a href="' + href + '" class="wf-form-card"' + target + '>' +
      '<span class="wf-form-icon">' + f.i + '</span>' +
      '<span class="wf-form-name">' + f.ko + '</span>' +
      '</a>';
  }).join('');

  /* ── 섹션 DOM 삽입 (wooa-orig-anchor 앞) ── */
  var wrap = document.createElement('div');
  wrap.className = 'wf-related';
  wrap.innerHTML = '<h2 class="wf-related-heading">📋 함께 보면 좋은 양식</h2>' +
    '<div class="wf-related-grid">' + cards + '</div>';

  var anchor = document.querySelector('.wooa-orig-anchor');
  if (anchor) {
    anchor.parentNode.insertBefore(wrap, anchor);
  } else {
    var footer = document.querySelector('footer');
    if (footer) footer.parentNode.insertBefore(wrap, footer);
    else document.body.appendChild(wrap);
  }
})();
