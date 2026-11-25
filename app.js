/**
 * CampusTrade 校園二手市集 - 核心業務邏輯與狀態管理
 * 商業設計系 第20組 期末專題 (陳致穎、江俊霆)
 */

// 預設示範資料 (可由 LocalStorage 持久化，並提供一鍵重設)
const DEFAULT_PRODUCTS = [
  {
    id: "prod-001",
    title: "iPad Air 5 (64G) 太空灰 + Apple Pencil 2 代",
    category: "3c",
    price: 13500,
    originalPrice: 19900,
    condition: "95成新",
    location: "圖書館一樓",
    status: "active", // active | reserved | sold
    featured: true,
    seller: {
      name: "陳致穎",
      studentNo: "11424250",
      dept: "商業設計系",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5.0,
      trades: 8
    },
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
    description: "商設系大一上購買，皆貼類紙膜並使用保護殼，因升級 iPad Pro 故售出。附原廠外盒、充電線與 Apple Pencil 2，無摔傷摔痕，功能 100% 正常。可在校內現場驗機！",
    meetupNotes: "平日中午或下課可在圖書館大廳或綜合大樓面交現場驗機。",
    likes: 24,
    views: 312,
    createdAt: "2026-11-20 14:30"
  },
  {
    id: "prod-002",
    title: "微積分(精華版 第十版) 原文書 Calculus Early Transcendentals",
    category: "book",
    price: 450,
    originalPrice: 1280,
    condition: "8成新",
    location: "學生活動中心",
    status: "active",
    featured: false,
    seller: {
      name: "江俊霆",
      studentNo: "11424251",
      dept: "商業設計系",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      trades: 5
    },
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    description: "大一必修指定用書，內頁乾淨僅有前三章鉛筆輕微劃記，期末考前必備習題解答頁籤都還保留著。學弟妹開學修課神書，原價千元以上，超佛心回饋給校內同學！",
    meetupNotes: "二、四下午學生活動中心或學餐全家面交。",
    likes: 18,
    views: 189,
    createdAt: "2026-11-21 09:15"
  },
  {
    id: "prod-003",
    title: "COPIC 三代 72色 麥克筆套組 (A+B款精選色)",
    category: "design",
    price: 2200,
    originalPrice: 5800,
    condition: "8成新",
    location: "綜合教學大樓一樓",
    status: "active",
    featured: true,
    seller: {
      name: "林同學",
      studentNo: "11424102",
      dept: "商業設計系",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 5.0,
      trades: 12
    },
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80",
    description: "商設系手繪基本功課必備！每隻筆頭皆完整無開叉，水份充足，常用膚色系有另購補充墨水。附專用壓克力攜帶提盒，歡迎商設/工設/視傳學弟妹帶走！",
    meetupNotes: "綜合大樓設計教室外面交，可帶畫紙現場試畫顏色。",
    likes: 31,
    views: 420,
    createdAt: "2026-11-22 16:40"
  },
  {
    id: "prod-004",
    title: "宿舍個人靜音小冰箱 45L 一級能效 (附小冷凍庫)",
    category: "dorm",
    price: 1600,
    originalPrice: 3890,
    condition: "9成新",
    location: "第一宿舍大廳",
    status: "active",
    featured: false,
    seller: {
      name: "王學長",
      studentNo: "11223019",
      dept: "資訊工程系",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      rating: 4.8,
      trades: 4
    },
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&auto=format&fit=crop&q=80",
    description: "住一宿滿一年即將搬出，冷藏製冷極快且幾乎零噪音，不影響睡眠。內部已使用酒精深層消毒清潔乾淨，插電即可使用。因體積較大限第一宿舍自取，我可幫忙搬到宿舍一樓門口。",
    meetupNotes: "第一宿舍門口面交，需自備推車或小客車載運。",
    likes: 42,
    views: 560,
    createdAt: "2026-11-23 11:20"
  },
  {
    id: "prod-005",
    title: "GIANT 捷安特 經典通勤單車 20吋 附車燈與密碼鎖",
    category: "sports",
    price: 1200,
    originalPrice: 3200,
    condition: "實用戰鬥版",
    location: "校門口全家",
    status: "active",
    featured: false,
    seller: {
      name: "張同學",
      studentNo: "11324088",
      dept: "企業管理系",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      rating: 4.7,
      trades: 3
    },
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80",
    description: "校園代步神器！煞車皮上個月剛在校門口車行換新，輪胎胎紋清楚飽滿。車身有些微使用痕跡與輕微鏽斑，但不影響騎乘順暢度。附贈前後LED車燈與五位數密碼鎖。",
    meetupNotes: "校門口全家超商前試騎面交，現場滿意再付款。",
    likes: 15,
    views: 230,
    createdAt: "2026-11-24 10:05"
  },
  {
    id: "prod-006",
    title: "Keychron K2 藍牙/有線雙模機械鍵盤 (茶軸 RGB發光)",
    category: "3c",
    price: 1500,
    originalPrice: 2890,
    condition: "95成新",
    location: "圖書館一樓",
    status: "reserved",
    featured: false,
    seller: {
      name: "陳致穎",
      studentNo: "11424250",
      dept: "商業設計系",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5.0,
      trades: 8
    },
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    description: "支援 Mac / Windows 快速一鍵切換，茶軸手感段落分明又不會太吵，非常適合在宿舍或研究室打報告。盒裝完整，附拔鍵器與原廠替換鍵帽。",
    meetupNotes: "已與同學約定圖書館自取中。",
    likes: 27,
    views: 390,
    createdAt: "2026-11-19 18:00"
  }
];

// 預設違規檢舉資料 (供後台管理審查中心展示)
const DEFAULT_REPORTS = [
  {
    id: "rep-001",
    targetId: "prod-005",
    targetTitle: "GIANT 捷安特 經典通勤單車 20吋",
    reporter: "匿名同學 (資管二)",
    reason: "疑似重複刊登或交易地點更改未說明",
    status: "pending", // pending | approved | rejected
    createdAt: "2026-11-24 18:20"
  },
  {
    id: "rep-002",
    targetId: "mock-ad-99",
    targetTitle: "【廣告違規】未經授權之校外代購加LINE兼職連結",
    reporter: "學生自治會巡查員",
    reason: "張貼校外外部兼職宣傳，非實體校園二手物品，疑似詐騙連結",
    status: "resolved",
    createdAt: "2026-11-23 20:10"
  }
];

// 預設可切換的使用者角色
const USERS = {
  seller: {
    id: "user-1",
    name: "陳致穎",
    studentNo: "11424250",
    role: "seller",
    roleLabel: "賣家同學 / 專案負責人",
    dept: "商業設計系",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  buyer: {
    id: "user-2",
    name: "江俊霆",
    studentNo: "11424251",
    role: "buyer",
    roleLabel: "買家同學 / 專案協作者",
    dept: "商業設計系",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  admin: {
    id: "user-admin",
    name: "系統管理員 (Admin)",
    studentNo: "ADMIN-01",
    role: "admin",
    roleLabel: "市集後台管理者",
    dept: "學務處二手物資交流中心",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  }
};

class CampusTradeApp {
  constructor() {
    this.storageKeyProducts = "campustrade_products_v1";
    this.storageKeyReports = "campustrade_reports_v1";
    this.storageKeyFavorites = "campustrade_favorites_v1";
    this.storageKeyUser = "campustrade_current_user_v1";

    this.currentUser = this.loadCurrentUser();
    this.products = this.loadProducts();
    this.reports = this.loadReports();
    this.favorites = this.loadFavorites();

    // 篩選與排序狀態
    this.filterCategory = "all";
    this.filterLocation = "all";
    this.filterStatus = "active_only"; // 'all' | 'active_only'
    this.searchKeyword = "";
    this.sortBy = "newest"; // 'newest' | 'price_asc' | 'price_desc' | 'popular'

    this.currentView = "market"; // 'market' | 'admin' | 'my-listings'
    this.editingProductId = null;
    this.viewingProductId = null;

    this.init();
  }

  // 資料載入與持久化
  loadProducts() {
    const data = localStorage.getItem(this.storageKeyProducts);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse products from localStorage", e);
      }
    }
    this.saveProducts(DEFAULT_PRODUCTS);
    return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  }

  saveProducts(products) {
    this.products = products;
    localStorage.setItem(this.storageKeyProducts, JSON.stringify(products));
    this.updateStatsUI();
  }

  loadReports() {
    const data = localStorage.getItem(this.storageKeyReports);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {}
    }
    this.saveReports(DEFAULT_REPORTS);
    return JSON.parse(JSON.stringify(DEFAULT_REPORTS));
  }

  saveReports(reports) {
    this.reports = reports;
    localStorage.setItem(this.storageKeyReports, JSON.stringify(reports));
    this.updateStatsUI();
  }

  loadFavorites() {
    const data = localStorage.getItem(this.storageKeyFavorites);
    return data ? JSON.parse(data) : ["prod-001"];
  }

  saveFavorites() {
    localStorage.setItem(this.storageKeyFavorites, JSON.stringify(this.favorites));
  }

  loadCurrentUser() {
    const userRole = localStorage.getItem(this.storageKeyUser) || "seller";
    return USERS[userRole] || USERS.seller;
  }

  switchUser(roleKey) {
    if (USERS[roleKey]) {
      this.currentUser = USERS[roleKey];
      localStorage.setItem(this.storageKeyUser, roleKey);
      this.updateUserUI();
      this.showToast(`已切換身分為：${this.currentUser.name} (${this.currentUser.roleLabel})`, "success");
      
      // 如果切換成管理員且不在後台，提示切換
      if (roleKey === "admin") {
        this.switchView("admin");
      } else if (this.currentView === "admin") {
        this.switchView("market");
      }
      this.render();
    }
  }

  // 重設為原始示範資料 (拿滿加分項的關鍵功能)
  resetDemoData() {
    if (confirm("確定要將所有商品與資料重設為原始示範狀態嗎？此動作將清除自訂的新增修改。")) {
      localStorage.removeItem(this.storageKeyProducts);
      localStorage.removeItem(this.storageKeyReports);
      this.products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
      this.reports = JSON.parse(JSON.stringify(DEFAULT_REPORTS));
      this.saveProducts(this.products);
      this.saveReports(this.reports);
      this.render();
      this.showToast("已成功恢復所有預設商品與示範資料！", "success");
    }
  }

  // 核心 CRUD 操作
  addProduct(formData) {
    const newProduct = {
      id: "prod-" + Date.now().toString(36),
      title: formData.title.trim(),
      category: formData.category,
      price: parseInt(formData.price, 10) || 0,
      originalPrice: parseInt(formData.originalPrice, 10) || 0,
      condition: formData.condition || "95成新",
      location: formData.location || "圖書館一樓",
      status: "active",
      featured: false,
      seller: {
        name: this.currentUser.name,
        studentNo: this.currentUser.studentNo,
        dept: this.currentUser.dept,
        avatar: this.currentUser.avatar,
        rating: 5.0,
        trades: 1
      },
      image: formData.image || "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600&auto=format&fit=crop&q=80",
      description: formData.description.trim(),
      meetupNotes: formData.meetupNotes || "校內各大樓面交，可詳談約定時間。",
      likes: 1,
      views: 1,
      createdAt: new Date().toLocaleString("zh-TW", { hour12: false })
    };

    const updated = [newProduct, ...this.products];
    this.saveProducts(updated);
    this.showToast(`🎉 成功刊登商品「${newProduct.title}」！`, "success");
    this.render();
    return newProduct;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.products[index] = {
      ...this.products[index],
      ...updatedFields
    };
    this.saveProducts(this.products);
    this.showToast(`已成功更新「${this.products[index].title}」商品資料！`, "success");
    this.render();
    return true;
  }

  deleteProduct(id) {
    const item = this.products.find(p => p.id === id);
    const title = item ? item.title : "商品";
    if (confirm(`確定要刪除/下架此二手商品「${title}」嗎？`)) {
      const updated = this.products.filter(p => p.id !== id);
      this.saveProducts(updated);
      this.showToast(`已刪除「${title}」！`, "info");
      this.render();
    }
  }

  toggleFavorite(productId) {
    const index = this.favorites.indexOf(productId);
    const product = this.products.find(p => p.id === productId);
    if (index > -1) {
      this.favorites.splice(index, 1);
      if (product && product.likes > 0) product.likes--;
      this.showToast("已從我的收藏移除", "info");
    } else {
      this.favorites.push(productId);
      if (product) product.likes++;
      this.showToast("❤️ 已加入我的收藏清單！", "success");
    }
    this.saveFavorites();
    this.saveProducts(this.products);
    this.renderProductCards();
    this.updateUserUI();
  }

  // 檢舉功能
  reportProduct(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;
    const reason = prompt(`請輸入您要檢舉商品「${product.title}」的原因（例如：違反校規、標價不實、廣告騷擾）：`);
    if (reason && reason.trim()) {
      const newReport = {
        id: "rep-" + Date.now().toString(36),
        targetId: product.id,
        targetTitle: product.title,
        reporter: `${this.currentUser.name} (${this.currentUser.dept})`,
        reason: reason.trim(),
        status: "pending",
        createdAt: new Date().toLocaleString("zh-TW", { hour12: false })
      };
      this.reports.unshift(newReport);
      this.saveReports(this.reports);
      this.showToast("已收到您的檢舉，市集管理員將於 24 小時內審查！", "success");
      this.render();
    }
  }

  // 審核檢舉
  resolveReport(reportId, action) {
    const rep = this.reports.find(r => r.id === reportId);
    if (!rep) return;
    if (action === "dismiss") {
      rep.status = "dismissed";
      this.showToast("已駁回此檢舉，商品維持正常刊登", "info");
    } else if (action === "remove") {
      rep.status = "resolved";
      this.products = this.products.filter(p => p.id !== rep.targetId);
      this.saveProducts(this.products);
      this.showToast("已下架違規商品並完成檢舉處理！", "success");
    }
    this.saveReports(this.reports);
    this.renderAdminReports();
  }

  // 視圖切換
  switchView(viewName) {
    this.currentView = viewName;
    const marketContainer = document.getElementById("market-view-container");
    const adminContainer = document.getElementById("admin-view-container");
    const navMarketBtn = document.getElementById("nav-market-tab");
    const navAdminBtn = document.getElementById("nav-admin-tab");

    if (viewName === "admin") {
      marketContainer.classList.add("hidden");
      adminContainer.classList.remove("hidden");
      navMarketBtn.classList.remove("text-emerald-700", "bg-emerald-50", "border-emerald-500");
      navMarketBtn.classList.add("text-slate-600", "hover:bg-slate-100");
      navAdminBtn.classList.add("text-emerald-700", "bg-emerald-50", "border-emerald-500");
      navAdminBtn.classList.remove("text-slate-600");
      this.renderAdminView();
    } else {
      adminContainer.classList.add("hidden");
      marketContainer.classList.remove("hidden");
      navAdminBtn.classList.remove("text-emerald-700", "bg-emerald-50", "border-emerald-500");
      navAdminBtn.classList.add("text-slate-600");
      navMarketBtn.classList.add("text-emerald-700", "bg-emerald-50", "border-emerald-500");
      navMarketBtn.classList.remove("text-slate-600");
      this.render();
    }
  }

  // 篩選與排序計算
  getFilteredProducts() {
    let list = [...this.products];

    // 關鍵字搜尋
    if (this.searchKeyword) {
      const q = this.searchKeyword.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.seller.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }

    // 分類過濾
    if (this.filterCategory !== "all") {
      list = list.filter(p => p.category === this.filterCategory);
    }

    // 地點過濾
    if (this.filterLocation !== "all") {
      list = list.filter(p => p.location.includes(this.filterLocation));
    }

    // 狀態過濾
    if (this.filterStatus === "active_only") {
      list = list.filter(p => p.status === "active");
    }

    // 排序
    switch (this.sortBy) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        list.sort((a, b) => b.likes - a.likes);
        break;
      case "newest":
      default:
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return list;
  }

  // UI 渲染主入口
  render() {
    this.renderProductCards();
    this.updateStatsUI();
    this.updateUserUI();
  }

  renderProductCards() {
    const container = document.getElementById("product-grid");
    const countEl = document.getElementById("results-count");
    if (!container) return;

    const items = this.getFilteredProducts();
    if (countEl) countEl.innerText = items.length;

    if (items.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <div class="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-2xl">
            🔍
          </div>
          <h3 class="text-lg font-bold text-slate-700 mb-1">找不到符合條件的商品</h3>
          <p class="text-sm text-slate-500 mb-4">試著切換分類或搜尋不同關鍵字，也可以點擊上方按鈕刊登新二手物！</p>
          <button onclick="app.resetFilters()" class="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition">
            重設篩選條件
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(p => {
      const isFav = this.favorites.includes(p.id);
      const isSold = p.status === "sold";
      const isReserved = p.status === "reserved";
      
      const statusBadge = isSold 
        ? `<span class="bg-slate-700 text-white text-xs px-2.5 py-1 rounded-full font-medium">已售出</span>`
        : (isReserved 
            ? `<span class="bg-amber-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">已預訂</span>`
            : `<span class="bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">刊登中</span>`);

      const discountTag = p.originalPrice && p.originalPrice > p.price 
        ? `<span class="text-xs text-rose-500 font-bold bg-rose-50 px-2 py-0.5 rounded">省 $${(p.originalPrice - p.price).toLocaleString()}</span>` 
        : "";

      return `
        <div class="card-hover bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col group relative">
          <!-- 圖片區塊 -->
          <div class="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" onclick="app.openDetailModal('${p.id}')">
            <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
            
            <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
              ${statusBadge}
              <span class="bg-white/95 backdrop-blur-sm text-slate-700 text-xs px-2 py-1 rounded-full font-semibold shadow-sm">
                ${p.condition}
              </span>
            </div>

            <!-- 收藏愛心按鈕 -->
            <button onclick="event.stopPropagation(); app.toggleFavorite('${p.id}')" 
                    title="收藏商品"
                    class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-base shadow-sm hover:scale-110 active:scale-95 transition ${isFav ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}">
              ${isFav ? '❤️' : '🤍'}
            </button>

            <!-- 面交地點標籤 -->
            <div class="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
              <span>📍</span> <span>${p.location}</span>
            </div>
          </div>

          <!-- 內容區塊 -->
          <div class="p-4 flex-1 flex flex-col">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span class="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                ${this.getCategoryLabel(p.category)}
              </span>
              <span class="flex items-center gap-1 text-slate-400">
                👁️ ${p.views}
              </span>
            </div>

            <h3 onclick="app.openDetailModal('${p.id}')" class="font-bold text-slate-800 text-base mb-2 line-clamp-2 hover:text-emerald-700 cursor-pointer transition">
              ${p.title}
            </h3>

            <!-- 價格資訊 -->
            <div class="mt-auto pt-2 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <span class="text-xs text-slate-400">校園價</span>
                <span class="text-xl font-extrabold text-emerald-600 ml-1">NT$ ${p.price.toLocaleString()}</span>
              </div>
              ${discountTag}
            </div>

            <!-- 賣家資訊與操作 -->
            <div class="mt-3 pt-2.5 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img src="${p.seller.avatar}" class="w-6 h-6 rounded-full object-cover border border-slate-200" alt="avatar" />
                <span class="text-xs text-slate-600 font-medium truncate max-w-[90px]">${p.seller.name}</span>
                <span class="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">${p.seller.dept}</span>
              </div>

              <button onclick="app.openDetailModal('${p.id}')" class="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition">
                查看詳情 →
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // 後台管理介面渲染
  renderAdminView() {
    this.renderAdminProducts();
    this.renderAdminReports();
    this.updateStatsUI();
  }

  renderAdminProducts() {
    const tbody = document.getElementById("admin-products-table-body");
    if (!tbody) return;

    tbody.innerHTML = this.products.map((p, idx) => {
      const statusOptions = `
        <select onchange="app.handleAdminStatusChange('${p.id}', this.value)" class="text-xs font-semibold rounded-lg px-2 py-1 border ${
          p.status === 'active' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
          p.status === 'reserved' ? 'bg-amber-50 text-amber-800 border-amber-300' :
          'bg-slate-100 text-slate-700 border-slate-300'
        }">
          <option value="active" ${p.status === 'active' ? 'selected' : ''}>🟢 刊登中</option>
          <option value="reserved" ${p.status === 'reserved' ? 'selected' : ''}>🟡 已預訂</option>
          <option value="sold" ${p.status === 'sold' ? 'selected' : ''}>⚪ 已售出</option>
        </select>
      `;

      return `
        <tr class="hover:bg-slate-50 border-b border-slate-100 transition">
          <td class="px-4 py-3 text-xs text-slate-400 font-mono">${idx + 1}</td>
          <td class="px-4 py-3">
            <div class="flex items-center gap-3">
              <img src="${p.image}" class="w-12 h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0" />
              <div>
                <p class="font-bold text-slate-800 text-sm line-clamp-1">${p.title}</p>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">${this.getCategoryLabel(p.category)}</span>
                  <span class="text-xs text-slate-400">📍 ${p.location}</span>
                </div>
              </div>
            </div>
          </td>
          <td class="px-4 py-3 font-bold text-emerald-700 text-sm">
            NT$ ${p.price.toLocaleString()}
          </td>
          <td class="px-4 py-3">
            <div class="text-xs font-medium text-slate-700">${p.seller.name}</div>
            <div class="text-[11px] text-slate-400">${p.seller.dept}</div>
          </td>
          <td class="px-4 py-3">
            ${statusOptions}
          </td>
          <td class="px-4 py-3 text-right">
            <div class="flex items-center justify-end gap-1.5">
              <button onclick="app.openEditModal('${p.id}')" title="快速編輯商品" class="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition">
                ✏️ 編輯
              </button>
              <button onclick="app.deleteProduct('${p.id}')" title="刪除商品" class="px-2.5 py-1 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition">
                🗑️ 刪除
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  renderAdminReports() {
    const listEl = document.getElementById("admin-reports-list");
    if (!listEl) return;

    if (this.reports.length === 0) {
      listEl.innerHTML = `<p class="text-slate-400 text-sm text-center py-6">目前校園內無任何檢舉案件 🎉</p>`;
      return;
    }

    listEl.innerHTML = this.reports.map(rep => {
      const isPending = rep.status === "pending";
      const statusBadge = isPending 
        ? `<span class="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">待處理</span>`
        : (rep.status === "resolved" 
            ? `<span class="bg-rose-100 text-rose-800 text-xs px-2 py-0.5 rounded-full font-bold">已下架違規</span>` 
            : `<span class="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">已駁回</span>`);

      return `
        <div class="p-4 rounded-xl border ${isPending ? 'border-amber-200 bg-amber-50/40' : 'border-slate-200 bg-white'} mb-3 transition">
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-slate-800">${rep.targetTitle}</span>
              ${statusBadge}
            </div>
            <span class="text-xs text-slate-400">${rep.createdAt}</span>
          </div>
          <p class="text-xs text-slate-600 mb-2">
            <strong class="text-slate-700">檢舉人：</strong>${rep.reporter} ｜ 
            <strong class="text-slate-700">原因：</strong>${rep.reason}
          </p>
          ${isPending ? `
            <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60">
              <button onclick="app.resolveReport('${rep.id}', 'dismiss')" class="text-xs px-3 py-1 font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition">
                駁回檢舉 (無違規)
              </button>
              <button onclick="app.resolveReport('${rep.id}', 'remove')" class="text-xs px-3 py-1 font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition">
                確認違規並下架商品
              </button>
            </div>
          ` : ''}
        </div>
      `;
    }).join("");
  }

  // 狀態統計更新
  updateStatsUI() {
    const totalCountEl = document.getElementById("stat-total-products");
    const totalValueEl = document.getElementById("stat-total-value");
    const pendingReportsEl = document.getElementById("stat-pending-reports");
    const activeUsersEl = document.getElementById("stat-active-users");

    const totalVal = this.products.reduce((acc, cur) => acc + (cur.price || 0), 0);
    const pendingRep = this.reports.filter(r => r.status === "pending").length;

    if (totalCountEl) totalCountEl.innerText = this.products.length;
    if (totalValueEl) totalValueEl.innerText = `NT$ ${totalVal.toLocaleString()}`;
    if (pendingReportsEl) pendingReportsEl.innerText = pendingRep;
    if (activeUsersEl) activeUsersEl.innerText = "84 位同學";

    // 導航列通知紅點
    const adminBadge = document.getElementById("admin-pending-badge");
    if (adminBadge) {
      if (pendingRep > 0) {
        adminBadge.innerText = pendingRep;
        adminBadge.classList.remove("hidden");
      } else {
        adminBadge.classList.add("hidden");
      }
    }
  }

  updateUserUI() {
    const nameEl = document.getElementById("current-user-name");
    const roleEl = document.getElementById("current-user-role");
    const avatarEl = document.getElementById("current-user-avatar");
    const favCountEl = document.getElementById("nav-fav-count");

    if (nameEl) nameEl.innerText = this.currentUser.name;
    if (roleEl) roleEl.innerText = this.currentUser.roleLabel;
    if (avatarEl) avatarEl.src = this.currentUser.avatar;
    if (favCountEl) favCountEl.innerText = this.favorites.length;
  }

  // 彈跳視窗控制
  openPublishModal() {
    document.getElementById("publish-modal").classList.remove("hidden");
  }
  closePublishModal() {
    document.getElementById("publish-modal").classList.add("hidden");
  }

  openDetailModal(productId) {
    const p = this.products.find(x => x.id === productId);
    if (!p) return;
    this.viewingProductId = productId;
    p.views++;
    this.saveProducts(this.products);

    const isFav = this.favorites.includes(p.id);
    const detailContent = document.getElementById("detail-modal-content");
    detailContent.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 圖片 -->
        <div class="rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3] relative">
          <img src="${p.image}" class="w-full h-full object-cover" />
          <div class="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg">
            📍 ${p.location}
          </div>
        </div>

        <!-- 詳細說明 -->
        <div class="flex flex-col">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span class="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              ${this.getCategoryLabel(p.category)}
            </span>
            <span>刊登於：${p.createdAt}</span>
          </div>

          <h2 class="text-2xl font-bold text-slate-900 mb-2">${p.title}</h2>

          <div class="flex items-baseline gap-3 mb-4">
            <span class="text-3xl font-extrabold text-emerald-600">NT$ ${p.price.toLocaleString()}</span>
            ${p.originalPrice ? `<span class="text-sm text-slate-400 line-through">原價 NT$ ${p.originalPrice.toLocaleString()}</span>` : ''}
            <span class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-semibold">${p.condition}</span>
          </div>

          <!-- 賣家資訊卡片 -->
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="${p.seller.avatar}" class="w-10 h-10 rounded-full object-cover border border-slate-200" />
              <div>
                <p class="font-bold text-sm text-slate-800">${p.seller.name}</p>
                <p class="text-xs text-slate-500">${p.seller.dept} ｜ 信用評分 ⭐ ${p.seller.rating}</p>
              </div>
            </div>
            <span class="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-1 rounded-lg">已成交 ${p.seller.trades} 筆</span>
          </div>

          <!-- 說明內文 -->
          <div class="prose text-slate-700 text-sm mb-4 leading-relaxed bg-white border border-slate-100 p-3.5 rounded-xl">
            <p class="font-bold text-slate-900 text-xs mb-1">【商品現況描述】</p>
            ${p.description}
            <p class="font-bold text-slate-900 text-xs mt-3 mb-1">【校園面交叮嚀】</p>
            <p class="text-xs text-slate-500">${p.meetupNotes}</p>
          </div>

          <!-- 模擬即時私訊對話框 -->
          <div class="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-2">
            <div class="flex gap-2">
              <input type="text" id="chat-input" placeholder="對這件好物有興趣？傳送訊息給賣家同學..." class="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              <button onclick="app.sendChatMessage('${p.id}')" class="px-3.5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition">
                傳送
              </button>
            </div>
            <div class="flex items-center justify-between pt-1">
              <button onclick="app.reportProduct('${p.id}')" class="text-xs text-slate-400 hover:text-rose-500 transition">
                🚨 檢舉此商品
              </button>
              <div class="flex gap-2">
                <button onclick="app.toggleFavorite('${p.id}'); app.openDetailModal('${p.id}');" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition">
                  ${isFav ? '❤️ 已收藏' : '🤍 加入收藏'}
                </button>
                <button onclick="app.reserveProduct('${p.id}')" class="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition">
                  🤝 提出預訂面交
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.getElementById("detail-modal").classList.remove("hidden");
  }
  closeDetailModal() {
    document.getElementById("detail-modal").classList.add("hidden");
    this.viewingProductId = null;
  }

  openEditModal(productId) {
    const p = this.products.find(x => x.id === productId);
    if (!p) return;
    this.editingProductId = productId;
    document.getElementById("edit-title").value = p.title;
    document.getElementById("edit-price").value = p.price;
    document.getElementById("edit-category").value = p.category;
    document.getElementById("edit-location").value = p.location;
    document.getElementById("edit-condition").value = p.condition;
    document.getElementById("edit-status").value = p.status;
    document.getElementById("edit-description").value = p.description;

    document.getElementById("edit-modal").classList.remove("hidden");
  }
  closeEditModal() {
    document.getElementById("edit-modal").classList.add("hidden");
    this.editingProductId = null;
  }

  handleAdminStatusChange(productId, newStatus) {
    this.updateProduct(productId, { status: newStatus });
  }

  reserveProduct(productId) {
    const p = this.products.find(x => x.id === productId);
    if (!p) return;
    if (confirm(`確定要向賣家 ${p.seller.name} 提出預訂商品「${p.title}」並約定於【${p.location}】面交嗎？`)) {
      this.updateProduct(productId, { status: "reserved" });
      this.closeDetailModal();
      this.showToast(`🎉 預訂成功！已為您保留商品，請於約定時間前往【${p.location}】與 ${p.seller.name} 同學面交！`, "success");
    }
  }

  sendChatMessage(productId) {
    const input = document.getElementById("chat-input");
    const val = input.value.trim();
    if (!val) return;
    input.value = "";
    this.showToast(`💬 訊息已成功送出：「${val}」！賣家同學已收到通知。`, "success");
  }

  // 輔助函式
  getCategoryLabel(catKey) {
    const map = {
      all: "全部好物",
      book: "📚 課本教材",
      "3c": "💻 3C電子",
      dorm: "🪑 宿舍生活",
      fashion: "👗 美妝穿搭",
      sports: "🚲 交通運動",
      design: "🎨 設計文具"
    };
    return map[catKey] || "其他好物";
  }

  resetFilters() {
    this.searchKeyword = "";
    this.filterCategory = "all";
    this.filterLocation = "all";
    this.filterStatus = "active_only";
    this.sortBy = "newest";

    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
    const locSelect = document.getElementById("location-select");
    if (locSelect) locSelect.value = "all";
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) sortSelect.value = "newest";

    this.renderCategoryPills();
    this.render();
  }

  renderCategoryPills() {
    const container = document.getElementById("category-pills");
    if (!container) return;
    const cats = [
      { key: "all", label: "全部商品" },
      { key: "book", label: "📚 課本教材" },
      { key: "3c", label: "💻 3C電子" },
      { key: "dorm", label: "🪑 宿舍生活" },
      { key: "fashion", label: "👗 美妝穿搭" },
      { key: "sports", label: "🚲 交通運動" },
      { key: "design", label: "🎨 設計文具" }
    ];

    container.innerHTML = cats.map(c => `
      <button onclick="app.setCategory('${c.key}')" class="px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
        this.filterCategory === c.key
          ? 'bg-emerald-600 text-white shadow-sm'
          : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
      }">
        ${c.label}
      </button>
    `).join("");
  }

  setCategory(catKey) {
    this.filterCategory = catKey;
    this.renderCategoryPills();
    this.renderProductCards();
  }

  showToast(message, type = "info") {
    const toast = document.getElementById("toast-notification");
    const msgEl = document.getElementById("toast-message");
    const iconEl = document.getElementById("toast-icon");
    if (!toast || !msgEl) return;

    msgEl.innerText = message;
    if (type === "success") {
      iconEl.innerText = "✅";
      toast.className = "fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-emerald-800 text-white px-4 py-3 rounded-2xl shadow-xl transition-all duration-300 transform translate-y-0 opacity-100";
    } else {
      iconEl.innerText = "ℹ️";
      toast.className = "fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl transition-all duration-300 transform translate-y-0 opacity-100";
    }

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.className = "fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl transition-all duration-300 transform translate-y-12 opacity-0 pointer-events-none";
    }, 3200);
  }

  init() {
    this.renderCategoryPills();
    this.render();

    // 綁定表單提交
    const publishForm = document.getElementById("publish-form");
    if (publishForm) {
      publishForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = {
          title: document.getElementById("pub-title").value,
          category: document.getElementById("pub-category").value,
          price: document.getElementById("pub-price").value,
          originalPrice: document.getElementById("pub-original-price").value,
          condition: document.getElementById("pub-condition").value,
          location: document.getElementById("pub-location").value,
          image: document.getElementById("pub-image").value,
          description: document.getElementById("pub-description").value,
          meetupNotes: document.getElementById("pub-meetup-notes").value
        };
        this.addProduct(formData);
        publishForm.reset();
        this.closePublishModal();
      });
    }

    const editForm = document.getElementById("edit-form");
    if (editForm) {
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!this.editingProductId) return;
        const updated = {
          title: document.getElementById("edit-title").value,
          price: parseInt(document.getElementById("edit-price").value, 10),
          category: document.getElementById("edit-category").value,
          location: document.getElementById("edit-location").value,
          condition: document.getElementById("edit-condition").value,
          status: document.getElementById("edit-status").value,
          description: document.getElementById("edit-description").value
        };
        this.updateProduct(this.editingProductId, updated);
        this.closeEditModal();
        if (this.currentView === "admin") {
          this.renderAdminProducts();
        }
      });
    }

    // 搜尋輸入
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchKeyword = e.target.value.trim();
        this.renderProductCards();
      });
    }

    // 排序與地點變更
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortBy = e.target.value;
        this.renderProductCards();
      });
    }

    const locationSelect = document.getElementById("location-select");
    if (locationSelect) {
      locationSelect.addEventListener("change", (e) => {
        this.filterLocation = e.target.value;
        this.renderProductCards();
      });
    }

    const filterStatusCheckbox = document.getElementById("filter-status-checkbox");
    if (filterStatusCheckbox) {
      filterStatusCheckbox.addEventListener("change", (e) => {
        this.filterStatus = e.target.checked ? "active_only" : "all";
        this.renderProductCards();
      });
    }
  }
}

// 實例化全域 App
window.app = new CampusTradeApp();
