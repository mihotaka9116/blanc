// --- 1. 商品データ ---
const products = [
    { id: '1', no: '01', name: '夜空の星屑クッキー', price: 1200, icon: 'star', difficulty: '★★★', time: '45min', story: '夜空からこぼれ落ちた星の欠片を拾い集めて焼いた、少ししょっぱいバタークッキー。', desc: '北海道産バターを贅沢に使用し、生地を何度も寝かせてサクサクの食感を実現しました。' },
    { id: '2', no: '02', name: '木漏れ日のシフォン', price: 2800, icon: 'chef-hat', difficulty: '★★☆', time: '60min', story: '森の精霊たちがダンスをする午後のひととき。', desc: '驚くほどふわふわで、弾力があります。' },
    { id: '3', no: '03', name: 'あなぐまの切り株ロール', price: 2500, icon: 'disc', difficulty: '★★★', time: '90min', story: '森のあなぐまさんが見つけた特別な切り株をイメージ。', desc: 'ビターなココアを練り込んだしっとりとしたスポンジ。' },
    { id: '4', no: '04', name: '秘密の鍵穴ドーナツ', price: 450, icon: 'key', difficulty: '★☆☆', time: '30min', story: 'この穴から世界をのぞくと、明日のお天気がわかる魔法。', desc: 'じっくりと時間をかけて揚げた、昔ながらの素朴なドーナツ。' },
    { id: '5', no: '05', name: '風の丘のクロワッサン', price: 380, icon: 'wind', difficulty: '★★★', time: '120min', story: '丘の上で吹くそよ風が、生地を何層にも重ねてくれた。', desc: '発酵バターを幾層にも折り込み、丁寧に焼き上げました。' },
    { id: '6', no: '06', name: 'ブランの特製マドレーヌ', price: 400, icon: 'rabbit', difficulty: '★☆☆', time: '40min', story: '店主のブランが一番得意な、貝殻の形の焼き菓子。', desc: 'しっとりと焼き上げた生地に、花の蜜をたっぷり閉じ込めました。' }
];

let cartItems = [];

const messages = [
    "霧の朝だね。今日はハチミツを多めに練り込んだよ。",
    "風が強い日は、クロワッサンの層が綺麗に焼けるんだ。",
    "星が綺麗な夜には、少ししょっぱいクッキーが合うよ。",
    "見つけてくれてありがとう。ゆっくりしていってね。",
    "あなぐまくんが遊びに来たよ。一緒にロールケーキを食べよう。"
];

// --- 2. メッセージ更新（あなぐまくん制御付き） ---
function updateMessage() {
    const el = document.getElementById("blanc-message");
    const icon = document.getElementById("anaguma-icon");
    if (!el) return;

    const msg = messages[Math.floor(Math.random() * messages.length)];
    el.innerText = msg;

    if (icon) {
        if (msg.includes("あなぐまくん")) {
            icon.style.display = "block";
            // transitionを効かせるため少し遅らせる
            setTimeout(() => icon.classList.add("show"), 50);
        } else {
            icon.classList.remove("show");
            setTimeout(() => { 
                if(!icon.classList.contains('show')) icon.style.display = "none"; 
            }, 800);
        }
    }
}

// --- 3. 商品描画（点線の丸を復活！） ---
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    products.forEach(p => {
        const card = document.createElement('div');
        // カード全体のデザイン
        card.className = "recipe-card rounded-[2.5rem] p-8 shadow-lg text-center cursor-pointer transition-all duration-300 hover:shadow-2xl group flex flex-col items-center relative bg-white";
        card.onclick = () => openModal(p);
        
        card.innerHTML = `
            <div class="recipe-tag bg-[#FFD1DC] text-white px-4 py-1 rounded-full text-xs mb-6 font-bold tracking-widest">RECIPE ${p.no}</div>
            
            <div class="w-20 h-20 rounded-full border-2 border-dashed border-[#FFD1DC] flex items-center justify-center mb-6 bg-[#FFF0F3]/30 group-hover:scale-110 transition-transform">
                <div class="text-[#FF8DA1]">
                    <i data-lucide="${p.icon}" size="40" stroke-width="1.5"></i>
                </div>
            </div>
            
            <div class="flex-grow w-full text-gray-600 flex flex-col">
                <div class="text-[10px] font-bold text-[#5F9EA0] mb-3 uppercase tracking-widest">${p.difficulty} | ${p.time}</div>
                <h4 class="text-xl md:text-2xl font-bold mb-3 group-hover:text-[#FF8DA1] transition-colors">${p.name}</h4>
                <p class="text-xs italic mb-8 line-clamp-2 leading-relaxed">"${p.story}"</p>
                <div class="flex justify-between items-center mt-auto pt-5 border-t border-dashed border-[#FFD1DC]">
                    <span class="text-2xl md:text-3xl font-display text-[#5F9EA0]">¥${p.price.toLocaleString()}</span>
                    <div class="w-10 h-10 bg-[#FFD1DC] rounded-xl flex items-center justify-center text-white group-hover:bg-[#FF8DA1] transition-colors shadow-md">
                        <i data-lucide="plus" size="20"></i>
                    </div>
                </div>
            </div>`;
        grid.appendChild(card);
    });
    // Lucideアイコンの再描画
    if (window.lucide) lucide.createIcons();
}

// --- 4. モーダル関連 ---
function openModal(p) {
    const ids = ['modal-info', 'modal-title', 'modal-price', 'modal-story', 'modal-description', 'modal-icon'];
    if (ids.some(id => !document.getElementById(id))) return;

    document.getElementById('modal-info').innerText = `Recipe No.${p.no} | ${p.difficulty} | ${p.time}`;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-price').innerText = `¥${p.price.toLocaleString()}`;
    document.getElementById('modal-story').innerText = `「${p.story}」`;
    document.getElementById('modal-description').innerText = p.desc;
    document.getElementById('modal-icon').innerHTML = `<i data-lucide="${p.icon}" size="80"></i>`;
    document.getElementById('add-to-cart-btn').onclick = (e) => {
        e.stopPropagation();
        addToCart(p);
    };
    document.getElementById('modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
}

function closeModal() {
    const m = document.getElementById('modal');
    if (m) m.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function addToCart(p) {
    cartItems.push(p);
    updateCartUI();
    closeModal();
    showToast(`${p.name}をカートに届けたよ！`);
}

function updateCartUI() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const countD = document.getElementById('cart-count');
    const countM = document.getElementById('cart-count-mobile');
    const list = document.getElementById('cart-items-list');
    const priceEl = document.getElementById('total-price');
    
    if (countD) { countD.classList.toggle('hidden', cartItems.length === 0); countD.innerText = cartItems.length; }
    if (countM) { countM.classList.toggle('hidden', cartItems.length === 0); countM.innerText = cartItems.length; }
    if (list) list.innerHTML = cartItems.map(item => `<div class="flex justify-between py-2 border-b border-gray-100 italic"><span>${item.name}</span><span>¥${item.price.toLocaleString()}</span></div>`).join('');
    if (priceEl) priceEl.innerText = `¥${total.toLocaleString()}`;
}

function showToast(msg) {
    const toast = document.getElementById('order-success');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// --- 5. メイン初期化 ---
document.addEventListener('DOMContentLoaded', () => {
    // 描画と初期化
    renderProducts();
    updateMessage();
    if (window.luc
