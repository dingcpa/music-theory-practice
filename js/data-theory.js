// 樂理及音樂基本常識 — 各年度題目資料
// 來源：嘉義市國中藝才班術科測驗 PDF（111–114 學年度）
// 題目 prompt / instruction / options 文字皆對齊原 PDF；答案以官方公布為準。
// 譜例 PNG 由 tools/crop_questions.py 從原 PDF 直接抽取，存於 web/images/questions/。

const THEORY_EXAMS = {

  '111-theory': {
    year: 111,
    title: '111 學年度 樂理及音樂基本常識',
    pdf: '111-theory-q.pdf',
    notice: '本年度官方未公布答案，題目以原試卷為準。',
    sections: [
      {
        title: '一、音名 10%',
        instruction: '請寫出下列各音的音名（音名名稱：C、D、E、F、G、A、B）。例：（C）。（每題 2 分，共 10 分）',
        image: 'images/questions/111-1.png',
        type: 'inline-table',
        rowLabels: ['題號', '答案'],
        inputType: 'text',
        cellPrefix: '(',
        cellSuffix: ')',
        questions: [
          { id: 1, label: '1', answer: null },
          { id: 2, label: '2', answer: null },
          { id: 3, label: '3', answer: null },
          { id: 4, label: '4', answer: null },
          { id: 5, label: '5', answer: null }
        ]
      },
      {
        title: '二、音程 10%',
        instruction: '請在指定音上方加音，使其成為指定的音程。（每題 2 分，共 10 分）',
        image: 'images/questions/111-2.png',
        type: 'reference-only',
        items: [
          { label: '1. 小三度' },
          { label: '2. 完全八度' },
          { label: '3. 減四度' },
          { label: '4. 小六度' },
          { label: '5. 增二度' }
        ],
        interactive: {
          mode: 'mark-points',
          hint: '請依序在 5 個指定音的「上方」點擊加入的音。',
          tolerance: 35
          // targets: [{ x, y }, ...]  ← 待標註 5 個正解音符位置
        }
      },
      {
        title: '三、和絃 20%',
        instruction: '請寫出下列和絃的完全名稱，例如：（大三）和絃。（每題 2 分，共 20 分）',
        image: 'images/questions/111-3.png',
        type: 'inline-table',
        rowLabels: ['題號', '答案'],
        inputType: 'text',
        cellPrefix: '(',
        cellSuffix: ') 和絃',
        questions: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1, label: String(i + 1), answer: null
        }))
      },
      {
        title: '四、配合題 10%',
        instruction: '中國歷代宮廷的典禮、祭祀或民俗慶典，皆可見到傳統樂器的演奏。下列中國傳統樂器依據演奏方式分別屬於那種類型，請將分類代號填入括弧中。A：吹管樂器　B：拉弦樂器　C：彈撥樂器　D：擊樂器（每格 2 分，共 10 分）',
        type: 'inline-table',
        rowLabels: ['樂器', '分類代號'],
        inputType: 'select',
        options: ['A 吹管樂器', 'B 拉弦樂器', 'C 彈撥樂器', 'D 擊樂器'],
        questions: [
          { id: 1, label: '三弦', answer: 3 },
          { id: 2, label: '二胡', answer: 2 },
          { id: 3, label: '小鈸', answer: 4 },
          { id: 4, label: '笙',   answer: 1 },
          { id: 5, label: '大鑼', answer: 4 }
        ]
      },
      {
        title: '五、畫出小節線及終止線 10%',
        instruction: '請依照指定的拍號，畫上小節線及終止線。（每格 2 分，共 10 分）',
        image: 'images/questions/111-5.png',
        type: 'reference-only',
        interactive: {
          mode: 'mark-vertical-lines',
          hint: '請點擊譜例位置畫小節線及終止線（可重複點擊；點錯可用「上一步」回退）。',
          tolerance: 40
          // targets: [{ x: ... }, ...]  ← 待標註正解 X 座標（圖原始像素）
        }
      },
      {
        title: '六、音樂常識 40%',
        instruction: '（每題 2 分，共 40 分）',
        type: 'choice',
        questions: [
          { id: 1, prompt: '阿倫在嘉義市政府文化局的宣傳網站上看到一則資訊，上面寫著「為紀念聖桑仙遊天際 100+1 週年，我們將演出聖桑的系列作品。」請問下列哪首樂曲是聖桑的作品？',
            options: ['《小星星變奏曲》', '《動物狂歡節》', '《鬥牛士進行曲》', '《彼得與狼》'], answer: 2 },
          { id: 2, prompt: '宜靜最近看到烏俄戰爭的相關新聞報導時，想起曾聽過的幾位著名的俄國音樂家，請問下列何者並非俄國音樂家？',
            options: ['德弗乍克', '柴科夫斯基', '普羅科菲夫', '穆梭斯基'], answer: 1 },
          { id: 3, prompt: '下列何者速度記號是表示音樂的速度逐漸加快？',
            options: ['rit.', 'a tempo', 'accel.', 'rubato'], answer: 3 },
          { id: 4, prompt: '小婕在佈告欄上看到一張音樂會宣傳海報，上面的節目名稱為銅管家族音樂會，演出曲目皆為耳熟能詳的古典音樂名曲。請問小婕若去欣賞音樂會，應該會看見下列哪一項樂器？',
            options: ['長笛', '長號', '豎笛', '低音管'], answer: 2 },
          { id: 5, prompt: '奧地利作曲家海頓自小家境貧苦，但仍努力學習，展現非凡的音樂才能，而後成為當時歐洲知名的音樂家。其豐富的器樂作品讓後輩音樂家視為典範，而被尊稱為？',
            options: ['音樂之父', '鋼琴詩人', '交響曲之父', '藝術歌曲之王'], answer: 3 },
          { id: 6, prompt: '去年東京奧運比賽時，因舉重代表選手郭婞淳勇奪金牌，讓頒獎典禮上不僅有我國奧會會旗在場上飄揚，現場更是響起國旗歌的旋律，讓不少人感到既激動又驕傲。我國國旗歌為四拍子的樂曲，請問下列那一首樂曲並非四拍子的樂曲？',
            options: ['〈小星星〉', '〈小蜜蜂〉', '〈歡樂歌〉', '〈生日快樂歌〉'], answer: 4 },
          { id: 7, prompt: '德布西的作品經常出現違反規則的不尋常和聲，成就他開創音樂新風格的基礎，而成為 20 世紀音樂的拓荒者。請問下列那一個作品為德布西所作的？',
            options: ['《牧神午後前奏曲》', '《藍色多瑙河》', '《天鵝湖》', '《大學慶典序曲》'], answer: 1 },
          { id: 8, prompt: '雙簧樂器的吹嘴是結合兩片簧片而製成的，請問下列哪一項樂器並非屬雙簧樂器？',
            options: ['雙簧管', '低音管', '英國管', '豎笛'], answer: 4 },
          { id: 9, prompt: '請問下列譜例中的裝飾音名稱為何？',
            image: 'images/questions/111-6q9.png',
            options: ['順迴音', '逆迴音', '短倚音', '長倚音'], answer: null,
            note: '官方未公布答案。' },
          { id: 10, prompt: '北管音樂的樂曲種類多樣而豐富，主要的演出方式是樂團合奏，樂團形式分成鼓吹樂與絲竹樂。請問下列哪一項樂器是屬於絲竹樂？',
            options: ['堂鼓', '月琴', '拍板', '梆子'], answer: 2 },
          { id: 11, prompt: '阿凱在網路上看到一齣精湛的歌劇演出，裡頭的歌曲也讓人留下深刻的印象。歌曲除了有帕帕基諾所演唱的〈快樂的捕鳥人〉，還有擁有高超技巧的夜后所演唱的〈復仇的火焰〉。請問阿凱看到的是下列哪一齣歌劇？',
            options: ['《女人皆如此》', '《魔笛》', '《杜蘭朵公主》', '《胡桃鉗》'], answer: 2 },
          { id: 12, prompt: '請問下列樂譜總共有幾個降 Si？',
            image: 'images/questions/111-6q12.png',
            options: ['3 個', '4 個', '5 個', '6 個'], answer: null,
            note: '官方未公布答案。' },
          { id: 13, prompt: '〈輕騎兵序曲〉是一首管絃樂作品，描寫軍隊騎馬出征、奮勇抗敵的英姿。請問〈輕騎兵序曲〉是由下列哪一位作曲家所寫的？',
            options: ['德弗乍克', '舒伯特', '布拉姆斯', '蘇佩'], answer: 4 },
          { id: 14, prompt: '呂泉生是臺灣作曲家，年輕時赴日學習音樂，回臺後除了從事音樂教學外，也致力於歌曲創作、合唱教學與採集彙編臺灣民謠。請問下列哪一首樂曲並非呂泉生所作的？',
            options: ['《搖嬰仔歌》', '《臺灣素描》', '《杯底不可飼金魚》', '《阮若打開心內的門窗》'], answer: 2 },
          { id: 15, prompt: '下列何種銅管樂器因音色柔和溫暖，而出現在木管五重奏的編制中？',
            options: ['小喇叭', '長號', '法國號', '低音號'], answer: 3 },
          { id: 16, prompt: '「南管音樂」是台灣具代表性的古典音樂之一，其對樂器的使用有嚴格的限制與規定，其中「下四管」的樂器為？',
            options: ['打擊樂器', '拉絃樂器', '彈撥樂器', '吹管樂器'], answer: 1 },
          { id: 17, prompt: '「臀鈴」是台灣哪個原住民族特有的傳統樂器，在矮靈祭時有避邪招福、淨化靈界空間之用？',
            options: ['撒奇萊雅族', '噶瑪蘭族', '太魯閣族', '賽夏族'], answer: 4 },
          { id: 18, prompt: '一生都對祖國波蘭懷抱著濃厚的思念，這種情緒反映在他的作品上，如〈波蘭舞曲〉和〈馬厝卡舞曲〉就具有民族風格與情感，代表作品有〈練習曲〉、〈夜曲〉等作品。請問上述敘述是指下列哪一位音樂家？',
            options: ['蕭邦', '比才', '舒曼', '拉威爾'], answer: 1 },
          { id: 19, prompt: '英國國王喬治二世聽到〈哈利路亞〉時身受感動，因而起立致敬。請問〈哈利路亞〉是來自於下列哪一齣神劇？',
            options: ['《橄欖山上的基督》', '《以利亞》', '《彌賽亞》', '《創世紀》'], answer: 3 },
          { id: 20, prompt: '下列術語排列由快到慢，何者正確？',
            options: ['Andante、Adagio、Allegro', 'Adagio、Allegro、Andante',
                     'Allegro、Adagio、Andante', 'Allegro、Andante、Adagio'], answer: 4 }
        ]
      }
    ]
  },

  '112-theory': {
    year: 112,
    title: '112 學年度 樂理及音樂基本常識',
    pdf: '112-theory-a.pdf',
    sections: [
      {
        title: '一、音名 10%',
        instruction: '請寫出下列各音的音名。（音名名稱：C、D、E、F、G、A、B）（每題 2 分，共 10 分）',
        image: 'images/questions/112-1.png',
        type: 'inline-table',
        rowLabels: ['題號', '答案'],
        inputType: 'text',
        cellPrefix: '(',
        cellSuffix: ')',
        questions: [
          { id: 1, label: '1', answer: 'A' },
          { id: 2, label: '2', answer: 'G' },
          { id: 3, label: '3', answer: 'G' },
          { id: 4, label: '4', answer: 'F' },
          { id: 5, label: '5', answer: 'F' }
        ]
      },
      {
        title: '二、和弦 20%',
        instruction: '請寫出下列和弦的完全名稱，例如：（大三）和弦。（每題 2 分，共 20 分）',
        image: 'images/questions/112-2.png',
        type: 'inline-table',
        rowLabels: ['題號', '答案'],
        inputType: 'select',
        options: ['大三', '小三', '增三', '減三', '屬七'],
        cellSuffix: '和弦',
        questions: [
          { id: 1, label: '1', answer: 2 },
          { id: 2, label: '2', answer: 5 },
          { id: 3, label: '3', answer: 1 },
          { id: 4, label: '4', answer: 4 },
          { id: 5, label: '5', answer: 2 },
          { id: 6, label: '6', answer: 1 },
          { id: 7, label: '7', answer: 3 },
          { id: 8, label: '8', answer: 4 },
          { id: 9, label: '9', answer: 5 },
          { id: 10, label: '10', answer: 1 }
        ]
      },
      {
        title: '三、音階 10%',
        instruction: '以指定音為主音或起音，請寫出指定的上行音階或調式（以臨時記號作答）。（每題 2 分，共 10 分）',
        type: 'reference-only',
        items: [
          { label: '1. 大音階',         image: 'images/questions/112-3q1.png',
            interactive: { mode: 'mark-points', hint: '請依序點擊大音階各音的位置。', tolerance: 35 } },
          { label: '2. 自然小音階',     image: 'images/questions/112-3q2.png',
            interactive: { mode: 'mark-points', hint: '請依序點擊自然小音階各音的位置。', tolerance: 35 } },
          { label: '3. 和聲小音階',     image: 'images/questions/112-3q3.png',
            interactive: { mode: 'mark-points', hint: '請依序點擊和聲小音階各音的位置。', tolerance: 35 } },
          { label: '4. 全音音階',       image: 'images/questions/112-3q4.png',
            interactive: { mode: 'mark-points', hint: '請依序點擊全音音階各音的位置。', tolerance: 35 } },
          { label: '5. 五聲音階羽調式', image: 'images/questions/112-3q5.png',
            interactive: { mode: 'mark-points', hint: '請依序點擊五聲音階羽調式各音的位置。', tolerance: 35 } }
        ]
      },
      {
        title: '四、配合題 20%',
        instruction: '請將下列正確的音樂術語名稱代號填入配對的選項中。（每格 2 分，共 20 分）',
        type: 'inline-table',
        rowLabels: ['術語', '代號'],
        inputType: 'select',
        options: [
          'A 快板', 'B 中板', 'C 速度漸慢', 'D 速度漸快', 'E 漸強', 'F 漸弱',
          'G 中強', 'H 弱', 'I 富有表情地', 'J 圓滑', 'K 柔和地', 'L 莊嚴地'
        ],
        questions: [
          { id: 1,  label: '(1) Piano (p)',         answer: 8 },
          { id: 2,  label: '(2) Legato',            answer: 10 },
          { id: 3,  label: '(3) Moderato',          answer: 2 },
          { id: 4,  label: '(4) Mezzo Forte (mf)',  answer: 7 },
          { id: 5,  label: '(5) Allegro',           answer: 1 },
          { id: 6,  label: '(6) accel.',            answer: 4 },
          { id: 7,  label: '(7) cresc.',            answer: 5 },
          { id: 8,  label: '(8) rit.',              answer: 3 },
          { id: 9,  label: '(9) Espressivo',        answer: 9 },
          { id: 10, label: '(10) Dolce',            answer: 11 }
        ]
      },
      {
        title: '五、音樂常識 40%',
        instruction: '（每題 2 分，共 40 分）',
        type: 'choice',
        questions: [
          { id: 1, prompt: '小恩在國慶大典上看到日本京都橘高校吹奏樂部的演出，整齊劃一的表演令人驚豔，其中有個樂器上面還附有「日台友情」的標語。小恩對這個樂器充滿好奇，查閱資料後得知這個樂器是蘇沙號，請問這個樂器是屬於下列何者樂器分類？',
            options: ['高音木管樂器', '高音銅管樂器', '低音木管樂器', '低音銅管樂器'], answer: 4 },
          { id: 2, prompt: '請問下列譜例是出自於哪部音樂作品？',
            image: 'images/questions/112-5q2.png',
            options: ['《真善美》', '《胡桃鉗》', '《彌賽亞》', '《鱒魚》'], answer: 3 },
          { id: 3, prompt: '圓舞曲是社交舞中歷史最悠久的舞蹈，又稱華爾滋或宮廷舞。請問下列圓舞曲作品與作者的配對何者正確？',
            options: ['《小狗圓舞曲》－柴科夫斯基', '《花之圓舞曲》－蕭邦',
                     '《皇帝圓舞曲》－海頓', '《南國玫瑰圓舞曲》－約翰．史特勞斯'], answer: 4 },
          { id: 4, prompt: '《歡樂歌》是貝多芬合唱交響曲第四樂章最主要的旋律，譜例中的旋律主要是使用下列何種作曲技法？',
            image: 'images/questions/112-5q4.png',
            options: ['級進', '跳進', '和聲', '重複音'], answer: 1 },
          { id: 5, prompt: '臺灣作曲家，致力為臺灣譜出優美、動人的樂章，被譽為「最後的浪漫主義鋼琴詩人」，其著名作品有《一九四七序曲》、《上美的花》、《毋通嫌臺灣》等。請問上述描述的是下列哪位臺灣作曲家？',
            options: ['呂泉生', '江文也', '蕭泰然', '郭芝苑'], answer: 3 },
          { id: 6, prompt: '譜例為奧地利作曲家蘇佩的〈輕騎兵序曲〉之序奏，依其譜例上之組成音為下列何者和弦？',
            image: 'images/questions/112-5q6.png',
            options: ['小三和弦', '大三和弦', '增三和弦', '減三和弦'], answer: 2 },
          { id: 7, prompt: '歌劇是西方文化重要的表演藝術，融入音樂、戲劇等元素，呈現多元化的表演風格。請問下列何者為比才的歌劇作品？',
            options: ['《魔笛》', '《卡門》', '《杜蘭朵公主》', '《蝴蝶夫人》'], answer: 2 },
          { id: 8, prompt: '《彼得與狼》利用樂器的音色與曲調分別代表故事中的角色。請問《彼得與狼》的老爺爺是用下列何種樂器代表？',
            options: ['長笛', '雙簧管', '低音管', '定音鼓'], answer: 3 },
          { id: 9, prompt: '法國作曲家，其作品中經常出現違反規則的不尋常和聲，為 20 世紀音樂的拓荒者，著名作品有管弦樂《海》、《牧神午後前奏曲》，鋼琴組曲《貝加馬斯克組曲》等。請問上述是指下列哪位音樂家？',
            options: ['舒伯特', '舒曼', '貝多芬', '德布西'], answer: 4 },
          { id: 10, prompt: '小靜很喜歡音樂老師介紹的某首樂曲，這首樂曲一開始是由單簧管演奏裝飾音與滑奏，旋律多使用裝飾音和切分音，是個令人印象深刻的開頭，且這首樂曲是一首獨奏鋼琴與爵士樂團的合奏樂曲。請問上述可能是下列哪首樂曲？',
            options: ['《藍色狂想曲》', '《一個美國人在巴黎》', '《楓葉散拍》', '《魔法師的弟子》'], answer: 1 },
          { id: 11, prompt: '傳統表演藝術保存者許坤仲雖於今年逝世，但他積極推廣並傳承臺灣原住民珍貴的傳統音樂，為後世留下無形的文化資產，而他所演奏的樂器更是排灣族傳統音樂中最具代表性的樂器文化。請問上述指的是下列何者樂器？',
            options: ['臀鈴', '口簧琴', '弓琴', '鼻笛'], answer: 4 },
          { id: 12, prompt: '下列中國傳統樂器四大類型的配對，何者正確？',
            options: ['拉弦樂器－三弦', '彈撥樂器－阮', '擊樂器－嗩吶', '吹管樂器－揚琴'], answer: 2 },
          { id: 13, prompt: '藝術歌曲是作曲家根據文學家創作的詩詞，結合作曲的技巧所創作出來的歌曲，請問下列有關藝術歌曲的敘述何者正確？',
            options: ['興起於 19 世紀的義大利', '代表作曲家為舒曼，也被譽為「歌曲之王」',
                     '著名的藝術歌曲〈野玫瑰〉是作曲家舒伯特的作品', '通常是由交響樂團伴奏，來表現歌詞細膩的情感'], answer: 3 },
          { id: 14, prompt: '出生於台東縣卑南鄉的卑南族作曲家創作出許多動人的作品，如〈美麗的稻穗〉〈懷念年祭〉…等，也被譽為「卑南族音樂之父」，請問是下列哪一位音樂家？',
            options: ['郭英男', '陸森寶', '楊兆禎', '呂泉生'], answer: 2 },
          { id: 15, prompt: '柴可夫斯基是俄國著名的音樂家，創作無數膾炙人口的音樂作品，其中又以三大芭蕾舞劇音樂廣受大眾歡迎，下列何者不是他的三齣芭蕾舞音樂作品？',
            options: ['《睡美人》', '《天鵝湖》', '《羅密歐與茱麗葉》', '《胡桃鉗》'], answer: 3 },
          { id: 16, prompt: '民歌是民間流傳的歌曲，其歌詞淺顯、曲調簡單，是人們長年累月口耳相傳的歌曲，請問下列民歌的配對何者錯誤？',
            options: ['〈老山歌〉－客家民歌', '〈丟丟銅仔〉－閩南民歌',
                     '〈西北雨直直落〉－閩南民歌', '〈天公落水〉－閩南民歌'], answer: 4 },
          { id: 17, prompt: '下列有關原住民族與其特色樂器的配對，何者錯誤？',
            options: ['太魯閣族－木杵', '布農族－弓琴', '賽夏族－臀鈴', '排灣族－鼻笛'], answer: 1 },
          { id: 18, prompt: '一群小朋友圍在一起討論『鑼鼓經』，請問哪一種說法不正確呢？',
            options: ['「看鑼鼓經這三個字就知道這都是打擊樂器使用的譜。」',
                     '「對阿~~~這些都是文場樂器會使用的記譜法。」',
                     '「我知道他們常用狀聲字來寫譜，不同的狀聲字代表不同的樂器唷~」',
                     '「聽你們這麼一說，我就想到我跟阿公去看廟會的布袋戲時都聽到這種音樂耶!」'], answer: 2 },
          { id: 19, prompt: '每個不同的地區都有屬於自己最獨特的音樂及樂器，請問下列地區與樂器的配對何者正確？',
            options: ['澳洲－風笛', '印度－對話鼓', '歐洲－手風琴', '峇厘島－烏克麗麗'], answer: 3 },
          { id: 20, prompt: '『爵士樂』是在二十世紀初發展出來獨特又迷人的音樂類型，請問下列有關『爵士樂』的敘述何者錯誤？',
            options: ['豐富的切分音節奏', '路易斯．阿姆斯壯奠定小號在爵士樂中的地位',
                     '多使用樂器即興合奏', '是從歐洲發展出來的樂種'], answer: 4 }
        ]
      }
    ]
  },

  '113-theory': {
    year: 113,
    title: '113 學年度 樂理及音樂基本常識',
    pdf: '113-theory-a.pdf',
    sections: [
      {
        title: '一、音程 20%（題組 1：加音）',
        instruction: '請在下列樂譜（G 大調）指定的音符上方加入一音，使其成為題目指定的音程。（每音 2 分，共 10 分）',
        image: 'images/questions/113-1a.png',
        type: 'reference-only',
        items: [
          { label: '(1) 增五度' },
          { label: '(2) 完全四度' },
          { label: '(3) 大二度' },
          { label: '(4) 小六度' },
          { label: '(5) 完全五度' }
        ],
        interactive: {
          mode: 'mark-points',
          hint: '請依序在 5 個指定音的「上方」點擊加入的音。',
          tolerance: 35
          // targets: [{ x, y }, ...]  ← 待標註 5 個正解音符位置
        }
      },
      {
        title: '一、音程 20%（題組 2：寫出度數）',
        instruction: '請寫出正確的音程度數。（每題 2 分，共 10 分）',
        image: 'images/questions/113-1b.png',
        type: 'inline-table',
        rowLabels: ['題號', '答案'],
        inputType: 'text',
        cellPrefix: '(',
        cellSuffix: ') 度',
        questions: [
          { id: 1, label: '(1)', answer: '小三' },
          { id: 2, label: '(2)', answer: '小六' },
          { id: 3, label: '(3)', answer: '倍增四' },
          { id: 4, label: '(4)', answer: '小二' },
          { id: 5, label: '(5)', answer: '增八' }
        ]
      },
      {
        title: '二、和弦 20%',
        instruction: '請寫出下列和弦的完全名稱，例如：（大三）和弦。（每題 2 分，共 20 分）',
        image: 'images/questions/113-2.png',
        type: 'inline-table',
        rowLabels: ['題號', '答案'],
        inputType: 'select',
        options: ['大三', '小三', '增三', '減三', '屬七'],
        cellSuffix: '和弦',
        questions: [
          { id: 1, label: '1', answer: 1 },
          { id: 2, label: '2', answer: 2 },
          { id: 3, label: '3', answer: 1 },
          { id: 4, label: '4', answer: 5 },
          { id: 5, label: '5', answer: 4 },
          { id: 6, label: '6', answer: 2 },
          { id: 7, label: '7', answer: 3 },
          { id: 8, label: '8', answer: 1 },
          { id: 9, label: '9', answer: 4 },
          { id: 10, label: '10', answer: 5 }
        ]
      },
      {
        title: '三、配合題 20%',
        instruction: '請從生平事蹟與代表作品欄中，各選出一項最適合的答案，將代號填入表格中。（每格 2 分，共 20 分）',
        type: 'matching-pair',
        composers: [
          { name: '小約翰史特勞斯', life: 'E', work: 'e' },
          { name: '德弗札克', life: 'B', work: 'b' },
          { name: '普羅高菲夫', life: 'C', work: 'd' },
          { name: '柴可夫斯基', life: 'D', work: 'a' },
          { name: '蕭邦', life: 'A', work: 'c' }
        ],
        lifeOptions: {
          A: '出生於波蘭的浪漫樂派作曲家，他的作品大多數為鋼琴曲，音樂中反映出高度的音樂、文學、民族融合的情感及思想價值。',
          B: '以熱愛祖國、立志發揚民族精神為名的捷克作曲家，在國際間享有盛名，多次受邀至歐美各地訪問。',
          C: '是俄國著名的作曲家，以迷人的旋律、強烈又複雜的節奏、大膽的和聲音響著稱。',
          D: '從小就展現音樂天分，因家人期待而學習法律，但始終沒有放棄對音樂的熱愛，而成為俄國重要的音樂家。',
          E: '出生於著名的音樂世家中，爸爸及兩個弟弟皆為作曲家，其中他是最有名望的，又被尊稱為「圓舞曲之王」。'
        },
        workOptions: {
          a: '芭蕾舞劇〈睡美人〉',
          b: '交響曲〈新世界〉、〈斯拉夫舞曲〉',
          c: '〈離別曲〉、〈鋼琴練習曲〉',
          d: '芭蕾舞劇〈羅密歐與茱麗葉〉、歌劇〈三橘之戀〉',
          e: '〈南國玫瑰圓舞曲〉'
        }
      },
      {
        title: '四、音階 20%',
        instruction: '完成表格中的關係大小調及調號。（每題 4 分，共 20 分）',
        type: 'matching-major-minor',
        rows: [
          { id: 1, label: '①', major: 'E 大調',  minor: '#c 小調', majorGiven: true,  minorGiven: false },
          { id: 2, label: '②', major: 'bC 大調', minor: 'ba 小調', majorGiven: false, minorGiven: true  },
          { id: 3, label: '③', major: 'F 大調',  minor: 'd 小調',  majorGiven: false, minorGiven: false },
          { id: 4, label: '④', major: 'B 大調',  minor: '#g 小調', majorGiven: false, minorGiven: true  },
          { id: 5, label: '⑤', major: '#F 大調', minor: '#d 小調', majorGiven: true,  minorGiven: false }
        ],
        keySignatureImage: 'images/questions/113-4-keysig.png'
      },
      {
        title: '五、音樂常識 20%',
        instruction: '（每題 2 分，共 20 分）',
        type: 'choice',
        questions: [
          { id: 1, prompt: '小雯在電視上看到有表演者拿著撥弦樂器，這個樂器通常有四條弦，音色清脆明亮，是夏威夷傳統樂器。請問小雯看到的樂器可能是下列哪一項樂器？',
            options: ['小提琴', '烏克麗麗', '吉他', '大提琴'], answer: 2 },
          { id: 2, prompt: '徵才啟事：「本教室徵求一名國樂教師，需具有耐心及愛心，並且要會演奏中國傳統拉弦樂器，具有教學經驗者尤佳。」依據上述徵才內容，請問音樂教室是要徵下列哪項樂器的老師？',
            options: ['梆笛', '二胡', '笙', '古箏'], answer: 2 },
          { id: 3, prompt: '下列四個音樂術語中屬於速度術語的有幾個呢？rit. / Maestoso / Pianissimo / Rubato.',
            options: ['一個', '兩個', '三個', '四個'], answer: 2 },
          { id: 4, prompt: '臺灣民謠指的是生活在臺灣的各族群，將其日常生活經驗使用母語並經由代代口授相傳或集體創作等方式產生符合臺灣本土文化的歌謠，請問下列何首歌謠屬於客家民謠？',
            options: ['〈桃花開〉', '〈美麗的稻穗〉', '〈搖嬰仔歌〉', '〈天黑黑〉'], answer: 1 },
          { id: 5, prompt: '請問下列何者為移調樂器？',
            options: ['長笛', '雙簧管', '單簧管', '低音管'], answer: 3 },
          { id: 6, prompt: '歌仔戲和京劇的基本表演架構是以唱、唸、做、打為表演核心，但音樂的風格與唱腔則截然不同，請問下列敘述何者正確？',
            options: ['歌仔戲的曲調主要是西皮唱腔和二黃唱腔', '二黃唱腔多為激昂慷慨或表現輕鬆愉悅、活潑的情感',
                     '西皮唱腔則多沈鬱哀傷或莊嚴肅穆', '歌仔戲最具代表性的唱腔是七字調'], answer: 4 },
          { id: 7, prompt: '聞名世界的民謠，歌詞內容描述拿波里港灣美景，也是當地船夫喜歡吟唱的歌曲。請問上述描述的是下列哪一首歌曲？',
            options: ['《散塔盧其亞》', '《蘇格蘭勇士》', '《小星星》', '《鳳陽花鼓》'], answer: 1 },
          { id: 8, prompt: '世界音樂因受地理環境與文化的影響，使得每一民族各有其特色，其中相當受歡迎的爵士音樂，起源自那個國家？',
            options: ['英國', '美國', '德國', '法國'], answer: 2 },
          { id: 9, prompt: '今年適逢歌劇作曲家普契尼逝世 100 週年，下列何者作品並非普契尼所做？',
            options: ['《卡門》', '《杜蘭朵公主》', '《蝴蝶夫人》', '《托斯卡》'], answer: 1 },
          { id: 10, prompt: '蘋果 | 鳳梨 | 橘子 | 蓮霧 ||，如果以上曲調想要演奏成：蘋果－鳳梨－橘子－蘋果－鳳梨－蓮霧，請問要加入那些反覆記號呢？',
            optionsHtml: [
              '在橘子後面加上 <img class="symbol-inline" src="images/questions/113-5q10-s1.png">',
              '在橘子跟蓮霧中間加入 <img class="symbol-inline" src="images/questions/113-5q10-s2a.png">，在蓮霧後加入 <img class="symbol-inline" src="images/questions/113-5q10-s2b.png">',
              '在橘子跟蓮霧中間加入 <img class="symbol-inline" src="images/questions/113-5q10-s3a.png">，在蘋果加上 <img class="symbol-inline" src="images/questions/113-5q10-s3b.png">，在蓮霧後加上 <img class="symbol-inline" src="images/questions/113-5q10-s3c.png">',
              '在橘子上面加上 <img class="symbol-inline" src="images/questions/113-5q10-s4a.png">，在橘子跟蓮霧中間加入 <img class="symbol-inline" src="images/questions/113-5q10-s4b.png">，在蓮霧上面加上 <img class="symbol-inline" src="images/questions/113-5q10-s4c.png">'
            ], answer: 4 }
        ]
      }
    ]
  },

  '114-theory': {
    year: 114,
    title: '114 學年度 樂理及音樂基本常識',
    pdf: '114-theory-a.pdf',
    sections: [
      {
        title: '一、題組 20%',
        instruction: '請寫出下列各音正確的間線名稱（例：第一線）及音名（例：C）。（每格 2 分，共 20 分）',
        type: 'note-line-pair',
        questions: [
          { id: 1, name: 'F', line: '第四線',   image: 'images/questions/114-1q1.png' },
          { id: 2, name: 'A', line: '上加一間', image: 'images/questions/114-1q2.png' },
          { id: 3, name: 'D', line: '下加一間', image: 'images/questions/114-1q3.png' },
          { id: 4, name: 'F', line: '上加三間', image: 'images/questions/114-1q4.png' },
          { id: 5, name: 'C', line: '下加一線', image: 'images/questions/114-1q5.png' }
        ]
      },
      {
        title: '二、和弦 20%',
        instruction: '請寫出下列和弦的完全名稱，例如：（大三）和弦。（每題 2 分，共 20 分）',
        image: 'images/questions/114-2.png',
        type: 'inline-table',
        rowLabels: ['題號', '答案'],
        inputType: 'select',
        options: ['大三', '小三', '增三', '減三', '屬七'],
        cellSuffix: '和弦',
        questions: [
          { id: 1, label: '1', answer: 1 },
          { id: 2, label: '2', answer: 4 },
          { id: 3, label: '3', answer: 5 },
          { id: 4, label: '4', answer: 2 },
          { id: 5, label: '5', answer: 3 },
          { id: 6, label: '6', answer: 2 },
          { id: 7, label: '7', answer: 5 },
          { id: 8, label: '8', answer: 1 },
          { id: 9, label: '9', answer: 4 },
          { id: 10, label: '10', answer: 2 }
        ]
      },
      {
        title: '三、畫出小節線及終止線 10%',
        instruction: '請依照指定的拍號，畫上小節線及終止線。（每答 2 分，共 10 分）',
        image: 'images/questions/114-3.png',
        type: 'reference-only',
        interactive: {
          mode: 'mark-vertical-lines',
          hint: '請點擊譜例位置畫小節線及終止線。',
          tolerance: 40
          // targets: [{ x: ... }, ...]  ← 待標註正解 X 座標
        }
      },
      {
        title: '四、配合題 10%',
        instruction: '中國歷代宮廷的典禮、祭祀或民俗慶典，皆可見到傳統樂器的演奏。下列中國傳統樂器依據演奏方式分別屬於哪種類型，請將分類代號填入括弧中。A：拉弦樂器　B：彈撥樂器　C：吹管樂器　D：擊樂器（每格 2 分，共 10 分）',
        type: 'inline-table',
        rowLabels: ['樂器', '分類代號'],
        inputType: 'select',
        options: ['A 拉弦樂器', 'B 彈撥樂器', 'C 吹管樂器', 'D 擊樂器'],
        questions: [
          { id: 1, label: '月琴',   answer: 2 },
          { id: 2, label: '二胡',   answer: 1 },
          { id: 3, label: '單皮鼓', answer: 4 },
          { id: 4, label: '笙',     answer: 3 },
          { id: 5, label: '三弦',   answer: 2 }
        ]
      },
      {
        title: '五、音樂常識 40%',
        instruction: '（每題 2 分，共 40 分）',
        type: 'choice',
        questions: [
          { id: 1, prompt: '阿吉：「昨晚的音樂會很好聽耶，其中有個樂器音色柔美渾厚，有著捲曲的管身和亮麗的外型，令人印象深刻。」阿奇：「那段音樂我有印象，我記得導聆老師說那是大野狼的主題，既神秘又恐怖，連我都跟著音樂緊張起來。」根據上述對話，阿吉和阿奇他們看到的樂器和聽到的音樂可能是下列那個樂器和樂曲？',
            options: ['法國號／《彼得與狼》', '單簧管／《彼得與狼》',
                     '法國號／《動物狂歡節》', '雙簧管／《動物狂歡節》'], answer: 1 },
          { id: 2, prompt: '超慢跑運動近年來蔚為風潮。醫生建議超慢跑的速度為每秒鐘三步，若使用節拍器輔助，踏一步則節拍器敲一下的話，應依照下列那個選項設定呢？',
            options: ['♩=30', '♩=60', '♩=120', '♩=180'], answer: 4 },
          { id: 3, prompt: '下列有關圓滑線和連結線的敘述何者正確？',
            image: 'images/questions/114-5q3.png',
            options: ['此圖為連結線', '連結線是連結著不同音高的音，並將其圓順的演奏出來',
                     '以上皆是', '以上皆非'], answer: 4 },
          { id: 4, prompt: '台灣的原住民族種類眾多且文化豐富，常利用天然的素材來製作各類的樂器，請問下列族群與樂器的配對何者錯誤？',
            options: ['邵族－木杵', '排灣族－旮亙', '太魯閣族－木琴(tatuk)', '布農族－弓琴'], answer: 2 },
          { id: 5, prompt: '小名在藝文中心的外面看見一張海報引起他的興趣，上面斗大的標題寫著「銅心未泯－銅管五重奏音樂會」，請問下列有幾種樂器不會出現在這場音樂會上呢？①Trumpet ②Bassoon ③Saxophone ④Tuba ⑤Flute',
            options: ['1 種', '2 種', '3 種', '4 種'], answer: 3 },
          { id: 6, prompt: '下列何者為「半音」？',
            options: ['Sol-La', 'Mi-升 Fa', '升 Si-升 Do', '降 Re-Mi'], answer: 3 },
          { id: 7, prompt: '音樂劇是一種綜合了音樂、舞蹈、歌唱、戲劇等多項元素的表演藝術，而臺灣著名的音樂劇《四月望雨》劇情是描述下列哪一位音樂家的一生，引領觀眾回到早年繁華的大稻埕？',
            options: ['鄧雨賢', '馬水龍', '蕭泰然', '江文也'], answer: 1 },
          { id: 8, prompt: '請問右圖譜例方框中所組成的音程為下列那個音程？',
            image: 'images/questions/114-5q8.png',
            options: ['大七度', '小七度', '增七度', '減七度'], answer: 2 },
          { id: 9, prompt: '出生於奧地利，喜歡文學與詩歌，經常以著名的詩作為歌詞寫成藝術歌曲，著名作品有〈野玫瑰〉、〈鱒魚〉等。根據上述內容描述所指的是下列那一位音樂家？',
            options: ['貝多芬', '孟德爾頌', '舒伯特', '莫札特'], answer: 3 },
          { id: 10, prompt: '全音和半音的排列順序為：全音、全音、半音、全音、全音、全音、半音，上述排列順序為下列哪一個音階？',
            options: ['大調音階', '小調音階', '全音階', '五聲音階'], answer: 1 },
          { id: 11, prompt: '下列哪一首樂曲並非弱起拍的曲子？',
            options: ['〈生日快樂歌〉', '〈國歌〉', '〈鱒魚〉', '〈小星星〉'], answer: 4 },
          { id: 12, prompt: '古典音樂發展至今已出現許多著名的音樂家，其中三位名字皆是字母 B 開頭的德國音樂家被尊稱為德國 3B，請問下列哪個音樂家並非德國 3B 之音樂家？',
            options: ['巴哈', '貝多芬', '布拉姆斯', '白遼士'], answer: 4 },
          { id: 13, prompt: '鍵盤樂器的一種，其音域寬廣、表現力豐富，可以獨奏也可以伴奏，還可以和各種樂器一起合奏，被稱為「樂器之王」的是下列哪一種樂器？',
            options: ['小提琴', '鋼琴', '大提琴', '口風琴'], answer: 2 },
          { id: 14, prompt: '美國作曲家及指揮家蘇沙以「進行曲之王」著稱，他的作品以雄壯的軍樂為主。請問下列那首樂曲是蘇沙的作品？',
            options: ['〈永遠的星條旗〉', '〈藍色多瑙河〉', '〈軍隊進行曲〉', '〈拉德斯基進行曲〉'], answer: 1 },
          { id: 15, prompt: '出生於英國農村，美麗的田園景色帶給他豐富的創作靈感，著名作品有〈愛的禮讚〉、〈威風凜凜進行曲〉等。請問上述內容描述的是下列哪一位音樂家？',
            options: ['貝多芬', '艾爾加', '孟德爾頌', '德弗札克'], answer: 2 },
          { id: 16, prompt: '下列哪個音樂術語與速度有關？',
            options: ['D.C.', 'mp', 'cresc.', 'Allegro'], answer: 4 },
          { id: 17, prompt: '請問右圖譜列方框中應填入下列何者休止符？',
            image: 'images/questions/114-5q17.png',
            options: ['二分休止符', '四分休止符', '八分休止符', '十六分休止符'], answer: 3 },
          { id: 18, prompt: '民歌不僅是歌曲的傳唱，更是人類社會及生活中思想情感的表達。下列民歌與語系配對何者有誤？',
            options: ['〈西北雨〉－閩南語系', '〈天公落水〉－閩南語系',
                     '〈美麗的稻穗〉－原住民語系', '〈桃花開〉－客家語系'], answer: 2 },
          { id: 19, prompt: '下圖為莫札特〈小星星變奏曲〉變奏二之譜例，根據樂譜呈現，此曲調性為何？',
            image: 'images/questions/114-5q19.png',
            options: ['Ｃ大調', 'Ｆ大調', 'Ｇ大調', 'Ａ大調'], answer: 1 },
          { id: 20, prompt: '根據上圖，此曲適合用下列那個樂器來演奏？',
            image: 'images/questions/114-5q19.png',
            options: ['長笛', '小提琴', '鋼琴', '二胡'], answer: 3 }
        ]
      }
    ]
  }
};
