// 聽音測驗頁面邏輯
(function () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const exam = LISTENING_EXAMS[id];

  const root = document.getElementById('exam-root');
  const titleEl = document.getElementById('exam-title');

  if (!exam) {
    root.innerHTML = '<div class="notice">找不到指定測驗。<a href="index.html">回首頁</a></div>';
    return;
  }

  document.title = exam.title + ' — 聽音測驗';
  titleEl.textContent = exam.title;

  const html = [];
  html.push(`<div class="audio-status" id="audio-status">
    🎹 鋼琴音檔：尚未載入。第一次按播放時會自動載入（約 5–10 秒，依網路速度）。
  </div>`);
  html.push(`<div class="notice">
    <strong>作答方式：</strong>每題都可重複播放，原則上練習時連續播放三次。
    第一個音為標準音 A4，按 <span class="kbd">標準音 A</span> 可隨時對音。
    建議戴耳機作答以獲得最佳音質。
  </div>`);
  if (exam.pdf) {
    html.push(`<p><a class="pdf-link" href="${exam.pdf}" target="_blank">📄 開啟原 PDF（含答案譜面）</a></p>`);
  }
  html.push(`<p><button class="btn small accent" id="ref-a">🎵 標準音 A4</button></p>`);

  exam.sections.forEach((section, sIdx) => {
    html.push(`<section class="section" data-section="${sIdx}">`);
    html.push(`<h3>${section.title}</h3>`);
    html.push(`<div class="q-instructions">${section.instruction}</div>`);

    section.questions.forEach((q, qIdx) => {
      html.push(`<div class="question" data-qid="${qIdx}">`);
      html.push(`<div class="q-text"><span class="q-num">${q.id}.</span>第 ${q.id} 題</div>`);

      // 播放控制列
      html.push('<div class="play-row">');
      html.push(`<button class="play-btn" data-section="${sIdx}" data-qid="${qIdx}" data-action="play"><span class="icon">▶</span> 播放</button>`);
      if (section.type === 'rhythm' || section.type === 'melody') {
        html.push(`<button class="play-btn" style="background:#6b7280;" data-section="${sIdx}" data-qid="${qIdx}" data-action="play-slow"><span class="icon">🐢</span> 慢速播放</button>`);
      }
      html.push(`<span class="play-count" id="count-${sIdx}-${qIdx}">已播放 0 次</span>`);
      html.push('</div>');

      // 作答區
      if (section.type === 'single-note') {
        html.push(`<div>音名：<input type="text" class="text-answer" name="s${sIdx}q${qIdx}"></div>`);
      } else if (section.type === 'interval') {
        html.push(`<div>度數：<input type="text" class="text-answer" name="s${sIdx}q${qIdx}"></div>`);
      } else if (section.type === 'chord-quality') {
        html.push('<ul class="options">');
        q.options.forEach((opt, i) => {
          html.push(`<li><label>
            <input type="radio" name="s${sIdx}q${qIdx}" value="${i + 1}">
            <span>(${i + 1}) ${opt}</span>
          </label></li>`);
        });
        html.push('</ul>');
      } else if (section.type === 'rhythm' || section.type === 'melody') {
        html.push(`<div class="drawing-host" id="dh-${sIdx}-${qIdx}"></div>`);
        html.push(`<div style="color:var(--muted); font-size:0.92rem;">
          ※ 請於上方五線譜框內手繪作答。完成後請對照原 PDF 譜面自評。
        </div>`);
      }
      html.push('</div>');
    });

    html.push('</section>');
  });

  html.push('<div class="action-bar">');
  if (hasScorableSections(exam)) {
    html.push('<button class="btn accent" id="grade-btn">交卷檢查（單音、音程、和絃）</button>');
    html.push('<button class="btn secondary" id="reset-btn">重置作答</button>');
  }
  html.push('<a class="btn" href="index.html">回首頁</a>');
  html.push('</div>');
  html.push('<div id="score-area"></div>');

  root.innerHTML = html.join('');

  // 為節奏 / 旋律題建立手繪畫布
  exam.sections.forEach((section, sIdx) => {
    if (section.type !== 'rhythm' && section.type !== 'melody') return;
    section.questions.forEach((q, qIdx) => {
      const host = document.getElementById(`dh-${sIdx}-${qIdx}`);
      if (!host) return;
      const bars = NotationCanvas.countBars(q.time, q.sequence);
      NotationCanvas.create(host, {
        timeSig: q.time,
        bars: bars,
        width: 900,
        height: 160,
        key: `s${sIdx}q${qIdx}`
      });
    });
  });

  function hasScorableSections(ex) {
    return ex.sections.some(s =>
      s.type === 'single-note' || s.type === 'interval' || s.type === 'chord-quality'
    );
  }

  // ─── 播放邏輯 ───
  const playCounts = {};
  const audioStatus = document.getElementById('audio-status');

  Tone.loaded().then(() => {});

  // 預先初始化提示
  let initStarted = false;
  async function ensureLoaded(btn) {
    if (Piano.isLoaded()) return;
    if (!initStarted) {
      initStarted = true;
      audioStatus.textContent = '🎹 正在載入鋼琴音檔，請稍候…（首次需 5–10 秒）';
      audioStatus.classList.remove('ready');
    }
    if (btn) btn.disabled = true;
    await Piano.init();
    audioStatus.textContent = '🎹 鋼琴音檔已就緒，可開始作答。';
    audioStatus.classList.add('ready');
    if (btn) btn.disabled = false;
  }

  document.getElementById('ref-a').addEventListener('click', async (e) => {
    await ensureLoaded(e.currentTarget);
    Piano.playReferenceA();
  });

  root.addEventListener('click', async (e) => {
    const btn = e.target.closest('.play-btn');
    if (!btn) return;
    const sIdx = parseInt(btn.dataset.section, 10);
    const qIdx = parseInt(btn.dataset.qid, 10);
    const action = btn.dataset.action;
    const section = exam.sections[sIdx];
    const q = section.questions[qIdx];
    await ensureLoaded(btn);

    btn.disabled = true;
    try {
      if (section.type === 'single-note') {
        await Piano.playNote(q.note, 2.5);
        await wait(2700);
      } else if (section.type === 'interval') {
        await Piano.playInterval(q.notes);
        await wait(5500);
      } else if (section.type === 'chord-quality') {
        // 先逐音上行 (分解)，再和聲奏一次
        const now = Tone.now();
        const dur = 0.5;
        q.notes.forEach((n, i) => Piano.playNote(n, 0.5, now + i * dur));
        await wait((q.notes.length * dur + 0.4) * 1000);
        await Piano.playChord(q.notes, 2.0);
        await wait(2200);
      } else if (section.type === 'rhythm' || section.type === 'melody') {
        const tempoMul = action === 'play-slow' ? 0.65 : 1;
        const baseBpm = section.bpm || 80;
        // 將 d 視為「拍」（4/4 中四分音符 = 1 拍）；換算每拍秒數
        const secPerBeat = 60 / (baseBpm * tempoMul);
        const seq = q.sequence.map(ev => ({
          ...ev,
          duration: ev.d * secPerBeat
        }));
        const total = await Piano.playSequence(seq);
        await wait(total + 200);
      }
    } finally {
      btn.disabled = false;
      const key = `${sIdx}-${qIdx}`;
      playCounts[key] = (playCounts[key] || 0) + 1;
      const counter = document.getElementById(`count-${sIdx}-${qIdx}`);
      if (counter) counter.textContent = `已播放 ${playCounts[key]} 次`;
    }
  });

  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ─── 計分 ───
  const gradeBtn = document.getElementById('grade-btn');
  if (gradeBtn) gradeBtn.addEventListener('click', grade);
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) resetBtn.addEventListener('click', () => location.reload());

  function normText(s) {
    if (!s) return '';
    return String(s).trim()
      .replace(/[\s　]/g, '')
      .replace(/[#＃♯]/g, '#')
      .replace(/[♭]/g, 'b')
      .replace(/度$/, '');
  }

  function fbAfter(parent, ok, expected) {
    if (!parent) return;
    const fb = document.createElement('div');
    fb.className = 'answer-feedback ' + (ok ? 'ok' : 'no');
    fb.textContent = ok ? '✓ 正確' : `正解：${expected}`;
    parent.appendChild(fb);
  }

  function checkAnswer(input, q) {
    const v = normText(input);
    const main = normText(q.answer);
    if (v === main) return true;
    if (q.alt && q.alt.some(a => normText(a) === v)) return true;
    // 「大3」 vs 「大三」 等中文/阿拉伯數字
    const map = { '一':'1','二':'2','三':'3','四':'4','五':'5','六':'6','七':'7','八':'8' };
    let v2 = v, m2 = main;
    Object.keys(map).forEach(k => { v2 = v2.replace(new RegExp(k,'g'), map[k]); m2 = m2.replace(new RegExp(k,'g'), map[k]); });
    if (v2 === m2) return true;
    if (q.alt && q.alt.some(a => {
      let a2 = normText(a);
      Object.keys(map).forEach(k => { a2 = a2.replace(new RegExp(k,'g'), map[k]); });
      return a2 === v2;
    })) return true;
    return false;
  }

  function grade() {
    let earned = 0, total = 0;
    exam.sections.forEach((section, sIdx) => {
      if (section.type === 'single-note' || section.type === 'interval') {
        section.questions.forEach((q, qIdx) => {
          const input = document.getElementsByName(`s${sIdx}q${qIdx}`)[0];
          if (!input) return;
          input.disabled = true;
          total++;
          const ok = checkAnswer(input.value, q);
          input.classList.add(ok ? 'correct' : 'wrong');
          if (!ok) input.title = '正解：' + q.answer;
          if (ok) earned++;
          const questionDiv = root.querySelector(`[data-section="${sIdx}"] .question[data-qid="${qIdx}"]`);
          fbAfter(questionDiv, ok, q.answer);
        });
      } else if (section.type === 'chord-quality') {
        section.questions.forEach((q, qIdx) => {
          const radios = document.getElementsByName(`s${sIdx}q${qIdx}`);
          const labels = root.querySelectorAll(`[data-section="${sIdx}"] [data-qid="${qIdx}"] label`);
          const ul = root.querySelector(`[data-section="${sIdx}"] [data-qid="${qIdx}"] .options`);
          if (ul) ul.classList.add('locked');
          let selected = null;
          radios.forEach(r => { if (r.checked) selected = parseInt(r.value, 10); r.disabled = true; });
          total++;
          let ok = false;
          if (selected === q.answer) {
            earned++;
            ok = true;
            if (labels[selected - 1]) labels[selected - 1].classList.add('correct');
          } else {
            if (selected && labels[selected - 1]) labels[selected - 1].classList.add('wrong');
            if (labels[q.answer - 1]) labels[q.answer - 1].classList.add('expected');
          }
          const questionDiv = root.querySelector(`[data-section="${sIdx}"] .question[data-qid="${qIdx}"]`);
          const expectedText = `(${q.answer}) ${q.options[q.answer - 1]}`;
          fbAfter(questionDiv, ok, expectedText);
        });
      }
    });

    if (gradeBtn) gradeBtn.disabled = true;
    const pct = total > 0 ? Math.round(earned / total * 100) : 0;
    const scoreArea = document.getElementById('score-area');
    scoreArea.innerHTML = `
      <div class="score-box">
        <div class="score">${earned} / ${total}</div>
        <div class="total">答對率 ${pct}%（限可自動計分項目：單音、音程、和絃選項）</div>
        <p style="margin-top:14px;">節奏題與旋律題請對照原 PDF 自評。</p>
      </div>`;
    scoreArea.scrollIntoView({ behavior: 'smooth' });
  }
})();
