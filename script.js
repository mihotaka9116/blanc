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

// --- 2. メッセージ配列 ---
const messages = [
    "霧の朝だね。今日はハチミツを多めに練り込んだよ。",
    "風が強い日は、クロワッサンの層が綺麗に焼けるんだ。",
    "星が綺麗な夜には、少ししょっぱいクッキーが合うよ。",
    "見つけてくれてありがとう。ゆっくりしていってね。",
    "あなぐまくんが遊びに来たよ。一緒にロールケーキを食べよう。",
    "おはよう。今朝の霧はミルクの香りがするね。シフォンがふわふわに焼けたよ。",
    "窓の外は真っ白。こんな日は、温かい紅茶とマドレーヌで心に灯をともそう。",
    "お疲れさま。今日の最後の一仕事は、自分をたっぷり甘やかすことだよ。",
    "あなぐまくんが遊びに来たよ。彼が見つけてくれた特別な切り株で、今日はロールケーキを巻いたんだ。",
    "あなぐまくんが持ってきた木の実、少しだけクッキーに混ぜてみたよ。森の香りがするはずさ。",
    "あなぐまくんとお茶をしていたら、ついつつ話し込んじゃった。お菓子が焦げなくてよかったよ。"
];

// --- 3. メッセージ更新 ---
function updateMessage() {
    const el = document.getElementById("blanc-message");
    const icon = document.getElementById("anaguma-icon");
    if (!el || !icon) return;

    const msg = messages[Math.floor(Math.random() * messages.length)];
    el.innerText = msg;

    if (msg.includes("あなぐまくん")) {
        icon.classList.add("show");
        icon.style.opacity = "1";
        icon.style.pointerEvents = "auto";
        icon.style.bottom = "30px";
    } else {
        icon.classList.remove("show");
        icon.style.opacity = "0";
        icon.style.pointerEvents = "none";
        icon.style.bottom = "-160px";
    }
}

// --- 4. 商品一覧の描画（アイコンサイズ修正版） ---
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "group recipe-card rounded-[2.5rem] p-8 shadow-lg text-center cursor-pointer transition-all duration-300 hover:shadow-2xl flex flex-col items-center relative overflow-hidden bg-white";
        card.onclick = () => openModal(p);
        
        card.innerHTML = `
            <div class="recipe-tag uppercase tracking-tighter">RECIPE ${p.no}</div>
            <div class="icon-animate-wrap flex items-center justify-center">
                <div class="text-[#FF8DA1]">
                    <i data-lucide="${p.icon}" stroke-width="1.2" style="width: 70px; height: 70px;"></i>
                </div>
            </div>
            <div class="flex-grow w-full text-gray-600 flex flex-col">
                <div class="text-[10px] font-bold text-[#5F9EA0] mb-3 uppercase tracking-widest">${p.difficulty} | ${p.time}</div>
                <h4 class="text-xl md:text-2xl font-bold mb-3 group-hover:text-[#FF8DA1] transition-colors">${p.name}</h4>
                <p class="text-xs italic mb-8 line-clamp-2">"${p.story}"</p>
                <div class="flex justify-between items-center mt-auto pt-5 border-t border-dashed border-[#FFD1DC]">
                    <span class="text-2xl font-display text-[#5F9EA0]">¥${p.price.toLocaleString()}</span>
                    <div class="w-10 h-10 bg-[#FFD1DC] rounded-xl flex items-center justify-center text-white group-hover:bg-[#FF8DA1] transition-colors shadow-md">
                        <i data-lucide="plus" size="20"></i>
                    </div>
                </div>
            </div>`;
        grid.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
}

// --- 5. モーダル表示（詳細アイコンサイズ大幅拡大） ---
function openModal(p) {
    document.getElementById('modal-info').innerText = `Recipe No.${p.no} | ${p.difficulty} | ${p.time}`;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-price').innerText = `¥${p.price.toLocaleString()}`;
    document.getElementById('modal-story').innerText = `「${p.story}」`;
    document.getElementById('modal-description').innerText = p.desc;
    
    // 詳細画面のアイコンをさらに巨大化 (180px)
    document.getElementById('modal-icon').innerHTML = `
        <div class="icon-animate-modal flex items-center justify-center w-full">
            <i data-lucide="${p.icon}" stroke-width="1" style="width: 180px; height: 180px;"></i>
        </div>`;
    
    document.getElementById('add-to-cart-btn').onclick = (e) => {
        e.stopPropagation();
        addToCart(p);
    };
    
    document.getElementById('modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// --- 6. カート・通知機能（そのまま） ---
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
    
    if (list) {
        list.innerHTML = cartItems.map(item => `
            <div class="flex justify-between py-2 border-b border-gray-100 italic">
                <span>${item.name}</span>
                <span>¥${item.price.toLocaleString()}</span>
            </div>
        `).join('');
    }
    if (priceEl) priceEl.innerText = `¥${total.toLocaleString()}`;
}

function showToast(msg) {
    const toast = document.getElementById('order-success');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// --- 7. 初期化 ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateMessage();

    const anaguma = document.getElementById('anaguma-icon');
    if (anaguma) {
        anaguma.style.cursor = "pointer";
        anaguma.onclick = () => {
            anaguma.classList.add('anaguma-happy');
            showToast("あなぐまくん：わーい！クッキー大好き！");
            setTimeout(() => { anaguma.classList.remove('anaguma-happy'); }, 1000);
        };
    }

    document.getElementById('menu-open').onclick = () => document.getElementById('mobile-menu').classList.remove('translate-x-full');
    document.getElementById('menu-close').onclick = () => document.getElementById('mobile-menu').classList.add('translate-x-full');

    document.querySelectorAll('.cart-trigger').forEach(btn => {
        btn.onclick = () => {
            if (cartItems.length > 0) document.getElementById('cart-modal').classList.remove('hidden');
            else showToast("カートはまだ空っぽだよ。");
        };
    });

    document.getElementById('cart-close').onclick = () => document.getElementById('cart-modal').classList.add('hidden');
    document.getElementById('modal-close').onclick = closeModal;
    document.getElementById('modal-overlay').onclick = closeModal;
});
