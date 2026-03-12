const products = [
    { id: '1', name: '夜空の星屑クッキー', price: 1200, icon: 'star', story: '夜空からこぼれ落ちた星の欠片を拾い集めて焼いた、少ししょっぱいバタークッキー。', description: '岩手県産の濃厚なバターを贅沢に使用。サクサクの食感に隠れた塩気が、甘さを上品に引き立てます。' },
    { id: '2', name: '木漏れ日のシフォン', price: 2800, icon: 'cake-slice', story: '森の精霊たちがダンスをする午後のひととき。その柔らかい光を閉じ込めました。', description: '驚くほどふわふわで軽い口当たり。卵の優しい風味が広がる、当店一番人気のシフォンケーキです。' },
    { id: '3', name: 'あなぐまさんの切り株ロール', price: 2500, icon: 'disc', story: '森のあなぐまさんが見つけた特別な切り株をイメージした、しっとりココア生地。', description: 'ビターなココア生地で、たっぷりの生クリームを巻き込みました。切り株のような見た目も楽しい一品。' },
    { id: '4', name: '秘密の鍵穴ドーナツ', price: 450, icon: 'circle-dot', story: 'この穴から世界をのぞくと、明日のお天気がわかるという魔法がかかっています。', description: 'じっくり揚げた昔ながらの素朴なドーナツ。お砂糖の結晶がキラキラと魔法のように輝きます。' },
    { id: '5', name: '風の丘のクロワッサン', price: 380, icon: 'croissant', story: '丘の上で吹くそよ風が、生地を何層にも重ねてくれたような軽やかな層が自慢。', description: '外はパリッと、中はもっちり。発酵バターの香りが、食べるたびに鼻を抜けていきます。' },
    { id: '6', name: 'ブランの特製マドレーヌ', price: 400, icon: 'rabbit', story: '隠し味にハチミツを。店主のブランが一番得意な、貝殻の形の焼き菓子です。', description: 'しっとりとした質感と、口いっぱいに広がるハチミツの香り。お茶会の主役にぴったりな、優しさが詰まった逸品。' }
];

let cartItems = [];

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-[3rem] p-8 shadow-lg text-center cursor-pointer transition-all duration-500 hover:-translate-y-6 hover:shadow-2xl group relative overflow-hidden flex flex-col items-center border border-[#FFD1DC]/20";
        
        card.innerHTML = `
            <div class="w-32 h-32 rounded-full border-4 border-dashed border-[#B0E0E6]/50 flex items-center justify-center mb-6 text-[#FF8DA1] transition-colors group-hover:bg-[#FFD1DC]/10 icon-animate relative shrink-0">
                <i data-lucide="${p.icon}" size="56"></i>
            </div>
            <div class="flex-grow flex flex-col justify-between w-full px-4">
                <div>
                    <h4 class="text-3xl font-bold mb-3 group-hover:text-[#FF8DA1] transition-colors">${p.name}</h4>
                    <p class="text-gray-600 text-sm leading-relaxed mb-6 italic px-2">「${p.story}」</p>
                </div>
                <div class="flex justify-between items-center w-full mt-auto pt-4 border-t-2 border-dashed border-[#FFD1DC]/20">
                    <div class="text-4xl font-display text-[#5F9EA0]">¥${p.price.toLocaleString()}</div>
                    <div class="add-btn w-14 h-14 bg-[#FFD1DC] rounded-full flex items-center justify-center text-white shadow-md">
                        <i data-lucide="plus" size="24"></i>
                    </div>
                </div>
            </div>
        `;
        card.onclick = () => openModal(p);
        grid.appendChild(card);
    });
    lucide.createIcons();
}

// script.js の openModal 関数を丸ごと差し替えてください
function openModal(p) {
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-price').innerText = `¥${p.price.toLocaleString()}`;
    document.getElementById('modal-story').innerText = `「${p.story}」`;
    document.getElementById('modal-description').innerText = p.description;
    
    // --- 修正ポイント：アイコンを .icon-animate-modal で囲む ---
    document.getElementById('modal-icon').innerHTML = `
        <div class="icon-animate-modal">
            <i data-lucide="${p.icon}"></i>
        </div>
    `;
    
    const addBtn = document.getElementById('add-to-cart-btn');
    addBtn.onclick = () => handleAddToCart(p);
    
    document.getElementById('modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    lucide.createIcons(); // Lucideアイコンを描画（これがないと消えます）
}

function handleAddToCart(product) {
    cartItems.push(product);
    updateCartUI();
    closeModal();
    showToast(`${product.name}をカートに届けたよ！`);
}

function updateCartUI() {
    const count = document.getElementById('cart-count');
    const countMobile = document.getElementById('cart-count-mobile');
    [count, countMobile].forEach(c => {
        if(c) {
            c.classList.toggle('hidden', cartItems.length === 0);
            c.innerText = cartItems.length;
        }
    });
}

function showToast(msg) {
    const toast = document.getElementById('order-success');
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

function closeModal() { document.getElementById('modal').classList.add('hidden'); document.body.style.overflow = 'auto'; }

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // モーダル・カート操作
    document.getElementById('modal-close').onclick = closeModal;
    document.getElementById('modal-overlay').onclick = closeModal;
    document.querySelectorAll('.cart-trigger').forEach(btn => btn.onclick = () => {
        if(cartItems.length > 0) {
            document.getElementById('checkout-modal').classList.remove('hidden');
        } else {
            showToast("カートが空っぽだよ！");
        }
    });
    document.getElementById('checkout-close').onclick = () => document.getElementById('checkout-modal').classList.add('hidden');

    // ハンバーガーメニュー操作
    const mOpen = document.getElementById('menu-open');
    const mClose = document.getElementById('menu-close');
    const mMenu = document.getElementById('mobile-menu');
    
    if(mOpen) mOpen.onclick = () => mMenu.classList.add('active');
    if(mClose) mClose.onclick = () => mMenu.classList.remove('active');
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.onclick = () => mMenu.classList.remove('active');
    });
});
