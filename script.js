// --- 7. 初期化 ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateMessage();

    const ana = document.getElementById('anaguma-icon');
    if (ana) {
        ana.onclick = () => {
            updateMessage();
            ana.style.transform = "scale(1.1) translateY(-10px)";
            setTimeout(() => { ana.style.transform = "scale(1) translateY(0)"; }, 200);
        };
    }

    // --- メニュー開閉の基本動作 ---
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenBtn = document.getElementById('menu-open');
    const menuCloseBtn = document.getElementById('menu-close');

    if (menuOpenBtn) {
        menuOpenBtn.onclick = () => mobileMenu.classList.remove('translate-x-full');
    }
    if (menuCloseBtn) {
        menuCloseBtn.onclick = () => mobileMenu.classList.add('translate-x-full');
    }

    // --- 【追加】スマホメニュー内のリンクをクリックした時にメニューを閉じる ---
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.onclick = () => {
            mobileMenu.classList.add('translate-x-full');
        };
    });

    // カート・モーダルの制御（既存のまま）
    document.querySelectorAll('.cart-trigger').forEach(b => b.onclick = () => document.getElementById('cart-modal').classList.remove('hidden'));
    document.getElementById('cart-close').onclick = () => document.getElementById('cart-modal').classList.add('hidden');
    document.getElementById('cart-overlay').onclick = () => document.getElementById('cart-modal').classList.add('hidden');
    document.getElementById('modal-overlay').onclick = () => document.getElementById('modal').classList.add('hidden');
    document.getElementById('modal-close').onclick = () => document.getElementById('modal').classList.add('hidden');
});
