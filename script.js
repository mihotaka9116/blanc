// --- 商品データ（ご提示いただいた最新テキスト版） ---
const products = [
    { 
        id: '1', no: '01', name: '夜空の星屑クッキー', price: 1200, icon: 'star', difficulty: '★★★', time: '45min', 
        story: '夜空からこぼれ落ちた星の欠片を拾い集めて焼いた、少ししょっぱいバタークッキー。', 
        desc: '北海道産バターを贅沢に使用し、生地を何度も寝かせてサクサクの食感を実現しました。隠し味に加えられた宮古の塩が、バターの甘みを上品に引き立てます。' 
    },
    { 
        id: '2', no: '02', name: '木漏れ日のシフォン', price: 2800, icon: 'chef-hat', difficulty: '★★☆', time: '60min', 
        story: '森の精霊たちがダンスをする午後のひととき。その柔らかい光を閉じ込めました。', 
        desc: '驚くほどふわふわで、弾力があります。新鮮な卵をたっぷり使い、空気を含ませるように丁寧に混ぜ合わせることで、軽い口どけに仕上げました。' 
    },
    { 
        id: '3', no: '03', name: 'あなぐまの切り株ロール', price: 2500, icon: 'disc', difficulty: '★★★', time: '90min', 
        story: '森のあなぐまさんが見つけた特別な切り株をイメージした、しっとりココア生地。', 
        desc: 'ビターなココアを練り込んだしっとりとしたスポンジで、甘さ控えめの生クリームをたっぷりと巻き込みました。切り株の年輪のような模様は、一つひとつブランが手描きで仕上げています。' 
    },
    { 
        id: '4', no: '04', name: '秘密の鍵穴ドーナツ', price: 450, icon: 'key', difficulty: '★☆☆', time: '30min', 
        story: 'この穴から世界をのぞくと、明日のお天気がわかるという魔法がかかっています。', 
        desc: 'じっくりと時間をかけて揚げた、昔ながらの素朴なドーナツです。外側はカリッと、中はもちもちとした食感で、お砂糖の結晶がキラキラと魔法のように輝きます。' 
    },
    { 
        id: '5', no: '05', name: '風の丘のクロワッサン', price: 380, icon: 'wind', difficulty: '★★★', time: '120min', 
        story: '丘の上で吹くそよ風が、生地を何層にも重ねてくれたような軽やかな層が自慢。', 
        desc: '発酵バターを幾層にも折り込み、時間をかけて丁寧に焼き上げました。サクッとした音の後に広がる、豊かなバターの香りと小麦の旨味。風が吹き抜けるような軽やかさと、しっかりとした満足感を両立させた一品です。' 
    },
    { 
        id: '6', no: '06', name: 'ブランの特製マドレーヌ', price: 400, icon: 'rabbit', difficulty: '★☆☆', time: '40min', 
        story: '隠し味にハチミツを。店主のブランが一番得意な、貝殻の形の焼き菓子です。', 
        desc: 'しっとりと焼き上げた生地に、花の蜜をたっぷり閉じ込めました。一口食べると、ハチミツの芳醇な香りとレモンの爽やかさが鼻を抜けていきます。店主ブランが初めて作った、思い入れのある一品。' 
    }
];

let cartItems = [];

// --- 商品一覧（Daily Specials）の描画 ---
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "recipe-card rounded-[2.5rem] p-8 shadow-lg text-center cursor-pointer transition-all duration-300 hover:shadow-2xl group flex flex-col items-center relative";
        
        // カードクリックで詳細を開く
        card.onclick = () => openModal(p);

        card.innerHTML = `
            <div class="recipe-tag">RECIPE ${p.no}</div>
            <div class="icon-animate-wrap">
                <i data-lucide="${p.icon}" class="text-[#FF8DA1]"></i>
            </div>
            <div class="flex-grow w-full text-gray-600 flex flex-col">
                <div class="text-[10px] font-bold text-[#5F9EA0] mb-2 uppercase tracking-tighter">${p.difficulty} | ${p.time}</div>
                <h4 class="text-xl md:text-2xl font-bold mb-2 group-hover:text-[#FF8DA1] transition-colors">${p.name}</h4>
                <p class="text-xs italic mb-6 line-clamp-2">"${p.story}"</p>
                <div class="flex justify-between items-center mt-auto pt-4 border-t border-dashed border-[#FFD1DC]">
                    <span class="text-2xl md:text-3xl font-display text-[#5F9EA0]">¥${p.price.toLocaleString()}</span>
                    <div class="w-10 h-10 bg-[#FFD1DC] rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <i data-lucide="plus" size="18"></i>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    // 動的に追加した要素のアイコンを生成
    if (window.lucide) {
        lucide.createIcons();
    }
}

// --- 詳細モーダルの表示 ---
function openModal(p) {
    const modal = document.getElementById('modal');
    if (!modal) return;

    document.getElementById('modal-info').innerText = `Recipe No.${p.no} | Difficulty: ${p.difficulty} | Time: ${p.time}`;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-price').innerText = `¥${p.price.toLocaleString()}`;
    document.getElementById('modal-story').innerText = `「${p.story}」`;
    document.getElementById('modal-description').innerText = p.desc;
    
    // アイコンの更新
    const iconContainer = document.getElementById('modal-icon');
    if (iconContainer) {
        iconContainer.innerHTML = `<div class="icon-animate-modal"><i data-lucide="${p.icon}"></i></div>`;
    }
    
    // カート追加ボタンのイベント設定
    const addBtn = document.getElementById('add-to-cart-btn');
    if (addBtn) {
        addBtn.onclick = () => addToCart(p);
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    if (window.lucide) {
        lucide.createIcons();
    }
}

// --- カート機能 ---
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
    
    [countD, countM].forEach(el => {
        if(el) {
            el.classList.toggle('hidden', cartItems.length === 0);
            el.innerText = cartItems.length;
        }
    });
    
    const priceEl = document.getElementById('total-price');
    if (priceEl) priceEl.innerText = `¥${total.toLocaleString()}`;

    const list = document.getElementById('cart-items-list');
    if (list) {
        list.innerHTML = cartItems.map(item => `
            <div class="flex justify-between py-2 border-b border-gray-100 italic">
                <span>${item.name}</span><span>¥${item.price.toLocaleString()}</span>
            </div>
        `).join('');
    }
}

// --- 共通アクション ---
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function showToast(msg) {
    const toast = document.getElementById('order-success');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// --- 初期化処理 ---
document.addEventListener('DOMContentLoaded', () => {
    // 商品一覧の描画
    renderProducts();
    
    // モバイルメニュー制御
    const menu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('menu-open');
    const closeBtn = document.getElementById('menu-close');
    
    if (openBtn) openBtn.onclick = () => menu.classList.add('active');
    if (closeBtn) closeBtn.onclick = () => menu.classList.remove('active');
    
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.onclick = () => menu.classList.remove('active');
    });

    // カートモーダル制御
    document.querySelectorAll('.cart-trigger').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            if(cartItems.length > 0) {
                document.getElementById('cart-modal').classList.remove('hidden');
            } else {
                showToast("カートは空っぽだよ！");
            }
        };
    });
    
    const cartClose = document.getElementById('cart-close');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartClose) cartClose.onclick = () => document.getElementById('cart-modal').classList.add('hidden');
    if (cartOverlay) cartOverlay.onclick = () => document.getElementById('cart-modal').classList.add('hidden');

    // 詳細モーダルを閉じる
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalClose) modalClose.onclick = closeModal;
    if (modalOverlay) modalOverlay.onclick = closeModal;

    // ページ全体の静的なアイコンを生成（ヒーロー部分など）
    if (window.lucide) {
        lucide.createIcons();
    }
});
