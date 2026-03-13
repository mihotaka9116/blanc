/**
 * Blanc's Recipe - Main Script (Full Messages & CSS Sync)
 */

// 1. 商品データ
const products = [
    { id: '1', no: '01', name: '夜空の星屑クッキー', price: 1200, icon: 'star', time: '45min', story: '夜空からこぼれ落ちた星の欠片。', desc: 'バターの香りが広がるサクサククッキー。', allergy: '小麦・卵・乳成分' },
    { id: '2', no: '02', name: '木漏れ日のシフォン', price: 2800, icon: 'chef-hat', time: '60min', story: '森の精霊たちのダンス。', desc: '驚くほどふわふわな食感です。', allergy: '卵・小麦・乳成分' },
    { id: '3', no: '03', name: 'あなぐまの切り株ロール', price: 2500, icon: 'disc', time: '90min', story: 'あなぐまくんが選んだ特別な切り株。', desc: 'ビターなココアとクリームの相性抜群。', allergy: '小麦・卵・乳成分・大豆' },
    { id: '4', no: '04', name: '秘密の鍵穴ドーナツ', price: 450, icon: 'key', time: '30min', story: '明日のお天気がわかる魔法。', desc: '素朴で優しい甘さのドーナツ。', allergy: '小麦・卵・乳成分' },
    { id: '5', no: '05', name: '風の丘のクロワッサン', price: 380, icon: 'wind', time: '120min', story: 'そよ風が重ねた生地。', desc: '発酵バターの香りがたまらない。', allergy: '小麦・乳成分・卵' },
    { id: '6', no: '06', name: 'ブランの特製マドレーヌ', price: 400, icon: 'rabbit', time: '40min', story: '店主一番のお気に入り。', desc: '花の蜜を閉じ込めたしっとり食感。', allergy: '卵・小麦・乳成分' }
];

let cartItems = [];

// 2. ブランのメッセージ（全8種類を復活！）
const messages = [
    "霧の朝だね。今日はハチミツを多めに練り込んだよ。",
    "星が綺麗な夜には、少ししょっぱいクッキーが合うよ。",
    "あなぐまくんが遊びに来たよ。一緒にロールケーキを食べよう。",
    "お疲れさま。自分をたっぷり甘やかすことも大切だよ。",
    "窓の外を見て。霧の向こうに、新しいレシピが隠れているかも。",
    "焼きたてのマドレーヌがあるよ。あなぐまくんが狙ってるみたい。",
    "今日はしっとりした風が吹いているね。シフォンケーキがよく膨らむよ。",
    "あなぐまくんが持ってきた木の実、隠し味に使ってみようかな。"
];

// --- 初期化 ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateMessage();
    setupEventListeners();
    if (typeof lucide !== 'undefined') lucide.createIcons();
});

// --- 関数 ---

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    grid.innerHTML = products.map(p => `
        <div class="group bg-white rounded-[2.5rem] p-8 shadow-lg text-center cursor-pointer transition-all flex flex-col items-center" onclick="openModal('${p.id}')">
            <div class="text-[10px] font-bold text-[#FFD1DC] mb-4 tracking-widest uppercase italic">Recipe ${p.no}</div>
            <div class="icon-animate-wrap">
                <i data-lucide="${p.icon}" class="text-[#FF8DA1]"></i>
            </div>
            <h4 class="text-xl font-bold text-gray-700 mb-2">${p.name}</h4>
            <p class="text-xs italic text-gray-400 mb-6">"${p.story}"</p>
            <div class="w-full pt-4 border-t border-dashed border-[#B0E0E6]/30 flex justify-between items-center">
                <span class="text-xl font-display text-[#5F9EA0]">¥${p.price.toLocaleString()}</span>
                <div class="w-10 h-10 bg-[#B0E0E6] rounded-xl flex items-center justify-center text-white">
                    <i data-lucide="plus" size="18"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function updateMessage() {
    const el = document.getElementById("blanc-message");
    const icon = document.getElementById("anaguma-icon");
    if (!el) return;

    const msg = messages[Math.floor(Math.random() * messages.length)];
    el.innerText = msg;

    if (icon) {
        if (msg.includes("あなぐまくん")) {
            icon.style.opacity = "1";
            icon.style.bottom = "30px";
            icon.style.pointerEvents = "auto";
            icon.classList.add('anaguma-happy'); // CSSのジャンプアニメ
        } else {
            icon.style.opacity = "0";
            icon.style.bottom = "-160px";
            icon.style.pointerEvents = "none";
            icon.classList.remove('anaguma-happy');
        }
    }
}

function openModal(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;

    document.getElementById('modal-info').innerText = `No.${p.no} | ${p.time}`;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-price').innerText = `¥${p.price.toLocaleString()}`;
    document.getElementById('modal-story').innerText = `「${p.story}」`;
    document.getElementById('modal-description').innerText = p.desc;
    document.getElementById('modal-allergy').innerText = `特定原材料等：${p.allergy}`;
    
    document.getElementById('modal-icon').innerHTML = `<div class="icon-animate-modal"><i data-lucide="${p.icon}" stroke-width="1"></i></div>`;
    
    document.getElementById('add-to-cart-btn').onclick = () => addToCart(p);
    document.getElementById('modal').classList.remove('hidden');
    lucide.createIcons();
}

function setupEventListeners() {
    document.getElementById('menu-open').onclick = () => document.getElementById('mobile-menu').classList.remove('translate-x-full');
    document.getElementById('menu-close').onclick = () => document.getElementById('mobile-menu').classList.add('translate-x-full');
    document.querySelectorAll('.cart-trigger').forEach(btn => btn.onclick = () => document.getElementById('cart-modal').classList.remove('hidden'));
    document.getElementById('cart-close').onclick = () => document.getElementById('cart-modal').classList.add('hidden');
    document.getElementById('cart-overlay').onclick = () => document.getElementById('cart-modal').classList.add('hidden');
    document.getElementById('modal-overlay').onclick = () => document.getElementById('modal').classList.add('hidden');
    document.getElementById('modal-close').onclick = () => document.getElementById('modal').classList.add('hidden');
}

function addToCart(p) {
    cartItems.push(p);
    updateCartUI();
    document.getElementById('modal').classList.add('hidden');
    showToast(`${p.name}をカートに入れたよ！`);
}

function updateCartUI() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const list = document.getElementById('cart-items-list');
    const counts = [document.getElementById('cart-count'), document.getElementById('cart-count-mobile')];
    
    counts.forEach(c => { if(c) { c.innerText = cartItems.length; c.classList.toggle('hidden', cartItems.length === 0); } });
    
    if (list) {
        list.innerHTML = cartItems.length === 0 
            ? '<p class="text-center py-4 text-gray-400 italic">カートは空っぽだよ。</p>'
            : cartItems.map((item, i) => `
                <div class="flex justify-between items-center py-3 border-b border-dashed border-[#B0E0E6]/30">
                    <div>
                        <p class="text-sm font-bold text-gray-700">${item.name}</p>
                        <p class="text-xs text-[#5F9EA0]">¥${item.price.toLocaleString()}</p>
                    </div>
                    <button onclick="removeFromCart(${i})" class="p-2 text-gray-300 hover:text-[#FF8DA1]"><i data-lucide="trash-2" size="18"></i></button>
                </div>`).join('');
    }
    document.getElementById('total-price').innerText = `¥${total.toLocaleString()}`;
    lucide.createIcons();
}

function removeFromCart(index) { cartItems.splice(index, 1); updateCartUI(); }

function showToast(msg) {
    const toast = document.getElementById('order-success');
    if(!toast) return;
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

function checkout() {
    if (cartItems.length === 0) return;
    cartItems = [];
    updateCartUI();
    document.getElementById('cart-modal').classList.add('hidden');
    showToast("注文を預かったよ！ブランが準備を始めるね。");
}
