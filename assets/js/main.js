(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- GA4 conversion events (Agendar, Assinar V Club, Ligar) ----------
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-gtag-event]") : null;
    if (!el || typeof window.gtag !== "function") return;
    window.gtag("event", el.getAttribute("data-gtag-event"), {
      event_label: el.getAttribute("data-gtag-label") || "",
      page_location: window.location.href,
    });
  });

  // ---------- Mobile nav drawer ----------
  var toggle = document.getElementById("navToggle");
  var drawer = document.getElementById("mobileNav");
  var backdrop = document.getElementById("navBackdrop");

  if (toggle && drawer && backdrop) {
    var openDrawer = function () {
      drawer.classList.add("is-open");
      backdrop.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
      document.body.classList.add("nav-open");
    };
    var closeDrawer = function () {
      drawer.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("nav-open");
    };

    toggle.addEventListener("click", function () {
      if (drawer.classList.contains("is-open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
    backdrop.addEventListener("click", closeDrawer);
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeDrawer);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
  }

  // ---------- Hero parallax (background-position, avoids fighting the CSS scale animation) ----------
  var heroMedia = document.querySelector(".hero-media");
  if (heroMedia && !prefersReduced) {
    var ticking = false;
    var updateParallax = function () {
      var hero = document.querySelector(".hero");
      if (!hero) return;
      var rect = hero.getBoundingClientRect();
      var progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
      var posY = 30 + progress * 16; // drifts from 30% to 46%
      heroMedia.style.backgroundPosition = "center " + posY + "%";
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // ---------- Scroll parallax on photos (about + team) — à la barbeariatorres.com.br ----------
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  if (parallaxEls.length && !prefersReduced) {
    var pxTicking = false;
    var updatePhotoParallax = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      parallaxEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var center = rect.top + rect.height / 2;
        var progress = (center - vh / 2) / vh; // ~ -0.5..0.5 while crossing the viewport
        var speed = parseFloat(el.getAttribute("data-parallax")) || 10;
        var offset = Math.max(Math.min(progress * -speed * 2, speed), -speed); // clamped px
        el.style.setProperty("--py", offset.toFixed(1) + "px");
      });
      pxTicking = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!pxTicking) {
          window.requestAnimationFrame(updatePhotoParallax);
          pxTicking = true;
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", updatePhotoParallax);
    updatePhotoParallax();
  }

  // ---------- Gallery reel — auto-scrolls, pauses on interaction, drag/swipe to browse ----------
  var reel = document.querySelector(".gallery-reel");
  if (reel) {
    var track = reel.querySelector(".reel-track");
    var setWidth = 0;

    var measureReel = function () {
      var count = parseInt(track.getAttribute("data-count") || "0", 10);
      if (!count || !track.children.length) return;
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      var w = 0;
      for (var i = 0; i < count; i++) {
        w += track.children[i].getBoundingClientRect().width + gap;
      }
      setWidth = w;
    };
    window.addEventListener("load", measureReel);
    window.addEventListener("resize", measureReel);
    measureReel();

    // Manual drag (mouse) — native touch scroll already works via overflow-x:auto.
    var isDown = false, startX = 0, startScroll = 0, dragged = false;
    reel.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return; // let native touch scrolling handle it
      isDown = true;
      dragged = false;
      startX = e.clientX;
      startScroll = reel.scrollLeft;
      reel.setPointerCapture(e.pointerId);
    });
    reel.addEventListener("pointermove", function (e) {
      if (!isDown) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 3) dragged = true;
      reel.scrollLeft = startScroll - dx;
    });
    reel.addEventListener("pointerup", function () {
      isDown = false;
    });
    reel.addEventListener("click", function (e) {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    var paused = false;
    var resumeTimer = null;
    var pauseReel = function () {
      paused = true;
      clearTimeout(resumeTimer);
    };
    var scheduleResume = function () {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () {
        paused = false;
      }, 1600);
    };
    reel.addEventListener("mouseenter", pauseReel);
    reel.addEventListener("mouseleave", scheduleResume);
    reel.addEventListener("pointerdown", pauseReel);
    reel.addEventListener("pointerup", scheduleResume);
    reel.addEventListener("touchstart", pauseReel, { passive: true });
    reel.addEventListener("touchend", scheduleResume);
    reel.addEventListener("focusin", pauseReel);
    reel.addEventListener("focusout", scheduleResume);

    if (!prefersReduced) {
      var reelSpeed = 0.5; // px per frame
      var tickReel = function () {
        if (!paused && setWidth > 0) {
          reel.scrollLeft += reelSpeed;
          if (reel.scrollLeft >= setWidth) {
            reel.scrollLeft -= setWidth;
          }
        }
        window.requestAnimationFrame(tickReel);
      };
      window.requestAnimationFrame(tickReel);
    }
  }

  // ---------- Magnetic glow on primary CTAs (pointer:fine only) ----------
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".btn-magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var mx = ((e.clientX - rect.left) / rect.width) * 100;
        var my = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty("--mx", mx + "%");
        btn.style.setProperty("--my", my + "%");
      });
    });
  }

  // ---------- Scroll reveal + count-up ----------
  var els = document.querySelectorAll("[data-reveal]");
  var counters = document.querySelectorAll("[data-count-to]");

  var formatCount = function (el, value) {
    var decimals = parseInt(el.getAttribute("data-count-decimals") || "0", 10);
    var prefix = el.getAttribute("data-count-prefix") || "";
    var suffix = el.getAttribute("data-count-suffix") || "";
    var formatted = value.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return prefix + formatted + suffix;
  };

  var runCountUp = function (el) {
    var target = parseFloat(el.getAttribute("data-count-to"));
    if (isNaN(target)) return;
    if (prefersReduced) {
      el.textContent = formatCount(el, target);
      return;
    }
    var duration = 1300;
    var start = null;
    var step = function (ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatCount(el, target * eased);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = formatCount(el, target);
      }
    };
    window.requestAnimationFrame(step);
  };

  if (els.length || counters.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      counters.forEach(runCountUp);
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            if (entry.target.hasAttribute("data-reveal")) {
              entry.target.classList.add("is-visible");
            }
            if (entry.target.hasAttribute("data-count-to")) {
              runCountUp(entry.target);
            }
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach(function (el) {
        io.observe(el);
      });
      counters.forEach(function (el) {
        io.observe(el);
      });
    }
  }
})();
