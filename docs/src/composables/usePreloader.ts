import { ref, onMounted } from "vue";
import gsap from "gsap";

export const preloaderVisible = ref(true);

export const usePreloader = () => {
  onMounted(() => {
    const rect = document.querySelector<SVGRectElement>(".preloader-rect");
    const preloader = document.querySelector<HTMLElement>(".preloader");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = () => {
      document.body.classList.remove("is-loading");
      preloader?.classList.add("preloader-hidden");
      preloaderVisible.value = false;
    };

    if (!rect || reduceMotion) {
      reveal();
      return;
    }

    gsap.to(rect, {
      scaleY: 1,
      transformOrigin: "bottom",
      duration: 0.35,
      ease: "power2.out",
      onComplete: reveal,
    });
  });
};
