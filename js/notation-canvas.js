// 五線譜手繪畫布元件（用於聽寫節奏/旋律題作答）
// 使用方式：NotationCanvas.create(hostEl, { timeSig: '4/4', bars: 2, width: 900, height: 160, key: 's3q0' })
window.NotationCanvas = (function () {

  function buildStaffSvg(timeSig, bars, width, height, opts) {
    opts = opts || {};
    const ls = 13;
    const sh = ls * 4;
    const sy = (height - sh) / 2 + 4;
    const [num, den] = (timeSig || '4/4').split('/');

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`;

    for (let i = 0; i < 5; i++) {
      const y = sy + i * ls;
      svg += `<line x1="2" y1="${y}" x2="${width - 2}" y2="${y}" stroke="#222" stroke-width="1"/>`;
    }

    svg += `<text x="6" y="${sy + sh + ls * 0.6}" font-family="'Bravura Text','Cambria Math','Segoe UI Symbol','Noto Music',serif" font-size="${ls * 7.2}" fill="#222">𝄞</text>`;

    if (!opts.noTimeSig) {
      const tsX = 60;
      svg += `<text x="${tsX}" y="${sy + ls * 1.95}" font-family="'Times New Roman',serif" font-size="${ls * 2.3}" font-weight="700" fill="#222">${num}</text>`;
      svg += `<text x="${tsX}" y="${sy + sh + ls * 0.05}" font-family="'Times New Roman',serif" font-size="${ls * 2.3}" font-weight="700" fill="#222">${den}</text>`;
    }

    if (!opts.noBarLines) {
      const startX = opts.noTimeSig ? 60 : 95;
      const endX = width - 12;
      const barWidth = (endX - startX) / bars;
      for (let i = 1; i < bars; i++) {
        const x = startX + i * barWidth;
        svg += `<line x1="${x}" y1="${sy}" x2="${x}" y2="${sy + sh}" stroke="#222" stroke-width="1"/>`;
      }
      svg += `<line x1="${endX - 6}" y1="${sy}" x2="${endX - 6}" y2="${sy + sh}" stroke="#222" stroke-width="1"/>`;
      svg += `<line x1="${endX - 1}" y1="${sy}" x2="${endX - 1}" y2="${sy + sh}" stroke="#222" stroke-width="3.2"/>`;
    }

    svg += '</svg>';
    return svg;
  }

  function create(container, options) {
    const opt = Object.assign({
      timeSig: '4/4',
      bars: 2,
      backgroundImage: null,
      noTimeSig: false,
      noBarLines: false,
      minimal: false,    // true 時隱藏 dim-info 文字
      width: 900,
      height: 160,
      key: 'unknown',
      label: ''
    }, options);

    const isImage = !!opt.backgroundImage;
    const bgHtml = isImage
      ? `<img class="drawing-bg" src="${opt.backgroundImage}" alt="${opt.label || ''}" draggable="false">`
      : buildStaffSvg(opt.timeSig, opt.bars, opt.width, opt.height, {
          noTimeSig: opt.noTimeSig, noBarLines: opt.noBarLines
        });

    const wrapStyle = isImage ? '' : `style="aspect-ratio:${opt.width}/${opt.height};"`;
    const dimInfo = isImage
      ? (opt.label || '請在譜例上手繪作答')
      : `拍號 ${opt.timeSig}　${opt.bars} 小節`;

    const toolbarBody = opt.minimal
      ? `<button type="button" class="btn-tiny tool-btn active" data-act="pen">✏️</button>
         <button type="button" class="btn-tiny tool-btn" data-act="erase">🩹</button>
         <button type="button" class="btn-tiny" data-act="undo">↶</button>
         <button type="button" class="btn-tiny" data-act="clear">🗑</button>
         <span class="mark-info dim-info"></span>`
      : `<button type="button" class="btn-tiny tool-btn active" data-act="pen">✏️ 筆</button>
         <button type="button" class="btn-tiny tool-btn" data-act="erase">🩹 橡皮擦</button>
         <button type="button" class="btn-tiny" data-act="undo">↶ 上一步</button>
         <button type="button" class="btn-tiny" data-act="clear">🗑 清除</button>
         <span class="dim-info">${dimInfo}</span>`;

    container.innerHTML = `
      <div class="drawing-area${opt.minimal ? ' minimal' : ''}" data-key="${opt.key}">
        <div class="drawing-toolbar">${toolbarBody}</div>
        <div class="drawing-canvas-wrap" ${wrapStyle}>
          ${bgHtml}
          <canvas class="drawing-pen" width="${opt.width}" height="${opt.height}"></canvas>
        </div>
      </div>
    `;

    const wrap = container.querySelector('.drawing-area');
    const canvas = wrap.querySelector('.drawing-pen');
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isImage) {
      const img = wrap.querySelector('.drawing-bg');
      const syncSize = () => {
        const w = img.naturalWidth || opt.width;
        const h = img.naturalHeight || opt.height;
        canvas.width = w;
        canvas.height = h;
      };
      if (img.complete && img.naturalWidth) syncSize();
      else img.addEventListener('load', syncSize);
    }

    let strokes = [];
    let mode = 'pen';
    let drawing = false;

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const point = e.touches ? e.touches[0] : e;
      return {
        x: (point.clientX - rect.left) * canvas.width / rect.width,
        y: (point.clientY - rect.top) * canvas.height / rect.height
      };
    }

    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      strokes.forEach(s => {
        ctx.globalCompositeOperation = s.type === 'erase' ? 'destination-out' : 'source-over';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = s.type === 'erase' ? 18 : 1.8;
        ctx.beginPath();
        s.points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        if (s.points.length === 1) {
          // 單點：畫一個小圓
          ctx.arc(s.points[0].x, s.points[0].y, ctx.lineWidth / 2, 0, 2 * Math.PI);
          ctx.fillStyle = '#000';
          ctx.fill();
        } else {
          ctx.stroke();
        }
      });
      ctx.globalCompositeOperation = 'source-over';
    }

    function start(e) {
      e.preventDefault();
      drawing = true;
      const stroke = { type: mode, points: [getPos(e)] };
      strokes.push(stroke);
      redraw();
    }
    function move(e) {
      if (!drawing) return;
      e.preventDefault();
      strokes[strokes.length - 1].points.push(getPos(e));
      redraw();
    }
    function end() {
      drawing = false;
    }

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', () => { /* 不立即停筆，避免劃出邊界又回來時斷線 */ });
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);
    canvas.addEventListener('touchcancel', end);

    const tb = wrap.querySelector('.drawing-toolbar');
    function setMode(m) {
      mode = m;
      tb.querySelectorAll('.tool-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.act === m);
      });
    }
    tb.querySelector('[data-act="pen"]').addEventListener('click', () => setMode('pen'));
    tb.querySelector('[data-act="erase"]').addEventListener('click', () => setMode('erase'));
    tb.querySelector('[data-act="undo"]').addEventListener('click', () => {
      strokes.pop();
      redraw();
    });
    tb.querySelector('[data-act="clear"]').addEventListener('click', () => {
      if (strokes.length && !confirm('確定清除目前作答？')) return;
      strokes = [];
      redraw();
    });

    return {
      clear() { strokes = []; redraw(); },
      strokeCount() { return strokes.length; }
    };
  }

  // 由 sequence 計算小節數（總拍長 / 每小節拍長）
  function countBars(timeSig, sequence) {
    if (!sequence || !sequence.length) return 2;
    const [num, den] = timeSig.split('/').map(Number);
    // sequence 中每個 d 視為「四分音符」拍。每小節拍數 = num * 4 / den
    const beatsPerBar = num * 4 / den;
    const total = sequence.reduce((s, ev) => s + (ev.d || 0), 0);
    return Math.max(1, Math.round(total / beatsPerBar));
  }

  return { create, countBars };
})();
