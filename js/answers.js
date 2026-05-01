// 答案頁邏輯（密碼保護）
(function () {
  const PASSWORD = '123456';
  const STORAGE_KEY = 'mt_answers_unlocked';

  const root = document.getElementById('answers-root');

  function showLogin() {
    root.innerHTML = `
      <div class="password-box">
        <h3 style="margin-top:0;">🔒 答案頁</h3>
        <p>本頁包含所有測驗的官方答案，請輸入密碼以查看。</p>
        <input type="password" id="pwd" placeholder="輸入密碼" autocomplete="off">
        <div class="err" id="err">　</div>
        <button class="btn" id="login-btn" style="width:100%;">解鎖</button>
      </div>`;
    const input = document.getElementById('pwd');
    const errEl = document.getElementById('err');
    const submit = () => {
      if (input.value === PASSWORD) {
        sessionStorage.setItem(STORAGE_KEY, '1');
        showAnswers();
      } else {
        errEl.textContent = '密碼錯誤，請再試一次。';
        input.select();
      }
    };
    document.getElementById('login-btn').addEventListener('click', submit);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
    input.focus();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[c]);
  }

  function showAnswers() {
    const html = [];
    html.push(`<div class="action-bar" style="justify-content: flex-start; margin: 0 0 16px;">
      <a class="btn" href="index.html">🏠 回首頁</a>
      <button class="btn secondary" id="lock-btn">🔒 鎖定</button>
    </div>`);

    html.push('<h2>📘 樂理及音樂基本常識 — 各年度答案</h2>');
    Object.values(THEORY_EXAMS).forEach(exam => {
      html.push(`<section class="section">`);
      html.push(`<h3>${exam.title}</h3>`);
      if (exam.notice) html.push(`<div class="notice">${exam.notice}</div>`);
      if (exam.pdf) html.push(`<p><a class="pdf-link" href="${exam.pdf}" target="_blank">📄 開啟原 PDF</a></p>`);

      exam.sections.forEach(section => {
        html.push(`<h4 style="margin-top:18px; color:var(--primary-dark);">${section.title}</h4>`);
        if (section.type === 'reference-only') {
          html.push(`<div class="answer-block">此題型須在五線譜上作答，請對照原 PDF 答案譜。</div>`);
          if (section.items) {
            html.push('<ul>' + section.items.map(it => `<li>${it}</li>`).join('') + '</ul>');
          }
        } else if (section.type === 'choice') {
          const opts = section.commonOptions;
          html.push('<ol style="padding-left:1.4em;">');
          section.questions.forEach(q => {
            const optList = q.options || opts || [];
            if (q.answer == null) {
              html.push(`<li>${escapeHtml(q.prompt)} — <span style="color:var(--accent);">官方未公布</span>${q.note ? `（${escapeHtml(q.note)}）` : ''}</li>`);
            } else {
              const ans = optList[q.answer - 1] || `(${q.answer})`;
              html.push(`<li>${escapeHtml(q.prompt)} <span class="answer-block" style="display:inline-block; padding:2px 8px;"><span class="answer-label">答：</span>(${q.answer}) ${escapeHtml(ans)}</span></li>`);
            }
          });
          html.push('</ol>');
        } else if (section.type === 'text-fill') {
          html.push('<ol style="padding-left:1.4em;">');
          section.questions.forEach(q => {
            if (q.answer == null) {
              html.push(`<li>${escapeHtml(q.prompt)} — <span style="color:var(--accent);">官方未公布</span></li>`);
            } else {
              html.push(`<li>${escapeHtml(q.prompt)} <span class="answer-block" style="display:inline-block; padding:2px 8px;"><span class="answer-label">答：</span>${escapeHtml(q.answer)}</span></li>`);
            }
          });
          html.push('</ol>');
        } else if (section.type === 'note-line-pair') {
          html.push('<table style="border-collapse:collapse;"><thead><tr><th style="padding:6px 12px; background:#f0eee8;">題號</th><th style="padding:6px 12px; background:#f0eee8;">音名</th><th style="padding:6px 12px; background:#f0eee8;">間線名稱</th></tr></thead><tbody>');
          section.questions.forEach(q => {
            html.push(`<tr><td style="padding:6px 12px;">${q.id}</td><td style="padding:6px 12px;"><strong>${q.name}</strong></td><td style="padding:6px 12px;">${q.line}</td></tr>`);
          });
          html.push('</tbody></table>');
        } else if (section.type === 'matching-pair') {
          html.push('<table style="border-collapse:collapse;"><thead><tr><th style="padding:6px 12px; background:#f0eee8;">作曲家</th><th style="padding:6px 12px; background:#f0eee8;">生平事蹟</th><th style="padding:6px 12px; background:#f0eee8;">代表作品</th></tr></thead><tbody>');
          section.composers.forEach(c => {
            html.push(`<tr><td style="padding:6px 12px;">${c.name}</td><td style="padding:6px 12px;"><strong>${c.life}</strong></td><td style="padding:6px 12px;"><strong>${c.work}</strong></td></tr>`);
          });
          html.push('</tbody></table>');
        } else if (section.type === 'matching-major-minor') {
          html.push('<table style="border-collapse:collapse;"><thead><tr><th style="padding:6px 12px; background:#f0eee8;">題號</th><th style="padding:6px 12px; background:#f0eee8;">關係大調</th><th style="padding:6px 12px; background:#f0eee8;">關係小調</th></tr></thead><tbody>');
          section.rows.forEach(r => {
            html.push(`<tr><td style="padding:6px 12px;">${r.id}</td><td style="padding:6px 12px;"><strong>${r.major}</strong></td><td style="padding:6px 12px;"><strong>${r.minor}</strong></td></tr>`);
          });
          html.push('</tbody></table>');
        }
      });
      html.push('</section>');
    });

    html.push('<h2 style="margin-top:40px;">🎹 聽音測驗 — 各年度答案</h2>');
    Object.values(LISTENING_EXAMS).forEach(exam => {
      html.push(`<section class="section">`);
      html.push(`<h3>${exam.title}</h3>`);
      if (exam.pdf) html.push(`<p><a class="pdf-link" href="${exam.pdf}" target="_blank">📄 開啟原 PDF</a></p>`);

      exam.sections.forEach(section => {
        html.push(`<h4 style="margin-top:18px; color:var(--primary-dark);">${section.title}</h4>`);
        if (section.type === 'single-note') {
          html.push('<ol style="padding-left:1.4em;">');
          section.questions.forEach(q => {
            html.push(`<li>音名：<strong>${q.answer}</strong>　<span style="color:var(--muted); font-size:0.88rem;">（播放音：${q.note}）</span></li>`);
          });
          html.push('</ol>');
        } else if (section.type === 'interval') {
          html.push('<ol style="padding-left:1.4em;">');
          section.questions.forEach(q => {
            html.push(`<li>度數：<strong>${q.answer}</strong>　<span style="color:var(--muted); font-size:0.88rem;">（播放音：${q.notes.join(' → ')}）</span></li>`);
          });
          html.push('</ol>');
        } else if (section.type === 'chord-quality') {
          html.push('<ol style="padding-left:1.4em;">');
          section.questions.forEach(q => {
            const ansText = q.options[q.answer - 1];
            html.push(`<li><strong>(${q.answer}) ${ansText}</strong>　<span style="color:var(--muted); font-size:0.88rem;">（播放音：${q.notes.join('、')}）</span></li>`);
          });
          html.push('</ol>');
        } else if (section.type === 'rhythm' || section.type === 'melody') {
          html.push(`<div class="answer-block">本題型答案為譜面，請對照原 PDF（${exam.pdf ? `<a href="${exam.pdf}" target="_blank">點此開啟</a>` : '見原 PDF'}）。</div>`);
          html.push('<ol style="padding-left:1.4em; color:var(--muted); font-size:0.92rem;">');
          section.questions.forEach(q => {
            const tones = q.sequence.filter(e => !e.rest).map(e => e.note).join(' ');
            html.push(`<li>第 ${q.id} 題（${q.time}）：${section.type === 'melody' ? `音高序列：${tones}` : '節奏（單音 A4 反覆）'}</li>`);
          });
          html.push('</ol>');
        }
      });
      html.push('</section>');
    });

    html.push('<div class="action-bar"><a class="btn" href="index.html">🏠 回首頁</a></div>');

    root.innerHTML = html.join('');
    document.getElementById('lock-btn').addEventListener('click', () => {
      sessionStorage.removeItem(STORAGE_KEY);
      showLogin();
    });
  }

  if (sessionStorage.getItem(STORAGE_KEY) === '1') {
    showAnswers();
  } else {
    showLogin();
  }
})();
