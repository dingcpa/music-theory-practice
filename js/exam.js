// 樂理測驗頁面邏輯
(function () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const exam = THEORY_EXAMS[id];

  const root = document.getElementById('exam-root');
  const titleEl = document.getElementById('exam-title');

  if (!exam) {
    root.innerHTML = '<div class="notice">找不到指定測驗。<a href="index.html">回首頁</a></div>';
    return;
  }

  document.title = exam.title + ' — 嘉義市國中藝才班術科測驗';
  titleEl.textContent = exam.title;

  const html = [];

  if (exam.notice) {
    html.push(`<div class="notice"><strong>說明：</strong>${exam.notice}</div>`);
  }
  if (exam.pdf) {
    html.push(`<p><a class="pdf-link" href="${exam.pdf}" target="_blank">📄 開啟原 PDF 試卷</a></p>`);
  }

  function fig(src, alt) {
    return `<div class="q-figure-wrap"><img class="q-figure" src="${src}" alt="${alt || ''}"></div>`;
  }

  exam.sections.forEach((section, sIdx) => {
    html.push(`<section class="section" data-section="${sIdx}">`);
    html.push(`<h3>${section.title}</h3>`);
    html.push(`<div class="q-instructions">${section.instruction}</div>`);

    // 一般 section.image 顯示為靜態圖（reference-only 例外，會改用手繪畫布）
    if (section.image && section.type !== 'reference-only') {
      html.push(fig(section.image, section.title));
    }

    if (section.type === 'reference-only') {
      // section 級譜例 → 用手繪畫布
      if (section.image) {
        html.push(`<div class="drawing-host" id="dh-${sIdx}"></div>`);
      }
      if (section.items) {
        html.push('<ul class="notes-list">');
        section.items.forEach((it, iIdx) => {
          if (typeof it === 'string') {
            html.push(`<li>${it}</li>`);
          } else {
            html.push(`<li>${it.label}`);
            if (it.image) {
              html.push(`<div class="drawing-host" id="dh-${sIdx}-${iIdx}"></div>`);
            }
            html.push('</li>');
          }
        });
        html.push('</ul>');
      }
      html.push('<p style="color:var(--muted);font-size:0.88rem;">※ 請於上方譜例上手繪作答；完成後可對照原 PDF 試卷自評。</p>');
    } else if (section.type === 'choice') {
      section.questions.forEach((q, qIdx) => {
        const opts = q.optionsHtml || q.options || section.commonOptions || [];
        const isHtml = !!q.optionsHtml;
        html.push(`<div class="question" data-qid="${qIdx}">`);
        html.push(`<div class="q-text"><span class="q-num">${q.id}.</span>${q.prompt}</div>`);
        if (q.image) html.push(fig(q.image, `第 ${q.id} 題譜例`));
        html.push('<ul class="options">');
        opts.forEach((opt, i) => {
          const optBody = isHtml ? opt : opt;
          html.push(`<li><label>
            <input type="radio" name="s${sIdx}q${qIdx}" value="${i + 1}">
            <span>(${i + 1}) ${optBody}</span>
          </label></li>`);
        });
        html.push('</ul>');
        if (q.note) {
          html.push(`<div class="q-instructions" style="color:var(--accent);">⚠️ ${q.note}</div>`);
        }
        html.push('</div>');
      });
    } else if (section.type === 'text-fill') {
      section.questions.forEach((q, qIdx) => {
        html.push(`<div class="question" data-qid="${qIdx}">`);
        html.push(`<div class="q-text"><span class="q-num">${q.id}.</span>${q.prompt}
          <input type="text" class="text-answer" name="s${sIdx}q${qIdx}"></div>`);
        if (q.image) html.push(fig(q.image, `第 ${q.id} 題譜例`));
        if (q.note) {
          html.push(`<div class="q-instructions" style="color:var(--accent);">⚠️ ${q.note}</div>`);
        }
        html.push('</div>');
      });
    } else if (section.type === 'inline-table') {
      const inputType = section.inputType || 'text';
      const opts = section.options || [];
      html.push('<div class="inline-table-wrap"><table class="inline-table">');
      html.push(`<tr><th class="row-label">${section.rowLabels[0]}</th>`);
      section.questions.forEach((q, qIdx) => {
        html.push(`<th data-qid="${qIdx}">${q.label}</th>`);
      });
      html.push('</tr>');
      html.push(`<tr><th class="row-label">${section.rowLabels[1]}</th>`);
      section.questions.forEach((q, qIdx) => {
        let cellInner;
        if (inputType === 'select') {
          cellInner = `<select class="text-answer cell-input" name="s${sIdx}q${qIdx}">
            <option value="">—</option>${opts.map((o, i) => `<option value="${i + 1}">${o}</option>`).join('')}
          </select>`;
        } else {
          cellInner = `<input type="text" class="text-answer cell-input" name="s${sIdx}q${qIdx}">`;
        }
        const prefix = section.cellPrefix ? `<span class="cell-affix">${section.cellPrefix}</span>` : '';
        const suffix = section.cellSuffix ? `<span class="cell-affix">${section.cellSuffix}</span>` : '';
        html.push(`<td data-qid="${qIdx}">${prefix}${cellInner}${suffix}</td>`);
      });
      html.push('</tr>');
      html.push('</table></div>');
      if (inputType === 'select' && opts.length) {
        html.push('<details class="inline-table-legend"><summary>展開選項代號說明</summary><ul>');
        opts.forEach((o, i) => html.push(`<li><strong>(${i + 1})</strong> ${o}</li>`));
        html.push('</ul></details>');
      }
    } else if (section.type === 'note-line-pair') {
      const circled = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩'];
      html.push('<div class="note-line-wrap"><table class="note-line-table">');
      html.push('<tr class="row-head"><th>題號</th>');
      section.questions.forEach((q, qIdx) => {
        html.push(`<th data-qid="${qIdx}">${circled[q.id - 1] || q.id}</th>`);
      });
      html.push('</tr>');
      html.push('<tr class="row-ref"><th>譜例</th>');
      section.questions.forEach((q) => {
        if (q.image) {
          html.push(`<td><img class="q-figure cell-figure" src="${q.image}" alt="第 ${q.id} 題"></td>`);
        } else {
          html.push(`<td><span class="ref-hint">第 ${q.id} 題</span></td>`);
        }
      });
      html.push('</tr>');
      html.push('<tr class="row-input"><th>音名</th>');
      section.questions.forEach((q, qIdx) => {
        html.push(`<td data-qid="${qIdx}">
          <input type="text" class="text-answer cell-input" name="s${sIdx}q${qIdx}n">
        </td>`);
      });
      html.push('</tr>');
      html.push('<tr class="row-input"><th>間線<br>名稱</th>');
      section.questions.forEach((q, qIdx) => {
        html.push(`<td data-qid="${qIdx}">
          <input type="text" class="text-answer cell-input" name="s${sIdx}q${qIdx}l">
        </td>`);
      });
      html.push('</tr>');
      html.push('</table></div>');
    } else if (section.type === 'matching-pair') {
      const lifeKeys = Object.keys(section.lifeOptions);
      const workKeys = Object.keys(section.workOptions);
      html.push('<div style="overflow-x:auto;"><table style="width:100%; border-collapse: collapse;">');
      html.push('<thead><tr style="background:#f0eee8;"><th style="padding:6px; text-align:left;">作曲家</th><th style="padding:6px;">生平事蹟</th><th style="padding:6px;">代表作品</th></tr></thead><tbody>');
      section.composers.forEach((c, qIdx) => {
        html.push(`<tr data-qid="${qIdx}">`);
        html.push(`<td style="padding:6px;">${c.name}</td>`);
        html.push(`<td style="padding:6px;"><select class="text-answer" name="s${sIdx}q${qIdx}l" style="width:90px;">
          <option value="">—</option>${lifeKeys.map(k => `<option value="${k}">${k}</option>`).join('')}</select></td>`);
        html.push(`<td style="padding:6px;"><select class="text-answer" name="s${sIdx}q${qIdx}w" style="width:90px;">
          <option value="">—</option>${workKeys.map(k => `<option value="${k}">${k}</option>`).join('')}</select></td>`);
        html.push('</tr>');
      });
      html.push('</tbody></table></div>');
      html.push('<details style="margin-top:10px;"><summary>展開選項說明</summary>');
      html.push('<p><strong>生平事蹟：</strong></p><ul>');
      lifeKeys.forEach(k => html.push(`<li><strong>${k}.</strong> ${section.lifeOptions[k]}</li>`));
      html.push('</ul><p><strong>代表作品：</strong></p><ul>');
      workKeys.forEach(k => html.push(`<li><strong>${k}.</strong> ${section.workOptions[k]}</li>`));
      html.push('</ul></details>');
    } else if (section.type === 'overlay-form') {
      const W = section.imageWidth;
      const H = section.imageHeight;
      html.push(`<div class="overlay-form" style="aspect-ratio:${W}/${H};">`);
      html.push(`<img class="of-bg" src="${section.image}" draggable="false" alt="${section.title}">`);
      section.fields.forEach((f, fi) => {
        const left = (f.x / W * 100).toFixed(3);
        const top = (f.y / H * 100).toFixed(3);
        const w = (f.w / W * 100).toFixed(3);
        const h = (f.h / H * 100).toFixed(3);
        const style = `left:${left}%;top:${top}%;width:${w}%;height:${h}%;`;
        if (f.kind === 'text') {
          html.push(`<input type="text" class="of-field of-text" name="s${sIdx}f${fi}" style="${style}">`);
        } else if (f.kind === 'draw') {
          html.push(`<div class="of-field of-draw" data-key="s${sIdx}f${fi}" style="${style}"></div>`);
        }
      });
      html.push('</div>');
    } else if (section.type === 'matching-major-minor') {
      const rows = section.rows;
      // 橫向表格：題號列、關係大調列、關係小調列
      html.push('<div class="major-minor-wrap"><table class="major-minor-table">');
      // 題號列
      html.push('<tr><th class="row-label">題號</th>');
      rows.forEach((r, qIdx) => {
        html.push(`<th data-qid="${qIdx}">${r.label || r.id}</th>`);
      });
      html.push('</tr>');
      // 關係大調列
      html.push('<tr><th class="row-label">關係大調</th>');
      rows.forEach((r, qIdx) => {
        if (r.majorGiven) {
          html.push(`<td data-qid="${qIdx}" class="given">${r.major}</td>`);
        } else {
          html.push(`<td data-qid="${qIdx}"><input type="text" class="text-answer cell-input" name="s${sIdx}q${qIdx}M"></td>`);
        }
      });
      html.push('</tr>');
      // 關係小調列
      html.push('<tr><th class="row-label">關係小調</th>');
      rows.forEach((r, qIdx) => {
        if (r.minorGiven) {
          html.push(`<td data-qid="${qIdx}" class="given">${r.minor}</td>`);
        } else {
          html.push(`<td data-qid="${qIdx}"><input type="text" class="text-answer cell-input" name="s${sIdx}q${qIdx}m"></td>`);
        }
      });
      html.push('</tr>');
      html.push('</table></div>');
      // 調號列截圖（如有提供）
      if (section.keySignatureImage) {
        html.push(fig(section.keySignatureImage, '調號'));
      }
    }

    html.push('</section>');
  });

  html.push('<div class="action-bar">');
  html.push('<button class="btn accent" id="grade-btn">交卷檢查</button>');
  html.push('<button class="btn secondary" id="reset-btn">重置作答</button>');
  html.push('<a class="btn" href="index.html">回首頁</a>');
  html.push('</div>');
  html.push('<div id="score-area"></div>');

  root.innerHTML = html.join('');

  // ─── 為 reference-only 的譜例建立手繪畫布 ───
  exam.sections.forEach((section, sIdx) => {
    if (section.type !== 'reference-only') return;
    if (section.image) {
      const host = document.getElementById(`dh-${sIdx}`);
      if (host) NotationCanvas.create(host, {
        backgroundImage: section.image,
        key: `s${sIdx}`,
        label: section.title
      });
    }
    if (section.items) {
      section.items.forEach((it, iIdx) => {
        if (typeof it === 'object' && it.image) {
          const host = document.getElementById(`dh-${sIdx}-${iIdx}`);
          if (host) NotationCanvas.create(host, {
            backgroundImage: it.image,
            key: `s${sIdx}i${iIdx}`,
            label: it.label
          });
        }
      });
    }
  });

  // ─── 為 overlay-form 的 draw 格建立空白譜表手繪畫布 ───
  exam.sections.forEach((section, sIdx) => {
    if (section.type !== 'overlay-form') return;
    section.fields.forEach((f, fi) => {
      if (f.kind !== 'draw') return;
      const host = root.querySelector(`.of-draw[data-key="s${sIdx}f${fi}"]`);
      if (!host) return;
      // 用 staff 模式（空白五線譜，無拍號無小節線）作為作答背景
      NotationCanvas.create(host, {
        noTimeSig: true,
        noBarLines: true,
        width: Math.max(400, f.w),
        height: Math.max(160, f.h * 0.8),
        minimal: true,
        key: `s${sIdx}f${fi}`
      });
    });
  });

  // ─── 計分邏輯 ───
  document.getElementById('grade-btn').addEventListener('click', grade);
  document.getElementById('reset-btn').addEventListener('click', reset);

  function normText(s) {
    if (!s) return '';
    return String(s).trim().toLowerCase()
      .replace(/[\s　]/g, '')
      .replace(/[#＃♯]/g, '#')
      .replace(/[♭]/g, 'b');
  }

  function fbAfter(parent, ok, expected) {
    if (!parent) return;
    const fb = document.createElement('div');
    fb.className = 'answer-feedback ' + (ok ? 'ok' : 'no');
    fb.textContent = ok ? '✓ 正確' : `正解：${expected}`;
    parent.appendChild(fb);
  }
  function fbCell(input, ok, expected) {
    if (!input) return;
    const td = input.closest('td') || input.parentElement;
    if (!td) return;
    const fb = document.createElement('div');
    fb.className = 'cell-feedback ' + (ok ? 'ok' : 'no');
    fb.textContent = ok ? '✓' : expected;
    td.appendChild(fb);
  }

  function grade() {
    let earnedRaw = 0;
    let totalRaw = 0;
    let scorable = 0;

    exam.sections.forEach((section, sIdx) => {
      if (section.type === 'reference-only') {
        // 手繪作答不自動判分；學員對照原 PDF 自評
        return;
      }

      if (section.type === 'overlay-form') {
        section.fields.forEach((f, fi) => {
          if (f.kind === 'text') {
            const input = document.getElementsByName(`s${sIdx}f${fi}`)[0];
            if (!input) return;
            input.disabled = true;
            if (f.answer == null) return;
            totalRaw++; scorable++;
            const correct = normText(input.value) === normText(f.answer);
            input.classList.add(correct ? 'correct' : 'wrong');
            if (correct) earnedRaw++;
            else input.title = '正解：' + f.answer;
            fbCell(input, correct, f.answer);
          }
          // draw 格不自動判分
        });
        return;
      }

      if (section.type === 'choice') {
        section.questions.forEach((q, qIdx) => {
          const opts = q.optionsHtml || q.options || section.commonOptions || [];
          const radios = document.getElementsByName(`s${sIdx}q${qIdx}`);
          const labels = root.querySelectorAll(`[data-section="${sIdx}"] [data-qid="${qIdx}"] label`);
          labels.forEach(l => l.classList.remove('correct','wrong','expected'));
          const ul = root.querySelector(`[data-section="${sIdx}"] [data-qid="${qIdx}"] .options`);
          if (ul) ul.classList.add('locked');
          const questionDiv = root.querySelector(`[data-section="${sIdx}"] .question[data-qid="${qIdx}"]`);

          let selected = null;
          radios.forEach(r => { if (r.checked) selected = parseInt(r.value, 10); r.disabled = true; });

          if (q.answer == null) return;
          totalRaw++;
          scorable++;
          if (selected === q.answer) {
            earnedRaw++;
            if (labels[selected - 1]) labels[selected - 1].classList.add('correct');
            fbAfter(questionDiv, true, '');
          } else {
            if (selected && labels[selected - 1]) labels[selected - 1].classList.add('wrong');
            if (labels[q.answer - 1]) labels[q.answer - 1].classList.add('expected');
            const expectedRaw = opts[q.answer - 1] || '';
            const expectedText = q.optionsHtml
              ? `(${q.answer})（見上方選項 ${q.answer}）`
              : `(${q.answer}) ${expectedRaw}`;
            fbAfter(questionDiv, false, expectedText);
          }
        });
      } else if (section.type === 'text-fill') {
        section.questions.forEach((q, qIdx) => {
          const input = document.getElementsByName(`s${sIdx}q${qIdx}`)[0];
          if (!input) return;
          input.disabled = true;
          if (q.answer == null) return;
          totalRaw++; scorable++;
          const correct = normText(input.value) === normText(q.answer);
          input.classList.add(correct ? 'correct' : 'wrong');
          if (correct) earnedRaw++;
          else input.title = '正解：' + q.answer;
          const questionDiv = root.querySelector(`[data-section="${sIdx}"] .question[data-qid="${qIdx}"]`);
          fbAfter(questionDiv, correct, q.answer);
        });
      } else if (section.type === 'inline-table') {
        const inputType = section.inputType || 'text';
        section.questions.forEach((q, qIdx) => {
          const input = document.getElementsByName(`s${sIdx}q${qIdx}`)[0];
          if (!input) return;
          input.disabled = true;
          if (q.answer == null) return;
          totalRaw++; scorable++;
          let correct;
          if (inputType === 'select') {
            correct = parseInt(input.value, 10) === q.answer;
          } else {
            correct = normText(input.value) === normText(q.answer);
          }
          input.classList.add(correct ? 'correct' : 'wrong');
          if (correct) earnedRaw++;
          const expected = inputType === 'select' && section.options
            ? section.options[q.answer - 1] : q.answer;
          if (!correct) input.title = '正解：' + expected;
          fbCell(input, correct, expected);
        });
      } else if (section.type === 'note-line-pair') {
        section.questions.forEach((q, qIdx) => {
          const nIn = document.getElementsByName(`s${sIdx}q${qIdx}n`)[0];
          const lIn = document.getElementsByName(`s${sIdx}q${qIdx}l`)[0];
          if (!nIn || !lIn) return;
          nIn.disabled = lIn.disabled = true;
          totalRaw += 2; scorable += 2;
          const c1 = normText(nIn.value) === normText(q.name);
          const c2 = normText(lIn.value) === normText(q.line);
          nIn.classList.add(c1 ? 'correct' : 'wrong');
          lIn.classList.add(c2 ? 'correct' : 'wrong');
          if (!c1) nIn.title = '正解：' + q.name;
          if (!c2) lIn.title = '正解：' + q.line;
          if (c1) earnedRaw++;
          if (c2) earnedRaw++;
          fbCell(nIn, c1, q.name);
          fbCell(lIn, c2, q.line);
        });
      } else if (section.type === 'matching-pair') {
        section.composers.forEach((c, qIdx) => {
          const lSel = document.getElementsByName(`s${sIdx}q${qIdx}l`)[0];
          const wSel = document.getElementsByName(`s${sIdx}q${qIdx}w`)[0];
          if (!lSel || !wSel) return;
          lSel.disabled = wSel.disabled = true;
          totalRaw += 2; scorable += 2;
          const c1 = lSel.value === c.life;
          const c2 = wSel.value === c.work;
          lSel.classList.add(c1 ? 'correct' : 'wrong');
          wSel.classList.add(c2 ? 'correct' : 'wrong');
          if (!c1) lSel.title = '正解：' + c.life;
          if (!c2) wSel.title = '正解：' + c.work;
          if (c1) earnedRaw++;
          if (c2) earnedRaw++;
          fbCell(lSel, c1, c.life);
          fbCell(wSel, c2, c.work);
        });
      } else if (section.type === 'matching-major-minor') {
        section.rows.forEach((r, qIdx) => {
          if (!r.majorGiven) {
            const M = document.getElementsByName(`s${sIdx}q${qIdx}M`)[0];
            if (M) {
              M.disabled = true;
              totalRaw++; scorable++;
              const c = normText(M.value) === normText(r.major);
              M.classList.add(c ? 'correct' : 'wrong');
              if (!c) M.title = '正解：' + r.major;
              if (c) earnedRaw++;
              fbCell(M, c, r.major);
            }
          }
          if (!r.minorGiven) {
            const m = document.getElementsByName(`s${sIdx}q${qIdx}m`)[0];
            if (m) {
              m.disabled = true;
              totalRaw++; scorable++;
              const c = normText(m.value) === normText(r.minor);
              m.classList.add(c ? 'correct' : 'wrong');
              if (!c) m.title = '正解：' + r.minor;
              if (c) earnedRaw++;
              fbCell(m, c, r.minor);
            }
          }
        });
      }
    });

    document.getElementById('grade-btn').disabled = true;

    const pct = totalRaw > 0 ? Math.round(earnedRaw / totalRaw * 100) : 0;
    const scoreArea = document.getElementById('score-area');
    scoreArea.innerHTML = `
      <div class="score-box">
        <div class="score">${earnedRaw} / ${totalRaw}</div>
        <div class="total">答對率 ${pct}%（共 ${scorable} 個可計分項目）</div>
        <p style="margin-top:14px;">綠色為答對、紅色為答錯，未填者視為錯誤。<br>
        每題下方／格內顯示「正解」可直接對照。</p>
      </div>`;
    scoreArea.scrollIntoView({ behavior: 'smooth' });
  }

  function reset() {
    location.reload();
  }
})();
