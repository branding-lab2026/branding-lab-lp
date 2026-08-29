document.addEventListener("DOMContentLoaded", () => {
  // ヘッダーの固定表示とスクロール時の影
  const header = document.querySelector(".site-header");
  if (header) {
    const updateShadow = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    updateShadow();
    window.addEventListener("scroll", updateShadow, { passive: true });
  }

  // スマホ用ナビの開閉
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => links.classList.remove("is-open"));
    });
  }

  // ロゴ/サイト名クリック時は、URLの#付きハッシュを取り除いてページ最上部へ戻る
  // (href="#"だけにすると#がURLに残ってしまうため、history.replaceStateで明示的にクリーンなURLへ戻す)
  document.querySelectorAll("[data-logo-home]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // スクロールで要素がふわっと表れる
  const targets = document.querySelectorAll(".fade-up, .fade-left, .fade-right");
  if (!("IntersectionObserver" in window) || targets.length === 0) {
    targets.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((el) => observer.observe(el));
  }

  // 横スクロールエリアの矢印ボタン
  document.querySelectorAll("[data-scroll-prev], [data-scroll-next]").forEach((btn) => {
    const targetId = btn.dataset.scrollPrev || btn.dataset.scrollNext;
    const track = document.getElementById(targetId);
    if (!track) return;
    const dir = btn.hasAttribute("data-scroll-prev") ? -1 : 1;
    btn.addEventListener("click", () => {
      track.scrollBy({ left: dir * 220, behavior: "smooth" });
    });
  });
});
