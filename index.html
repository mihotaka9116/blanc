const products = [
    { id: '1', no: '01', name: '夜空の星屑クッキー', price: 1200, icon: 'utensils', story: '夜空の欠片を拾い集めて。', difficulty: '★★★', time: '45min', desc: '岩手県産の濃厚バターと、隠し味に宮古の塩を。サクサクの魔法をお楽しみください。' },
    { id: '2', no: '02', name: '木漏れ日のシフォン', price: 2800, icon: 'chef-hat', story: '森の精霊のダンスと共に。', difficulty: '★★☆', time: '60min', desc: '空気のように軽く、雲のように柔らかい。卵の優しい風味が口いっぱいに広がります。' },
    { id: '3', no: '03', name: 'あなぐまさんの切り株', price: 2500, icon: 'disc', story: '秘密の森の、しっとりココア。', difficulty: '★★★', time: '90min', desc: 'ビターなチョコ生地とたっぷりクリーム。遠野の冬の温かい暖炉をイメージしました。' },
    { id: '4', no: '04', name: '秘密の鍵穴ドーナツ', price: 450, icon: 'cog', story: '明日のお天気がわかる魔法。', difficulty: '★☆☆', time: '30min', desc: 'カリッと揚げた素朴な味わい。穴から未来をのぞけば、きっといいことがあります。' },
    { id: '5', no: '05', name: '風の丘のクロワッサン', price: 380, icon: 'wind', story: 'そよ風が重ねた、軽やかな層。', difficulty: '★★★', time: '120min', desc: '発酵バターの香りが層の間から溢れ出します。サクッとした音まで美味しい逸品。' },
    { id: '6', no: '06', name: 'ブランの特製マドレーヌ', price: 400, icon: 'rabbit', story: '隠し味は、少しの勇気。', difficulty: '★☆☆', time: '40min', desc: '貝殻の形をした、店主ブランのお気に入り。ハチミツの甘さが心に染み渡ります。' }
];

let cartItems = [];

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "recipe-card rounded-[2.5rem] p-8 shadow-lg text-center cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl group flex flex-col items-center";
        card.innerHTML = `
            <div class="recipe-tag">RECIPE ${p.no}</div>
            <div class="icon-animate-wrap"><i data-lucide="${p.icon}" class="text-[#FF8DA1]"></i></div>
            <div class="flex-grow flex flex-col justify-between w-full px-2 text-gray-600">
                <div>
                    <div class="text-[10px] font-bold text-[#5F9EA0] mb-1 uppercase tracking-tighter">${p.difficulty} | ${p.time}</div>
                    <h4 class="text-2xl font-bold mb-2 group-hover:text-[#FF8DA1] transition-colors">${p.name}</h4>
                    <p class="text-xs italic mb-4">"${p.story}"</p>
                </div>
                <div class="flex justify-between items-center w-full mt-auto pt-4 border-t border-dashed border-[#FFD1DC]">
                    <div class="text-3xl font-display text-[#5F9EA0]">¥${p.price.toLocaleString()}</div>
                    <div class="w-10 h-10 bg-[#FFD1DC] rounded-xl flex items-center justify-center text-white"><i data-lucide="plus" size="20"></i></div>
                </div>
            </div>
        `;
        card.onclick = () => openModal(p);
        grid.appendChild(card);
    });
    lucide.createIcons();
}

function openModal(p) {
    document.getElementById('modal-info').innerText = `Recipe No.${p.no} | Difficulty: ${p.difficulty} | Time: ${p.time}`;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-price').innerText = `¥${p.price.toLocaleString()}`;
    document.getElementById('modal-story').innerText = `「${p.story}」`;
    document.getElementById('modal-description').innerText = p.desc;
    document.getElementById('modal-icon').innerHTML = `<div class="icon-animate-modal"><i data-lucide="${p.icon}"></i></div>`;
    document.getElementById('add-to-cart-btn').onclick = () => { cartItems.push(p); updateCartUI(); closeModal(); showToast(`${p.name}をカートにいれたよ！`); };
    document.getElementById('modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function updateCartUI() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    [document.getElementById('cart-count'), document.getElementById('cart-count-mobile')].forEach(el => {
        if(el) { el.classList.toggle('hidden', cartItems.length === 0); el.innerText = cartItems.length; }
    });
    document.getElementById('total-price').innerText = `¥${total.toLocaleString()}`;
    document.getElementById('cart-items-list').innerHTML = cartItems.map(item => `<div class="flex justify-between py-2 border-b border-gray-100"><span>${item.name}</span><span>¥${item.price.toLocaleString()}</span></div>`).join('');
}

function showToast(msg) {
    const toast = document.getElementById('order-success');
    toast.innerText = msg; toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

function closeModal() { document.getElementById('modal').classList.add('hidden'); document.body.style.overflow = 'auto'; }

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    document.getElementById('modal-close').onclick = closeModal;
    document.getElementById('modal-overlay').onclick = closeModal;
    document.getElementById('menu-open').onclick = () => document.getElementById('mobile-menu').classList.add('active');
    document.getElementById('menu-close').onclick = () => document.getElementById('mobile-menu').classList.remove('active');
    document.querySelectorAll('.mobile-link').forEach(link => link.onclick = () => document.getElementById('mobile-menu').classList.remove('active'));
    document.querySelectorAll('.cart-trigger').forEach(btn => btn.onclick = () => {
        if(cartItems.length > 0) document.getElementById('cart-modal').classList.remove('hidden');
        else showToast("カートは空っぽだよ！");
    });
    document.getElementById('cart-close').onclick = () => document.getElementById('cart-modal').classList.add('hidden');
});
