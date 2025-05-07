function initArrowScroll() {
  const scrollBtn = document.getElementById("scroll-button");
  const target = document.getElementById("introduction");
  if (scrollBtn && target) {
    scrollBtn.addEventListener("click", function () {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 0 },
        duration: 1,
        ease: "power2.inOut",
      });
    });
  }
}

// ナビゲーション表示アニメーション
function initNavbar() {
  const $nav = document.querySelector(".navigation");
  if (!$nav) return;
  gsap.set($nav, { y: -60, opacity: 0 });
  gsap.to($nav, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    delay: 0.4,
    ease: "power2.inOut",
  });
}

// スクロールによるナビ透明切り替え
function updateNavTransparency() {
  const nav = document.querySelector(".navigation");
  const section = document.getElementById("top-banner");
  const offset = 200;
  if (!nav || !section) return;

  const scrollPos = window.scrollY;
  const sectionTop = section.offsetTop - offset;
  const sectionBottom = sectionTop + section.offsetHeight;

  if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
    nav.classList.add("transparent");
  } else {
    nav.classList.remove("transparent");
  }
}

function initNavTransparency() {
  window.removeEventListener("scroll", updateNavTransparency); // 重複防止
  window.addEventListener("scroll", updateNavTransparency);
  // ちらつき防止のために少し遅延して初期実行
  setTimeout(updateNavTransparency, 80);
}

// ハンバーガーメニューのトグル
function initMenuToggle() {
  const toggleBtn = document.getElementById("toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      this.classList.toggle("active");
      document.getElementById("overlay")?.classList.toggle("open");
    });
  }
}

function initSlider() {
  const $slider = $("#slider");
  if ($slider.length === 0) return;

  const delay = 4500;
  const fadeSpeed = 600;
  let timerId;

  $slider.off("mouseenter mouseleave"); // 重複バインド防止

  $slider.hover(
    function () {
      const $slides = $slider.find("#slideList li");
      const $progress = $slider.find("#progressBar");
      const slideCount = $slides.length;
      let imgNo = 0;

      $slides.hide().eq(0).show();
      $progress.stop(true, true).css("width", 0).show().animate({ width: "100%" }, delay, "linear");

      timerId = setInterval(function () {
        $slides.eq(imgNo).fadeOut(fadeSpeed, function () {
          imgNo = (imgNo + 1) % slideCount;
          $slides.eq(imgNo).fadeIn(fadeSpeed);
        });

        $progress.stop(true, true).css("width", 0).animate({ width: "100%" }, delay, "linear");
      }, delay);
    },
    function () {
      clearInterval(timerId);
      const $slides = $slider.find("#slideList li");
      const $progress = $slider.find("#progressBar");

      $progress.stop(true, true).hide().css("width", 0);
      $slides.stop(true, true).fadeOut(fadeSpeed).eq(0).fadeIn(fadeSpeed);
    }
  );
}

// すべての初期化関数をまとめて呼ぶ
function initAllScripts() {
  initNavbar();
  initArrowScroll();
  initNavTransparency();
  initMenuToggle();
  initSlider();
}

// --------------------------
// Barba.js 初期化
// --------------------------
const progressBar = {
  el: document.getElementById("progress-bar"),
  start() {
    this.el.style.width = "0%";
    this.el.style.display = "block";
    gsap.to(this.el, { width: "100%", duration: 1, ease: "none" });
  },
  finish() {
    gsap.to(this.el, {
      width: "100%",
      duration: 0.2,
      onComplete: () => {
        gsap.to(this.el, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            this.el.style.display = "none";
            this.el.style.opacity = 1;
          },
        });
      },
    });
  },
};

if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

barba.init({
  transitions: [
    {
      name: "slide-up",
      sync: true,
      leave({ current, next }) {
        progressBar.start();
        const done = this.async();
        const scrollY = window.scrollY;

        gsap.set(current.container, {
          position: "fixed",
          top: -scrollY,
          width: "100%",
          zIndex: 10,
        });
        gsap.set(next.container, {
          position: "fixed",
          top: window.innerHeight,
          width: "100%",
          zIndex: 100,
        });

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set([current.container, next.container], {
              clearProps: "all",
            });
            progressBar.finish();
            done();
          },
        });

        tl.to(
          current.container,
          {
            top: -scrollY - window.innerHeight * 0.25,
            duration: 1.2,
            ease: "power2.inOut",
          },
          0
        );

        tl.to(
          next.container,
          {
            top: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          0
        );

        return tl;
      },
      afterEnter() {
        setTimeout(() => {
          initAllScripts();
        }, 80);
      },
    },
  ],
});

document.addEventListener("DOMContentLoaded", () => {
  initAllScripts();
});
