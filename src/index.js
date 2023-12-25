function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

gsap.to("#page", {
  scrollTrigger: {
    trigger: "#page",
    start: "top top",
    end: "bottom top",
    scroller: "#main",
    pin: true,
  },
  // ease: "power1.out"
});

gsap.to("#page-intro", {
  autoAlpha: 0,
  scrollTrigger: {
    trigger: "#main",
    start: "2% top",
    end: "bottom bottom",
    scroller: "#main",
  },
});

gsap.to("#page>div>img", {
  width: "50%",
  duration: 1.5,
  scrollTrigger: {
    trigger: "#main",
    start: "0.5% top",
    end: "bottom bottom",
    scroller: "#main",
  },
  onComplete: () => {
    document.getElementById("banner").style.display = "none";
  }
});

gsap.to("#banner-video", {
  delay: 1.2,
  scrollTrigger: {
    trigger: "#main",
    start: "1% top",
    end: "bottom bottom",
    scroller: "#main",
  },
  onStart: () => {
    document.getElementById("banner-video").play();
  }
});

let tl = gsap.timeline();

tl.to("#page", {
  scrollTrigger: {
    trigger: "#page",
    start: "4% top",
    end: "bottom bottom",
    scroller: "#main",
  },
  onStart: () => {
    document.getElementById("page").style.filter = "brightness(80%)";
  }
});

tl.to("#page", {
  scrollTrigger: {
    trigger: "#page",
    start: "8% top",
    end: "bottom bottom",
    scroller: "#main",
  },
  onStart: () => {
    document.getElementById("page").style.filter = "brightness(50%)";
  },
});

// gsap.to("#page>div>img", {
//   width: "85%",
//   delay: 3,
//   duration: 1
// });

// gsap.to("#page", {
//   delay: 2,
//   scrollTrigger: {
//     trigger: "#main",
//     start: "0.5% top",
//     end: "bottom bottom",
//     scroller: "#main",
//   },
//   onStart: () => {
//     document.getElementById("banner").display = "none";
//   }
// });

// window.addEventListener("scroll", function () {
//   var nav = document.querySelector("#sticky-nav");

//   if (window.scrollY >= 44) {
//     nav.classList.add("sticky-nav");
//   } else {
//     nav.classList.remove("sticky-nav");
//   }
// });
