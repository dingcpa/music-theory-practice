// Piano audio engine — Tone.js + Salamander Grand Piano (Yamaha C5 真實鋼琴錄音)
// 樣本來源：https://tonejs.github.io/audio/salamander/
// 非 MIDI 合成，為實錄鋼琴 mp3 樣本，自動補插值產生其他音高。

const Piano = (() => {
  let sampler = null;
  let loaded = false;
  let loading = null;

  function getSampler() {
    if (sampler) return sampler;
    sampler = new Tone.Sampler({
      urls: {
        A0: "A0.mp3",
        C1: "C1.mp3", "D#1": "Ds1.mp3", "F#1": "Fs1.mp3", A1: "A1.mp3",
        C2: "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3", A2: "A2.mp3",
        C3: "C3.mp3", "D#3": "Ds3.mp3", "F#3": "Fs3.mp3", A3: "A3.mp3",
        C4: "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3", A4: "A4.mp3",
        C5: "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3", A5: "A5.mp3",
        C6: "C6.mp3", "D#6": "Ds6.mp3", "F#6": "Fs6.mp3", A6: "A6.mp3",
        C7: "C7.mp3", "D#7": "Ds7.mp3", "F#7": "Fs7.mp3", A7: "A7.mp3",
        C8: "C8.mp3"
      },
      release: 1.5,
      baseUrl: "https://tonejs.github.io/audio/salamander/"
    }).toDestination();
    return sampler;
  }

  async function init() {
    if (loaded) return;
    if (loading) return loading;
    loading = (async () => {
      await Tone.start();
      const s = getSampler();
      await Tone.loaded();
      loaded = true;
    })();
    return loading;
  }

  function isLoaded() { return loaded; }

  // 將 "C#5" / "Bb4" 等記法正規化為 Tone.js 接受的格式
  // Tone.js 支援 C#, Db, F#, Gb 等
  function normalizeNote(note) {
    return note.replace(/♯/g, '#').replace(/♭/g, 'b');
  }

  // 播放單音
  // duration: 持續時間（秒）
  async function playNote(note, duration = 1.5, time = undefined) {
    await init();
    const s = getSampler();
    s.triggerAttackRelease(normalizeNote(note), duration, time);
  }

  // 播放和弦（同時奏）
  async function playChord(notes, duration = 2.0, time = undefined) {
    await init();
    const s = getSampler();
    const ns = notes.map(normalizeNote);
    s.triggerAttackRelease(ns, duration, time);
  }

  // 播放音程（先後奏，再和聲奏一次）
  // notes: 兩個音
  async function playInterval(notes, opts = {}) {
    await init();
    const noteDur = opts.noteDur || 1.0;
    const gap = opts.gap || 0.15;
    const harmonyDur = opts.harmonyDur || 1.8;
    const harmonyGap = opts.harmonyGap || 0.6;
    const s = getSampler();
    const now = Tone.now();
    const ns = notes.map(normalizeNote);
    s.triggerAttackRelease(ns[0], noteDur, now);
    s.triggerAttackRelease(ns[1], noteDur, now + noteDur + gap);
    s.triggerAttackRelease(ns, harmonyDur, now + (noteDur + gap) * 2 + harmonyGap);
  }

  // 播放旋律 / 節奏
  // sequence: [{ note: "A4", duration: 0.5 }, { rest: true, duration: 0.5 }, ...]
  // tempo: 1 = 原速
  async function playSequence(sequence, opts = {}) {
    await init();
    const s = getSampler();
    const tempo = opts.tempo || 1;
    let t = Tone.now() + 0.05;
    for (const ev of sequence) {
      const dur = (ev.duration || 0.5) / tempo;
      if (!ev.rest) {
        const note = ev.note;
        if (Array.isArray(note)) {
          s.triggerAttackRelease(note.map(normalizeNote), dur * 0.95, t);
        } else if (note) {
          s.triggerAttackRelease(normalizeNote(note), dur * 0.95, t);
        }
      }
      t += dur;
    }
    return (t - Tone.now()) * 1000; // 播放總長 ms
  }

  // 播放標準音 A4 提示
  async function playReferenceA() {
    await playNote("A4", 1.5);
  }

  // 接連播放：先播 A4 標準音、停一拍、再播題目（用於聽音題開頭）
  async function playWithReference(playFn, refDelay = 1500) {
    await init();
    await playNote("A4", 1.0);
    setTimeout(() => playFn(), refDelay);
  }

  return {
    init, isLoaded, playNote, playChord, playInterval,
    playSequence, playReferenceA, playWithReference, normalizeNote
  };
})();
