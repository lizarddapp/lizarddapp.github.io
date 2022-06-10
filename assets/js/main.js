/**
 * Template Name: Ninestars - v4.7.0
 * Template URL: https://bootstrapmade.com/ninestars-free-bootstrap-3-theme-for-creative/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Clients Slider
   */
  new Swiper(".clients-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();

var lands = $(".land");
var timer;
$(document)
  .on("mouseenter", ".land", function (e) {
    timer = setTimeout(() => {
      moveRight(e);
    }, 250);
  })
  .on("mouseout", function () {
    clearTimeout(timer);
  });
const initialPos = 11;
let pos = initialPos;

const stepWidth = 25;
function moveRight(e) {
  const step = e.target.id;
  let nextPos = initialPos + stepWidth * (step - 1);

  $("#piece").animate(
    { left: `${nextPos}%` },
    {
      duration: 800,
      specialEasing: {
        width: "linear",
        height: "easeOutBounce",
      },
    }
  );
  const bbx = $(`#${step}.bubble-box`);

  const landIds = [1, 2, 3, 4];
  const hideIds = landIds.filter((el) => el != step);

  $(`#${step}.bubble-box`).animate({ opacity: 1 }, 300, "easeOutBounce");
  hideIds.map((el) =>
    $(`#${el}.bubble-box`).animate({ opacity: 0 }, 300, "easeOutBounce")
  );
}
function stopAnimate() {
  $(`.bubble-box`).stop();
}

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChange: function () {
      const index_currentSlide = swiper.realIndex;
      // $(".bubble-box-mobile").fadeOut(function () {
      //   $(".bubble-box-mobile").fadeIn();
      // });
      const roadmapContent = [
        `<h4 class="title">Phase 1</h4>
                <ol>
                  <li>Whitepaper published</li>
                  <li>Building community</li>
                  <li>Gameplay proposal</li>
                  <li>Testnet prototype (Profile, Guilds & Pieces NFTs)</li>
                  <li>Branding</li>
                </ol>`,
        ` <h4 class="title">Phase 2</h4>
                <ol>
                  <li>NFT Arts & Game graphics</li>
                  <li>Mainnet launch (Presale Pieces & Guilds)</li>
                  <li>Minting NFT (Piece)</li>
                  <li>NFT marketplace listing</li>
                  <li>Complete gameplay proposal with details</li>
                </ol>`,
        `<h4 class="title">Phase 3</h4>
                <ol>
                  <li>Provide SAPPHIRE initial liquidity for Piece holder</li>
                  <li>Partnership with multiple DEXes (Liquidity Mining)</li>
                  <li>In-game NFT Marketplace.</li>
                  <li>SAPPHIRE token launch.</li>
                </ol>`,
        `<h4 class="title">Phase 4</h4>
                <ol>
                  <li>Capturing</li>
                  <li>Pieces & Guilds Battle (Testnet & Mainnet)</li>
                  <li>More partnership</li>
                </ol>`,
      ];
      $(".bubble-box-mobile").addClass("bubble-box-mobile-hide");
      setTimeout(function () {
        $(".bubble-box-mobile").removeClass("bubble-box-mobile-hide");
        $(".bubble-box-mobile").html(roadmapContent[index_currentSlide]);
      }, 500);
    },
  },
});
