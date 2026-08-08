import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { isTransitioning } from "./useProjectTransition";

export const lenis = ref<Lenis | null>(null);
export const projectLenis = ref<Lenis | null>(null);
export const velocity = ref(0);

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getNavigationOffset = () => {
  const headerHeight = document.querySelector<HTMLElement>("header")?.getBoundingClientRect().height ?? 0;
  return -(headerHeight + 16);
};

export const scrollToTarget = (target: string | number | HTMLElement) => {
  if (lenis.value && !prefersReducedMotion()) {
    lenis.value.scrollTo(target, { offset: typeof target === "number" ? 0 : getNavigationOffset() });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    return;
  }

  const element = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY + getNavigationOffset();
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
};

const handleScroll = () => {
  ScrollTrigger.update();
};

export const useScroll = () => {
  const tick = (time: number) => {
    const instance = lenis.value;
    if (!instance) return;

    if (instance.isScrolling === "smooth" && Math.abs(instance.velocity) > 0) {
      velocity.value = Math.min(Math.abs(instance.velocity * 0.75) || 0, 1);
    }

    instance.raf(time * 1000);
  };

  const createNewLenis = () => {
    if (lenis.value) {
      lenis.value.destroy();
      lenis.value.off("scroll", handleScroll);
    }

    lenis.value = new Lenis({
      lerp: 0.08,
    });

    lenis.value.on("scroll", handleScroll);
  };

  onMounted(() => {
    if (prefersReducedMotion()) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return;
    }

    createNewLenis();
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  });

  watch(isTransitioning, (newIsTransitioning) => {
    if (newIsTransitioning) {
      lenis.value?.stop();
      ScrollTrigger.clearScrollMemory();
    } else {
      lenis.value?.start();
      ScrollTrigger.update();
    }
  });

  onUnmounted(() => {
    gsap.ticker.remove(tick);
    window.removeEventListener("scroll", handleScroll);
    lenis.value?.off("scroll", handleScroll);
    lenis.value?.destroy();
    lenis.value = null;
  });
};
