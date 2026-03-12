// 1. 商品データ
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
    "おはよう。今朝の霧はミルクの香りがするね。シフォンがふわふわに焼けたよ。",
    "窓の外は真っ白。こんな日は、温かい紅茶とマドレーヌで心に灯をともそう。",
    "お疲れさま。今日の最後の一仕事は、自分をたっぷり甘やかすことだよ。",
    "あなぐまくんが遊びに来たよ。彼が見つけてくれた特別な切り株で、今日はロールケーキを巻いたんだ。",
    "あなぐまくんが持ってきた木の実、少しだけクッキーに混ぜてみたよ。森の香りがするはずさ。",
    "あなぐまくんとお茶をしていたら、ついつい話し込んじゃった。お菓子が焦げなくてよかったよ。"
];

// メッセージ更新関数
function updateMessage() {
    const messageElement = document.getElementById("blanc-message");
    const anagumaIcon = document.getElementById("anaguma-icon");
    if (!messageElement) return;

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.innerText = randomMessage;

    if (anagumaIcon) {
        if (randomMessage.includes("あなぐまくん")) {
            anagumaIcon.style.display = "block";
            setTimeout(() => anagumaIcon.classList.add("show"), 100);
        } else {
            anagumaIcon.classList.remove("show");
            setTimeout(() => {
                if (!anagumaIcon.classList.contains("show")) anagumaIcon.style.display = "none";
            }, 800);
        }
    }
}

// 商品描画関数
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "recipe-card rounded-[2.5rem] p-8 shadow-lg text-center cursor-pointer transition-all duration-300 hover:shadow-2xl group flex flex-col items-center relative bg-white";
        card.onclick = () => openModal(p);
        card.innerHTML = `
            <div class="recipe-tag bg-[#FFD1DC] text-white px-4 py-1 rounded-full text-xs mb-4">RECIPE ${p.no}</div>
            <div class="mb-4 text-[#FF8DA1]"><i data-lucide="${p.icon}" size="40"></i></div>
            <div class="flex-grow w-full text-gray-600 flex flex-col">
                <div class="text-[10px] font-bold text-[#5F9EA0] mb-2 uppercase tracking-tighter">${p.difficulty} | ${p.time}</div>
                <h4 class="text-xl md:text-2xl font-bold mb-2 group-hover:text-[#FF8DA1] transition-colors">${p.name}</h4>
                <p class="text-xs italic mb-6">"${p.story}"</p>
                <div class="flex justify-between items-center mt-auto pt-4 border-t border-dashed border-[#FFD1DC]">
                    <span class="text-2xl font-display text-[#5F9EA0]">¥${p.price.toLocaleString()}</span>
                    <div class="w-10 h-10 bg-[#FFD1DC] rounded-xl flex items-center justify-center text-white"><i data-lucide="plus" size="18"></i></div>
                </div>
            </div>`;
        grid.appendChild(card);
    });
    if (window.lucide) lucide.createIcons();
}

// モーダル操作関数
function openModal(p) {
    document.getElementById('modal-info').innerText = `Recipe No.${p.no} | Difficulty: ${p.difficulty} | Time: ${p.time}`;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-price').innerText = `¥${p.price.toLocaleString()}`;
    document.getElementById('modal-story').innerText = `「${p.story}」`;
    document.getElementById('modal-description').innerText = p.desc;
    document.getElementById('modal-icon').innerHTML = `<i data-lucide="${p.icon}" size="80"></i>`;
    document.getElementById('add-to-cart-btn').onclick = () => addToCart(p);
    document.getElementById('modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function addToCart(p) {
    cartItems.push(p);
    updateCartUI();
    closeModal();
    showToast(`${
