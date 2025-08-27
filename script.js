/***** 導覽列 & 購物車 *****/
let cartCount = 0;
const cartIcon = document.getElementById("cart-icon");
if (cartIcon) {
  cartIcon.addEventListener("click", function (e) {
    e.preventDefault();
    cartCount++;
    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = cartCount;
  });
}

// 首頁透明導覽列滾動切換（內頁帶 scrolled 就不處理）
const navbar = document.querySelector(".navbar");
if (navbar && !navbar.classList.contains("scrolled")) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });
}

/***** 全部作品頁（products.html）邏輯 *****/
const productGrid = document.getElementById("product-grid");
if (productGrid) {
  const products = [
    { id: 1, title: "手作茶杯", category: "茶具", price: 880,  img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800" },
    { id: 2, title: "拉胚碗",   category: "碗盤", price: 1280, img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800" },
    { id: 3, title: "釉燒花器", category: "花器", price: 1680, img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800" },
    { id: 4, title: "咖啡杯",   category: "茶具", price: 980,  img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800" },
    { id: 5, title: "甜點盤",   category: "碗盤", price: 640,  img: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800" },
    { id: 6, title: "迷你花瓶", category: "花器", price: 520,  img: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800" },
    { id: 7, title: "抹茶碗",   category: "茶具", price: 1980, img: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=800" },
    { id: 8, title: "深口盤",   category: "碗盤", price: 1120, img: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=800" },
  ];

  const searchInput = document.getElementById("search-input");
  const searchBtn   = document.getElementById("search-btn");
  const sortSelect  = document.getElementById("sort-select");
  const resultInfo  = document.getElementById("result-info");
  const categoryList= document.getElementById("category-list");

  const catSet = Array.from(new Set(products.map(p => p.category)));
  catSet.forEach(cat => {
    const id = `cat-${cat}`;
    const item = document.createElement("label");
    item.className = "list-group-item d-flex align-items-center gap-2";
    item.innerHTML = `
      <input class="form-check-input me-1 category-check" type="checkbox" value="${cat}" id="${id}">
      <span>${cat}</span>`;
    categoryList.appendChild(item);
  });

  const state = { q: "", cats: new Set(), sort: "popular" };

  function render(list) {
    productGrid.innerHTML = "";
    list.forEach(p => {
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-3";
      col.innerHTML = `
        <div class="card h-100 product-card">
          <img src="${p.img}" class="card-img-top" alt="${p.title}">
          <div class="card-body d-flex flex-column">
            <h6 class="card-title mb-2 text-truncate">${p.title}</h6>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="fw-bold">NT$ ${p.price.toLocaleString()}</span>
              <button class="btn btn-sm btn-outline-dark add-to-cart" data-id="${p.id}">
                <i class="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>`;
      productGrid.appendChild(col);
    });
    resultInfo.textContent = `共 ${list.length} 件商品`;
    productGrid.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        cartCount++;
        const badge = document.getElementById("cart-count");
        if (badge) badge.textContent = cartCount;
      });
    });
  }

  function getFiltered() {
    let arr = products.slice();
    if (state.q) {
      const q = state.q.toLowerCase();
      arr = arr.filter(p => p.title.toLowerCase().includes(q));
    }
    if (state.cats.size) arr = arr.filter(p => state.cats.has(p.category));
    if (state.sort === "price-asc")  arr.sort((a,b)=> a.price - b.price);
    if (state.sort === "price-desc") arr.sort((a,b)=> b.price - a.price);
    return arr;
  }

  function doSearch() { state.q = (searchInput.value||"").trim(); render(getFiltered()); }
  searchBtn.addEventListener("click", doSearch);
  searchInput.addEventListener("keydown", e => { if (e.key === "Enter") doSearch(); });
  sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; render(getFiltered()); });
  categoryList.addEventListener("change", e => {
    if (e.target.classList.contains("category-check")) {
      const v = e.target.value; e.target.checked ? state.cats.add(v) : state.cats.delete(v);
      render(getFiltered());
    }
  });

  render(products);
}

/***** 最新消息頁（news.html）邏輯 *****/
const postList = document.getElementById("post-list");
if (postList) {
  // 模擬文章資料：之後可接後端或 CMS
  const posts = [
    {
      id: 101,
      title: "釉色實驗紀錄：窯內不同溫區的變化",
      category: "創作筆記",
      date: "2025-04-16",
      cover: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=1200",
      excerpt: "這次以還原氣氛測試青瓷釉，記錄同一批試片在上下層的差異，並整理配方、保溫時間與開窯觀察。",
      url: "#"
    },
    {
      id: 102,
      title: "手拉胚教學：新手從零到完成杯",
      category: "工作坊",
      date: "2025-03-07",
      cover: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200",
      excerpt: "整理入門手拉胚的重點與易犯錯誤：土團準備、定中心、拉高、定型與修坯，內含課程影片回放連結。",
      url: "#"
    },
    {
      id: 103,
      title: "展覽公告：『土與火之歌』聯展",
      category: "展覽活動",
      date: "2025-02-18",
      cover: "https://images.unsplash.com/photo-1503602642458-232111445657?w=1200",
      excerpt: "與三位陶藝家聯合展出，展期三週，現場可體驗杯盤刻紋，歡迎蒞臨交流。",
      url: "#"
    },
    {
      id: 104,
      title: "新釉色試燒心得與參數",
      category: "創作筆記",
      date: "2025-08-27",                  // YYYY-MM-DD
      cover: "https://images.unsplash.com/photo-1629440400842-9108c0ccf336?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVhcG90fGVufDB8fDB8fHww", // 圖片網址或相對路徑
      excerpt: "記錄本次還原氣氛下的配方比例、升溫曲線與開窯觀察。",
      url: "post.html?id=104"               // 未來要做文章內頁可用這種連結
    }

  ];

  const byDateDesc = (a,b)=> new Date(b.date) - new Date(a.date);
  posts.sort(byDateDesc);

  // 側欄：分類
  const postCategories = document.getElementById("post-categories");
  const cats = Array.from(new Set(posts.map(p=>p.category)));
  cats.forEach(c=>{
    const el = document.createElement("a");
    el.href = "#";
    el.className = "list-group-item list-group-item-action";
    el.textContent = c;
    el.addEventListener("click", (e)=>{
      e.preventDefault();
      state.cat = (state.cat === c) ? "" : c;
      render();
    });
    postCategories.appendChild(el);
  });

  // 側欄：近期文章
  const recentWrap = document.getElementById("recent-posts");
  posts.slice(0,5).forEach(p=>{
    const el = document.createElement("a");
    el.href = p.url;
    el.className = "recent-item text-decoration-none text-reset";
    el.innerHTML = `
      <img src="${p.cover}" alt="${p.title}">
      <div>
        <div class="fw-semibold">${p.title}</div>
        <div class="text-muted">${p.date}</div>
      </div>`;
    recentWrap.appendChild(el);
  });

  // 搜尋狀態
  const state = { q:"", cat:"" };
  const searchInput = document.getElementById("post-search");
  const searchBtn   = document.getElementById("post-search-btn");

  searchBtn.addEventListener("click", doSearch);
  searchInput.addEventListener("keydown", e=>{ if (e.key === "Enter") doSearch(); });
  function doSearch(){ state.q = (searchInput.value||"").trim(); render(); }

  //渲染時，每篇文章外層包一個 .col，讓 Bootstrap 幫你一列兩張排好文章小卡
  function render(){
    postList.innerHTML = "";
    let list = posts.slice();

    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    if (state.cat) list = list.filter(p => p.category === state.cat);

  list.forEach(p=>{
    // 讓 row-cols-* 決定每列幾張
    const col = document.createElement("div");
    col.className = "col";   // 不要再用 Masonry 或固定寬，交給 row-cols

    const d = new Date(p.date);
    const month = (d.getMonth()+1).toString().padStart(2,"0");
    const day   = d.getDate().toString().padStart(2,"0");

    col.innerHTML = `
      <article class="post-card h-100">
        <div class="post-cover">
          <img src="${p.cover}" alt="${p.title}">
          <div class="post-date"><div class="day">${day}</div><div class="month">${month} 月</div></div>
          <div class="post-category">${p.category}</div>
        </div>
        <div class="post-body">
          <h3 class="post-title">${p.title}</h3>
          <p class="post-excerpt">${p.excerpt}</p>
          <a class="post-read text-decoration-none" href="${p.url}">繼續閱讀</a>
        </div>
      </article>`;
    postList.appendChild(col);
  });
}

  render();
}


/***** 帳號頁：登入/註冊切換與基本驗證 *****/
(function(){
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const toLoginBtn = document.getElementById('switch-to-login');
  const toRegBtn = document.getElementById('switch-to-register');
  const panelTitle = document.getElementById('panel-title');

  if (!loginForm || !registerForm) return;

  // 切換
  function showLogin(){
    loginForm.classList.remove('d-none');
    registerForm.classList.add('d-none');
    panelTitle.textContent = '註冊';
  }
  function showRegister(){
    registerForm.classList.remove('d-none');
    loginForm.classList.add('d-none');
    panelTitle.textContent = '登入';
  }
  toLoginBtn?.addEventListener('click', showLogin);
  toRegBtn?.addEventListener('click', showRegister);

  // 顯示/隱藏密碼
  document.querySelectorAll('.password-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = document.querySelector(btn.dataset.target);
      if (!target) return;
      const type = target.getAttribute('type') === 'password' ? 'text' : 'password';
      target.setAttribute('type', type);
      btn.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    });
  });

  // 前端驗證（Bootstrap 原生風格）
  function attachValidation(form){
    form.addEventListener('submit', (e)=>{
      if (!form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
      } else {
        e.preventDefault();
        // TODO: 這裡接後端 API
        alert((form.id==='login-form'?'已送出登入資料':'已送出註冊資料'));
      }
      form.classList.add('was-validated');
    });
  }
  attachValidation(loginForm);
  attachValidation(registerForm);
})();

