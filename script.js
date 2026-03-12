// --- 1. 商品データ (products) はそのまま維持 ---
const products = [
    // ...（省略：既存のproducts配列を入れてください）
];

let cartItems = [];

// --- 2. メッセージリスト ---
const messages = [
  "霧の朝だね。今日はハチミツを多めに練り込んだよ。",
  "風が強い日は、クロワッサンの層が綺麗に焼けるんだ。",
  "星が綺麗な夜には、少ししょっぱいクッキーが合うよ。",
  "見つけてくれてありがとう。ゆっくりしていってね。",
  "おはよう。今朝の霧はミルクの香りがするね。シフォンがふわふわに焼けたよ。",
  "窓の外は真っ白。こんな日は、温かい紅茶とマドレーヌで心に灯をともそう。",
  "お疲れさま。今日の最後の一仕事は、自分をたっぷり甘やかすことだよ。",
  "あなぐまくんが遊びに来たよ。彼が見つけてくれた特別な切り株で、今日はロールケーキを巻いたんだ。",
  "あなぐまくんが持ってきた木の実、少しだけクッキーに混ぜてみたよ。森の香りがするはずさ。",
  "あなぐまくんとお茶をしていたら、ついつい話し込んじゃった。お菓子が焦げなくてよかったよ。"
];

// --- 3. メッセージとあなぐまくんの制御関数 ---
function updateMessage() {
  const messageElement = document.getElementById("blanc-message");
  const anagumaIcon = document.getElementById("anaguma-icon");

  if (!messageElement || !anagumaIcon) return;

  // メッセージをランダムに選ぶ
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  messageElement.innerText = randomMessage;

  // あなぐまくんが含まれる場合
  if (randomMessage.includes("あなぐまくん")) {
    anagumaIcon.style.display = "block";
    // 少し遅らせてクラスを付与することで、ふわっと上がるアニメーションを効かせる
    setTimeout(() => {
      anagumaIcon.classList.add("show");
    }, 100);
  } else {
    // 含まれない場合はクラスを外して隠す
    anagumaIcon.classList.remove("show");
    // アニメーション(CSSのtransition)が終わるのを待ってから非表示にする
    setTimeout(() => {
      if (!anagumaIcon.classList.contains("show")) {
        anagumaIcon.style.display = "none";
      }
    }, 800); // CSSのtransition時間(0.8s)に合わせる
  }
}

// --- 4. ページ読み込み時の処理 ---
document.addEventListener('DOMContentLoaded', () => {
    // 商品一覧を表示
    renderProducts();
    
    // ブランのメッセージを初回表示
    updateMessage();
    
    // --- 既存のイベントリスナー群 ---
    const menu = document.getElementById('mobile-menu');
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');

    if(menuOpen) menuOpen.onclick = () => menu.classList.add('active');
    if(menuClose) menuClose.onclick = () => menu.classList.remove('active');
    
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.onclick = () => menu.classList.remove('active');
    });

    document.querySelectorAll('.cart-trigger').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            if(cartItems.length > 0) document.getElementById('cart-modal').classList.remove('hidden');
            else showToast("カートは空っぽだよ！");
        };
    });

    // モーダル・カートの閉じる処理
    const cartClose = document.getElementById('cart-close');
    const cartOverlay = document.getElementById('cart-overlay');
    if(cartClose) cartClose.onclick = () => document.getElementById('cart-modal').classList.add('hidden');
    if(cartOverlay) cartOverlay.onclick = () => document.getElementById('cart-modal').classList.add('hidden');

    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    if(modalClose) modalClose.onclick = closeModal;
    if(modalOverlay) modalOverlay.onclick = closeModal;
});

// --- 5. 既存の関数群 (renderProducts, openModal, etc.) ---
// ...（省略せずに、以前のコードをそのまま続けて記述してください）
