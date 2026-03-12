const products = [
    { id: '1', no: '01', name: '夜空の星屑クッキー', price: 1200, icon: 'star', difficulty: '★★★', time: '45min', story: '夜空の欠片を拾い集めて。', desc: '濃厚バターと宮古の塩が織りなす、サクサクの魔法。' },
    { id: '2', no: '02', name: '木漏れ日のシフォン', price: 2800, icon: 'chef-hat', difficulty: '★★☆', time: '60min', story: '森の精霊のダンスと共に。', desc: '雲のように軽い口どけ。卵の優しい風味が広がります。' },
    { id: '3', no: '03', name: 'あなぐまの切り株', price: 2500, icon: 'disc', difficulty: '★★★', time: '90min', story: '秘密の森の、しっとりココア。', desc: 'ビターチョコとクリームのハーモニー。冬の午後に。' },
    { id: '4', no: '04', name: '秘密の鍵穴ドーナツ', price: 450, icon: 'cog', difficulty: '★☆☆', time: '30min', story: '明日が楽しみになる穴。', desc: 'カリッと揚げた素朴な味。のぞくといいことがあるかも。' },
    { id: '5', no: '05', name: '風の丘のクロワッサン', price: 380, icon: 'wind', difficulty: '★★★', time: '120min', story: 'そよ風が重ねた、軽やかな層。', desc: '発酵バターの香りが贅沢。サクッとした音まで美味しい。' },
    { id: '6', no: '06', name: 'ブランのマドレーヌ', price: 400, icon: 'heart', difficulty: '★☆☆', time: '40min', story: '隠し味は、少しの勇気。', desc: 'ハチミツたっぷりの貝殻菓子。大切な人へのお土産に。' }
];

let cartItems = [];

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "recipe-card rounded-[2.5rem] p-8 shadow-lg text-center cursor-pointer transition-all duration-300 hover:shadow-2xl group flex flex-col items-center";
        card.innerHTML = `
            <div class="recipe-tag">RECIPE ${p.no}</div>
            <div class="icon-animate-wrap"><i data-lucide="${p.icon}" class="text-[#FF8DA1]"></i></div>
            <div class="flex-grow w-full text-gray-600">
                <div class="text-[10px] font-bold text-[#5F9EA0] mb-2 uppercase">${p.difficulty} | ${p.time}</div>
                <h4 class="text-2xl font-bold mb-2 group-hover:text-[#FF8DA1]">${p.name}</h4>
                <p class="text-xs italic mb-6">"${p.story}"</p>
                <div class="flex justify-between items-center pt-4 border-t border-dashed border-[#FFD1DC]">
                    <span class="text-3xl font-display text-[#5F9EA0]">¥${p.price.toLocaleString()}</span>
                    <div class="w-10 h-10 bg-[#FFD1DC] rounded-xl flex items-center justify-center text-white"><i data-lucide="plus" size="18"></i></div>
                </div>
            </div>
        `;
        card.onclick = () => openModal(p);
        grid.appendChild(card);
    });
    lucide.createIcons();
}

function openModal(p) {
    document.getElementById('modal-info').innerText = `Recipe No.${p.no} | Diff: ${p.difficulty} | Time: ${p.time}`;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-price').innerText = `¥${p.price.toLocaleString()}`;
    document.getElementById('modal-story').innerText = `「${p.story}」`;
    document.getElementById('modal-description').innerText = p.desc;
    document.getElementById('modal-icon').innerHTML = `<div class="icon-animate-modal"><i data-lucide="${p.icon}"></i></div>`;
    document.getElementById('add-to-cart-btn').onclick = () => addToCart(p);
    document.getElementById('modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function addToCart(p) {
    cartItems.push(p);
    updateCartUI();
    closeModal();
    const toast = document.getElementById('order-success');
    toast.innerText = `${p.name}をカートにいれたよ！`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

function updateCartUI() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const countDesktop = document.getElementById('cart-count');
    const countMobile = document.getElementById('cart-count-mobile');
    
    [countDesktop, countMobile].forEach(el => {
        if(el) {
            el.classList.toggle('hidden', cartItems.length === 0);
            el.innerText = cartItems.length;
        }
    });
    
    document.getElementById('total-price').innerText = `¥${total.toLocaleString()}`;
    document.getElementById('cart-items-list').innerHTML = cartItems.map(item => `
        <div class="flex justify-between py-2 border-b border-gray-100 italic">
            <span>${item.name}</span><span>¥${item.price.toLocaleString()}</span>
        </div>
    `).join('');
}

function closeModal() { document.getElementById('modal').classList.add('hidden'); document.body.style.overflow = 'auto'; }

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // ハンバーガーメニュー
    const menu = document.getElementById('mobile-menu');
    document.getElementById('menu-open').onclick = () => menu.classList.add('active');
    document.getElementById('menu-close').onclick = () => menu.classList.remove('active');
    document.querySelectorAll('.mobile-link').forEach(link => link.onclick = () => menu.classList.remove('active'));

    // カートモーダル
    const cartModal = document.getElementById('cart-modal');
    document.querySelectorAll('.cart-trigger').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            if(cartItems.length > 0) cartModal.classList.remove('hidden');
            else {
                const toast = document.getElementById('order-success');
                toast.innerText = "カートは空っぽだよ！";
                toast.classList.remove('hidden');
                setTimeout(() => toast.classList.add('hidden'), 2000);
            }
        }
    });
    document.getElementById('cart-close').onclick = () => cartModal.classList.add('hidden');
    document.getElementById('cart-overlay').onclick = () => cartModal.classList.add('hidden');
    
    // 詳細モーダル閉じる
    document.getElementById('modal-close').onclick = closeModal;
    document.getElementById('modal-overlay').onclick = closeModal;
});
