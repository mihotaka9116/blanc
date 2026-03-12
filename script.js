// ... (products配列やrenderProducts関数などはそのまま)

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
    anagumaIcon.classList.remove("show");
    // アニメーションが終わるのを待ってから非表示にする
    setTimeout(() => {
      if (!anagumaIcon.classList.contains("show")) {
        anagumaIcon.style.display = "none";
      }
    }, 500);
  }
}

// 既存の window.onload を整理して統合
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateMessage(); // 初回メッセージ表示
    
    // --- 既存のイベントリスナー群 ---
    const menu = document.getElementById('mobile-menu');
    document.getElementById('menu-open').onclick = () => menu.classList.add('active');
    document.getElementById('menu-close').onclick = () => menu.classList.remove('active');
    document.querySelectorAll('.mobile-link').forEach(link => link.onclick = () => menu.classList.remove('active'));
    document.querySelectorAll('.cart-trigger').forEach(btn => btn.onclick = (e) => {
        e.preventDefault();
        if(cartItems.length > 0) document.getElementById('cart-modal').classList.remove('hidden');
        else showToast("カートは空っぽだよ！");
    });
    document.getElementById('cart-close').onclick = () => document.getElementById('cart-modal').classList.add('hidden');
    document.getElementById('cart-overlay').onclick = () => document.getElementById('cart-modal').classList.add('hidden');
    document.getElementById('modal-close').onclick = closeModal;
    document.getElementById('modal-overlay').onclick = closeModal;
});
