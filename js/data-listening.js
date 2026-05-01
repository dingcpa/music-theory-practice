// 聽音測驗題目資料
// 來源：嘉義市國中藝才班術科鑑定答案 PDF（112、113、114 學年度）
//
// ⚠️ 校對須知：
//   - 音程「度數」、和絃「性質」、單音/節奏/旋律的拍號、音程/和絃題的選項代碼，皆來自答案 PDF 文字。
//   - 單音題的具體音高、節奏題的拍長組合、旋律題的具體音高，係從答案 PDF 譜面讀出，
//     若有極小落差，請對照原 PDF 編輯本檔對應陣列即可。
//   - 音程題、和絃題的「示範音」採用合理音高展示，重點在度數/性質正確；
//     若需完全還原原譜的音高，請依 PDF 譜面修改 notes 欄位。
//
// 標記法：使用科學記譜（C4 = 中央 Do），# 代表升、b 代表降。
// 例：A4 = 中央 La、Bb4 = 中央降 Si、F#5 = 高音譜的升 Fa。

const LISTENING_EXAMS = {

  '112-listening': {
    year: 112,
    title: '112 學年度 聽音測驗',
    pdf: '112-listening-a.pdf',
    sections: [
      // ─── 一、單音 ─── 10 題，每題 2 分
      {
        title: '一、單音',
        type: 'single-note',
        instruction: '請聽單音並寫出音名（每題播放三次，標準音為 A4）。每題 2 分，共 20 分。',
        questions: [
          { id: 1, note: 'G5', answer: 'G' },
          { id: 2, note: 'D5', answer: 'D' },
          { id: 3, note: 'C5', answer: 'C' },
          { id: 4, note: 'E4', answer: 'E' },
          { id: 5, note: 'G3', answer: 'G' },
          { id: 6, note: 'F#3', answer: 'F#' },
          { id: 7, note: 'D3', answer: 'D' },
          { id: 8, note: 'Bb4', answer: 'Bb' },
          { id: 9, note: 'Bb3', answer: 'Bb' },
          { id: 10, note: 'F#5', answer: 'F#' }
        ]
      },
      // ─── 二、音程 ─── 10 題，每題 2 分
      {
        title: '二、音程',
        type: 'interval',
        instruction: '請聽音程並寫出度數（連續播放三次）。每題 2 分，共 20 分。',
        questions: [
          { id: 1, notes: ['C5', 'Eb5'],   answer: '小3' },
          { id: 2, notes: ['F4', 'A4'],    answer: '增4', _note: '答案 PDF 為「增4」' },
          { id: 3, notes: ['D4', 'C#5'],   answer: '大7' },
          { id: 4, notes: ['G3', 'G4'],    answer: '純8' },
          { id: 5, notes: ['C4', 'C5'],    answer: '純8' },
          { id: 6, notes: ['B3', 'F4'],    answer: '減5' },
          { id: 7, notes: ['F4', 'C5'],    answer: '純5' },
          { id: 8, notes: ['G4', 'A4'],    answer: '大2' },
          { id: 9, notes: ['B3', 'F4'],    answer: '減5/增4', alt: ['減5', '增4'] },
          { id: 10, notes: ['F4', 'B4'],   answer: '增4/減5', alt: ['增4', '減5'] }
        ]
      },
      // ─── 三、和絃 ─── 5 題（112 為 5 題、共 10 分），含選項
      {
        title: '三、和絃性質',
        type: 'chord-quality',
        instruction: '請聽和絃並選出和絃性質（連續播放三次）。每題 2 分，共 10 分。',
        questions: [
          { id: 1, notes: ['D4','F4','A4'],
            options: ['大三和絃','小三和絃','增三和絃','減三和絃'], answer: 2 },
          { id: 2, notes: ['G4','B4','D5'],
            options: ['大三和絃','小三和絃','增三和絃','屬七和絃'], answer: 1 },
          { id: 3, notes: ['C4','E4','G#4'],
            options: ['大三和絃','小三和絃','增三和絃','減三和絃'], answer: 3 },
          { id: 4, notes: ['G3','B3','D4','F4'],
            options: ['大三和絃','小三和絃','屬七和絃','減三和絃'], answer: 3 },
          { id: 5, notes: ['B3','D4','F4'],
            options: ['大三和絃','小三和絃','屬七和絃','減三和絃'], answer: 4 }
        ]
      },
      // ─── 四、節奏 ─── 3 題（每題 10 分，共 30 分）以 A4 (中音譜第二間) 記譜
      {
        title: '四、節奏',
        type: 'rhythm',
        instruction: '請寫出所聽到的節奏，以高音譜第二間 A4 記譜，連續播放四次。每題 10 分，共 30 分。',
        bpm: 80,
        questions: [
          { id: 1, image: 'images/questions/listening/112-rhythm-q1.png', time: '3/4', sequence: [
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5},
              {note:'A4',d:1.0},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5}
            ] },
          { id: 2, image: 'images/questions/listening/112-rhythm-q2.png', time: '6/8', sequence: [
              {note:'A4',d:0.75},{note:'A4',d:0.25},{note:'A4',d:0.5},
              {note:'A4',d:0.75},{note:'A4',d:0.25},{note:'A4',d:0.5},
              {rest:true,d:0.25},{note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5}
            ] },
          { id: 3, image: 'images/questions/listening/112-rhythm-q3.png', time: '6/8', sequence: [
              {note:'A4',d:0.75},{note:'A4',d:0.25},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:1.0},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5}
            ] }
        ]
      },
      // ─── 五、旋律 ─── 2 題（每題 10 分，共 20 分）
      {
        title: '五、旋律',
        type: 'melody',
        instruction: '請寫出所聽到的旋律，第一個音為 A4，連續播放四次。每題 10 分，共 20 分。',
        bpm: 80,
        questions: [
          { id: 1, image: 'images/questions/listening/112-melody-q1.png', time: '4/4', sequence: [
              {note:'A4',d:0.5},{note:'C5',d:0.5},{note:'B4',d:0.5},{note:'G4',d:0.5},
              {note:'F#4',d:0.5},{note:'E4',d:0.5},{note:'D4',d:0.5},{note:'F4',d:0.5},
              {note:'G4',d:0.75},{note:'A4',d:0.25},{note:'B4',d:0.5},{note:'C5',d:0.5},
              {note:'D5',d:0.5},{note:'C5',d:0.5},{note:'A4',d:1.0}
            ] },
          { id: 2, image: 'images/questions/listening/112-melody-q2.png', time: '6/8', sequence: [
              {note:'A4',d:0.75},{note:'B4',d:0.25},{note:'C5',d:0.5},
              {note:'D5',d:0.5},{note:'C5',d:0.5},{note:'B4',d:0.5},
              {note:'A4',d:0.5},{note:'G4',d:0.5},{note:'A4',d:0.5},
              {note:'F#4',d:0.5},{note:'A4',d:1.5}
            ] }
        ]
      }
    ]
  },

  '113-listening': {
    year: 113,
    title: '113 學年度 聽音測驗',
    pdf: '113-listening-a.pdf',
    sections: [
      {
        title: '一、單音',
        type: 'single-note',
        instruction: '請聽單音並寫出音名（連續播放三次，標準音 A4）。每題 2 分，共 20 分。',
        questions: [
          { id: 1, note: 'F5', answer: 'F' },
          { id: 2, note: 'D5', answer: 'D' },
          { id: 3, note: 'B4', answer: 'B' },
          { id: 4, note: 'G4', answer: 'G' },
          { id: 5, note: 'E4', answer: 'E' },
          { id: 6, note: 'C4', answer: 'C' },
          { id: 7, note: 'A3', answer: 'A' },
          { id: 8, note: 'E3', answer: 'E' },
          { id: 9, note: 'F#5', answer: 'F#', alt: ['Gb'] },
          { id: 10, note: 'F#3', answer: 'F#', alt: ['Gb'] }
        ]
      },
      {
        title: '二、音程',
        type: 'interval',
        instruction: '請聽音程並寫出度數。每題 2 分，共 20 分。',
        questions: [
          { id: 1, notes: ['C4','E4'],   answer: '大3' },
          { id: 2, notes: ['E4','F4'],   answer: '小2' },
          { id: 3, notes: ['G4','D5'],   answer: '純5' },
          { id: 4, notes: ['C4','A4'],   answer: '大6' },
          { id: 5, notes: ['A4','C5'],   answer: '小3' },
          { id: 6, notes: ['B3','A4'],   answer: '小7' },
          { id: 7, notes: ['F4','B4'],   answer: '增4' },
          { id: 8, notes: ['B3','F4'],   answer: '減5' },
          { id: 9, notes: ['F4','G4'],   answer: '大2' },
          { id: 10, notes: ['F4','B4'],  answer: '增4/減5', alt: ['增4', '減5'] }
        ]
      },
      {
        title: '三、和絃性質',
        type: 'chord-quality',
        instruction: '請聽和絃選出和絃性質。每題 2 分，共 10 分。',
        questions: [
          { id: 1, notes: ['C4','E4','G4'],
            options: ['大三和絃','小三和絃','增三和絃','減三和絃'], answer: 1 },
          { id: 2, notes: ['A3','C4','E4'],
            options: ['大三和絃','小三和絃','增三和絃','屬七和絃'], answer: 2 },
          { id: 3, notes: ['B3','D4','F4'],
            options: ['大三和絃','小三和絃','增三和絃','減三和絃'], answer: 4 },
          { id: 4, notes: ['C4','E4','G#4'],
            options: ['大三和絃','小三和絃','增三和絃','屬七和絃'], answer: 3 },
          { id: 5, notes: ['G3','B3','D4','F4'],
            options: ['大三和絃','小三和絃','減三和絃','屬七和絃'], answer: 4 }
        ]
      },
      {
        title: '四、節奏',
        type: 'rhythm',
        instruction: '請寫出所聽到的節奏，以 A4 記譜。每題 10 分，共 30 分。',
        bpm: 80,
        questions: [
          { id: 1, image: 'images/questions/listening/113-rhythm-q1.png', time: '3/4', sequence: [
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5},
              {note:'A4',d:1.0},{note:'A4',d:0.333},{note:'A4',d:0.333},{note:'A4',d:0.333},
              {rest:true,d:0.25},{note:'A4',d:0.25},{note:'A4',d:0.25},{note:'A4',d:0.25}
            ] },
          { id: 2, image: 'images/questions/listening/113-rhythm-q2.png', time: '4/4', sequence: [
              {note:'A4',d:0.5},{note:'A4',d:0.333},{note:'A4',d:0.333},{note:'A4',d:0.333},
              {note:'A4',d:0.75},{note:'A4',d:0.25},{rest:true,d:0.25},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{rest:true,d:0.25},{note:'A4',d:0.25},
              {note:'A4',d:0.25},{rest:true,d:0.25},{note:'A4',d:0.25},{note:'A4',d:0.25},{rest:true,d:0.25}
            ] },
          { id: 3, image: 'images/questions/listening/113-rhythm-q3.png', time: '6/8', sequence: [
              {note:'A4',d:0.75},{note:'A4',d:0.25},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:1.0},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5}
            ] }
        ]
      },
      {
        title: '五、旋律',
        type: 'melody',
        instruction: '請寫出所聽到的旋律，第一個音為 A4，連續播放四次。每題 10 分，共 20 分。',
        bpm: 80,
        questions: [
          { id: 1, image: 'images/questions/listening/113-melody-q1.png', time: '4/4', sequence: [
              {note:'A4',d:0.75},{note:'A4',d:0.25},{note:'B4',d:0.5},{note:'C5',d:0.5},
              {note:'D5',d:0.75},{note:'C5',d:0.25},{note:'B4',d:0.5},{note:'A4',d:0.5},
              {note:'G4',d:0.5},{note:'F#4',d:0.5},{note:'A4',d:1.0},
              {note:'B4',d:0.333},{note:'A4',d:0.333},{note:'G#4',d:0.333},
              {note:'Bb4',d:0.5},{note:'A4',d:0.5}
            ] },
          { id: 2, image: 'images/questions/listening/113-melody-q2.png', time: '6/8', sequence: [
              {note:'A4',d:0.75},{note:'G4',d:0.25},{note:'F4',d:0.5},
              {note:'E4',d:0.5},{note:'F4',d:0.5},{note:'G4',d:0.5},
              {note:'A4',d:0.5},{note:'Bb4',d:0.5},{note:'B4',d:0.5},
              {note:'C5',d:0.5},{note:'D5',d:0.5},{note:'C#5',d:0.5},
              {note:'F#5',d:0.5}
            ] }
        ]
      }
    ]
  },

  '114-listening': {
    year: 114,
    title: '114 學年度 聽音測驗',
    pdf: '114-listening-a.pdf',
    sections: [
      {
        title: '一、單音',
        type: 'single-note',
        instruction: '請聽單音並寫出音名。每題 2 分，共 20 分。',
        questions: [
          { id: 1, note: 'E5', answer: 'E' },
          { id: 2, note: 'B4', answer: 'B' },
          { id: 3, note: 'G4', answer: 'G' },
          { id: 4, note: 'E4', answer: 'E' },
          { id: 5, note: 'D4', answer: 'D' },
          { id: 6, note: 'C4', answer: 'C' },
          { id: 7, note: 'F#4', answer: 'F#', alt: ['Gb'] },
          { id: 8, note: 'C#4', answer: 'C#', alt: ['Db'] },
          { id: 9, note: 'F#5', answer: 'F#', alt: ['Gb'] },
          { id: 10, note: 'Bb3', answer: 'Bb', alt: ['A#'] }
        ]
      },
      {
        title: '二、音程',
        type: 'interval',
        instruction: '請聽音程並寫出度數。每題 2 分，共 20 分。',
        questions: [
          { id: 1, notes: ['B3','C4'],   answer: '小2' },
          { id: 2, notes: ['F4','A4'],   answer: '大3' },
          { id: 3, notes: ['G4','D5'],   answer: '純5' },
          { id: 4, notes: ['E4','C5'],   answer: '小6' },
          { id: 5, notes: ['G4','B4'],   answer: '小3/純5/大3', alt: ['小3','純5','大3'],
            _note: '官方接受三種解答' },
          { id: 6, notes: ['Bb3','A4'],  answer: '大7' },
          { id: 7, notes: ['B3','F4'],   answer: '減5' },
          { id: 8, notes: ['F4','F5'],   answer: '純8' },
          { id: 9, notes: ['F4','G4'],   answer: '大2' },
          { id: 10, notes: ['F4','B4'],  answer: '增4/減5', alt: ['增4','減5'] }
        ]
      },
      {
        title: '三、和絃性質',
        type: 'chord-quality',
        instruction: '請聽和絃選出和絃性質。每題 2 分，共 10 分。',
        questions: [
          { id: 1, notes: ['D4','F4','A4'],
            options: ['大三和絃','小三和絃','增三和絃','減三和絃'], answer: 2 },
          { id: 2, notes: ['F4','A4','C5'],
            options: ['大三和絃','小三和絃','增三和絃','屬七和絃'], answer: 1 },
          { id: 3, notes: ['Eb4','G4','B4'],
            options: ['大三和絃','小三和絃','增三和絃','減三和絃'], answer: 3 },
          { id: 4, notes: ['C#4','E4','G4'],
            options: ['大三和絃','小三和絃','增三和絃','減三和絃'], answer: 4 },
          { id: 5, notes: ['C4','E4','G4','Bb4'],
            options: ['大三和絃','小三和絃','減三和絃','屬七和絃'], answer: 4 }
        ]
      },
      {
        title: '四、節奏',
        type: 'rhythm',
        instruction: '請寫出所聽到的節奏，以 A4 記譜。每題 10 分，共 30 分。',
        bpm: 80,
        questions: [
          { id: 1, image: 'images/questions/listening/114-rhythm-q1.png', time: '3/4', sequence: [
              {note:'A4',d:0.75},{note:'A4',d:0.25},{note:'A4',d:0.5},{note:'A4',d:0.5},
              {note:'A4',d:0.75},{note:'A4',d:0.25},{note:'A4',d:0.5},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5}
            ] },
          { id: 2, image: 'images/questions/listening/114-rhythm-q2.png', time: '4/4', sequence: [
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.333},{note:'A4',d:0.333},{note:'A4',d:0.333},
              {note:'A4',d:0.75},{note:'A4',d:0.25},{note:'A4',d:0.25},{note:'A4',d:0.25},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:1.0},
              {note:'A4',d:0.25},{note:'A4',d:0.25},{note:'A4',d:0.5}
            ] },
          { id: 3, image: 'images/questions/listening/114-rhythm-q3.png', time: '6/8', sequence: [
              {note:'A4',d:0.5},{note:'A4',d:0.333},{note:'A4',d:0.333},{note:'A4',d:0.333},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5},
              {note:'A4',d:0.5},{note:'A4',d:1.0},
              {note:'A4',d:0.5},{note:'A4',d:0.5},{note:'A4',d:0.5}
            ] }
        ]
      },
      {
        title: '五、旋律',
        type: 'melody',
        instruction: '請寫出所聽到的旋律，第一個音為 A4。每題 10 分，共 20 分。',
        bpm: 76,
        questions: [
          { id: 1, image: 'images/questions/listening/114-melody-q1.png', time: '4/4', sequence: [
              {note:'A4',d:0.75},{note:'A4',d:0.25},{note:'B4',d:0.5},
              {note:'C5',d:0.333},{note:'D5',d:0.333},{note:'E5',d:0.333},{note:'D5',d:0.5},
              {note:'F5',d:0.25},{note:'E5',d:0.25},{note:'Eb5',d:0.5},
              {note:'D5',d:0.333},{note:'C5',d:0.333},{note:'Bb4',d:0.333},
              {note:'C#5',d:0.5},{note:'A4',d:0.5}
            ] },
          { id: 2, image: 'images/questions/listening/114-melody-q2.png', time: '6/8', sequence: [
              {note:'A4',d:0.75},{note:'A#4',d:0.25},{note:'B4',d:0.5},
              {note:'C5',d:0.5},{note:'D5',d:0.5},{note:'Eb5',d:0.5},
              {note:'D5',d:0.333},{note:'Db5',d:0.333},{note:'C5',d:0.333},
              {note:'B4',d:0.5},{note:'Bb4',d:0.5},{note:'A#4',d:0.5},
              {note:'B4',d:0.5}
            ] }
        ]
      }
    ]
  }
};
