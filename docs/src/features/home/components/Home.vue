<script setup lang="ts">
import Layout from "../../../components/Layout.vue";
import Hero from "./Hero.vue";
import AboutExtended from "./AboutExtended.vue";
//import AboutSections from "../features/about/Sections.vue";
import Projects from "./Projects.vue";
import Contact from "./Contact.vue";
import Footer from "../../../components/Footer.vue";
import { defineAsyncComponent, ref, onMounted, onUnmounted, watchEffect, computed, watch } from "vue";
import HeaderHome from "../../../components/HeaderHome.vue";
import { preloaderVisible } from "../../../composables/usePreloader";
import gsap from "gsap";
import { useAgent } from "../../../composables/useAgent";
import { projectId, projectVisible } from "../../../composables/useRouteObserver";
import { isTransitioning } from "../../../composables/useProjectTransition";

const About = defineAsyncComponent(() => import("./About.vue"));

type SceneModules = {
  three: (typeof import("../../../three"))["three"];
  animations: (typeof import("../../../animations"))["animations"];
  raycast: (typeof import("../../../three/utils/raycast"))["raycast"];
  renderer: (typeof import("../../../three/core/renderer"))["renderer"];
};

let sceneModules: SceneModules | null = null;
const sceneIntentEvents = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown"] as const;

const introRef = ref<HTMLElement | null>(null);
const stickyObserver = ref<IntersectionObserver | null>(null);
const canvasObserver = ref<IntersectionObserver | null>(null);
const scrolledPastIntro = ref(false);
const canvasInView = ref(true);
const projectsLoaded = ref(false);
const contactRef = ref<HTMLElement | null>(null);
const contactBottom = ref<number>(0);
const aboutSpacerRef = ref<HTMLElement | null>(null);
const isHoveringObject3D = ref<boolean>(false);
const threeCanvasRef = ref<HTMLCanvasElement | null>(null);
const threeInitialized = ref<boolean>(false);
const sceneEnabled = ref(true);
let sceneScheduleId: number | null = null;
let startSceneListener: (() => void) | null = null;
const { isTouch } = useAgent();

const canUseEnhancedScene = (canvas: HTMLCanvasElement) => {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  try {
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

const scheduleSceneInitialization = (callback: () => void) => {
  if ("requestIdleCallback" in window) {
    return window.requestIdleCallback(callback, { timeout: 1200 });
  }
  return globalThis.setTimeout(callback, 150);
};

const removeSceneIntentListeners = () => {
  if (!startSceneListener) return;
  sceneIntentEvents.forEach((event) => window.removeEventListener(event, startSceneListener!));
  startSceneListener = null;
};

const updateRendererState = () => {
  sceneModules?.renderer.setIsActive(
    sceneEnabled.value &&
      threeInitialized.value &&
      canvasInView.value &&
      !projectVisible.value &&
      document.visibilityState === "visible",
  );
};

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  scrolledPastIntro.value = entries[0]?.isIntersecting ?? false;
};

const isStickyVisible = computed(() => {
  return scrolledPastIntro.value || !projectsLoaded.value;
});

const updateContactBottomOffset = () => {
  if (!contactRef.value) return;
  const bounding = contactRef.value.getBoundingClientRect();
  const documentBottom = document.documentElement.scrollHeight;
  const elementBottom = bounding.bottom + window.scrollY;
  // distance from bottom of document to bottom of contact section
  contactBottom.value = documentBottom - elementBottom;
};

watch([projectVisible, isTransitioning], () => {
  if (!projectVisible.value) {
    updateContactBottomOffset();
  }
});

watchEffect((onInvalidate) => {
  if (!contactRef.value || preloaderVisible.value) return;

  const resizeObserver = new ResizeObserver(updateContactBottomOffset);
  resizeObserver.observe(contactRef.value as HTMLElement);

  //const intersectionObserver = new IntersectionObserver(updateContactBottomOffset);
  //intersectionObserver.observe(contactRef.value as HTMLElement);

  onInvalidate(() => {
    resizeObserver.disconnect();
    //intersectionObserver.disconnect();
  });
});

const updateCursor = () => {
  if (isTouch.value) return;
  const hoveringBox = sceneModules?.raycast.getHoveringBox();
  const shouldBePointer = !!hoveringBox;

  if (shouldBePointer !== isHoveringObject3D.value) {
    isHoveringObject3D.value = shouldBePointer;
    document.documentElement.style.cursor = shouldBePointer ? "pointer" : "";
  }
};

onMounted(() => {
  stickyObserver.value = new IntersectionObserver(handleIntersection);
  stickyObserver.value.observe(introRef.value as HTMLElement);

  const canvas = threeCanvasRef.value;
  if (canvas) {
    sceneEnabled.value = canUseEnhancedScene(canvas);
    canvasObserver.value = new IntersectionObserver((entries) => {
      canvasInView.value = entries[0]?.isIntersecting ?? false;
      updateRendererState();
    });
    canvasObserver.value.observe(canvas);
  }

  if (canvas && sceneEnabled.value && !threeInitialized.value) {
    startSceneListener = () => {
      removeSceneIntentListeners();
      sceneScheduleId = scheduleSceneInitialization(async () => {
        const [threeModule, animationsModule, raycastModule, rendererModule] = await Promise.all([
          import("../../../three"),
          import("../../../animations"),
          import("../../../three/utils/raycast"),
          import("../../../three/core/renderer"),
        ]);
        sceneModules = {
          three: threeModule.three,
          animations: animationsModule.animations,
          raycast: raycastModule.raycast,
          renderer: rendererModule.renderer,
        };
        threeInitialized.value = await sceneModules.three.init(canvas);
        sceneEnabled.value = threeInitialized.value;
        updateRendererState();
        if (threeInitialized.value && !isTouch.value) gsap.ticker.add(updateCursor);
      });
    };
    sceneIntentEvents.forEach((event) => window.addEventListener(event, startSceneListener!, { passive: true }));
  }

  document.addEventListener("visibilitychange", updateRendererState);
});

onUnmounted(() => {
  stickyObserver.value?.disconnect();
  stickyObserver.value = null;
  canvasObserver.value?.disconnect();
  canvasObserver.value = null;
  removeSceneIntentListeners();

  if (sceneScheduleId !== null) {
    if ("cancelIdleCallback" in window) window.cancelIdleCallback(sceneScheduleId);
    else globalThis.clearTimeout(sceneScheduleId);
  }

  sceneModules?.three.destroy();

  document.documentElement.style.cursor = "";

  gsap.ticker.remove(updateCursor);
  document.removeEventListener("visibilitychange", updateRendererState);
  sceneModules?.animations.destroy();
  sceneModules = null;
});

const handleProjectsLoaded = () => {
  projectsLoaded.value = true;
};

watch([projectsLoaded, threeInitialized, preloaderVisible], ([loaded, initialized, preloader]) => {
  if (loaded && initialized && !preloader) sceneModules?.animations.init();
  else sceneModules?.animations.destroy();
});

watch(
  projectVisible,
  updateRendererState,
  { immediate: true },
);
</script>

<template>
  <div
    :class="[
      'home-wrapper',
      { 'home-wrapper-static': !sceneEnabled },
      typeof projectId === 'string' && isTransitioning && `home-wrapper-out`,
      typeof projectId !== 'string' && isTransitioning && `home-wrapper-in`,
    ]"
  >
    <HeaderHome v-if="projectsLoaded" />
    <Layout>
      <div class="intro-wrapper" ref="introRef">
        <div
          class="intro-sticky"
          :class="{ 'intro-sticky-visible': isStickyVisible }"
          :style="{ '--contact-bottom': `${contactBottom}px` }"
        >
          <canvas
            :class="['three-canvas', { 'three-canvas-contact': !isStickyVisible }]"
            ref="threeCanvasRef"
            :aria-hidden="true"
          ></canvas>
          <div v-if="threeInitialized" :class="{ 'intro-about-hidden': !isStickyVisible }">
            <About :spacer-ref="aboutSpacerRef" />
          </div>
        </div>
        <Hero class="intro-hero" id="hero" />
        <div class="intro-wrapper-spacer"></div>
      <div :class="['about-spacer', { 'about-spacer-static': !sceneEnabled }]" ref="aboutSpacerRef" id="about"></div>
    </div>
    <AboutExtended />
    <Projects id="projects" @loaded="handleProjectsLoaded" />
      <div ref="contactRef" class="home-contact">
        <Contact id="contact" v-if="projectsLoaded" :enhanced="sceneEnabled && threeInitialized" />
      </div>
      <Footer :withSocial="false"></Footer>
    </Layout>
  </div>
</template>

<style scoped lang="scss">
.three-canvas {
  width: calc(var(--svw) * 100);
  height: calc(var(--lvh) * 100);
  max-height: calc(var(--lvh) * 100);
  position: relative;
  overflow: hidden;

  &-contact {
    position: absolute;
    bottom: var(--contact-bottom);
    left: 0;
    width: 100%;
    height: calc(var(--lvh) * 100);
    max-height: calc(var(--lvh) * 100);
  }
}

.home {
  &-wrapper {
    transform-origin: center center;

    &-out {
      animation: home-wrapper-out var(--transition-route-duration) var(--transition-route-ease);
    }

    &-in {
      animation: home-wrapper-in var(--transition-route-duration) var(--transition-route-ease);
    }

    @keyframes home-wrapper-out {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.95);
      }
    }

    @keyframes home-wrapper-in {
      0% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }
  }

  &-contact {
    width: 100%;
    min-height: calc(var(--lvh) * 100);
  }
}

.about-spacer {
  max-height: calc(var(--lvh) * 250);
  min-height: calc(var(--lvh) * 250);

  &-static {
    min-height: 0;
    max-height: 0;
  }
}

.intro-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;

  &-spacer {
    display: none;

    @include mixins.mq("md") {
      display: block;
      height: 200px;
    }
  }
}

.intro-hero {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  max-height: calc(var(--lvh) * 100);
  min-height: calc(var(--lvh) * 100);
  overflow: hidden;
}

.intro-about-hidden {
  visibility: hidden;
}

.intro-sticky {
  top: 0;
  left: 0;
  width: 100%;
  max-height: calc(var(--lvh) * 100);
  min-height: calc(var(--lvh) * 100);
  overflow: hidden;
  z-index: 0;
  display: flex;
  align-items: flex-end;

  &-visible {
    position: sticky;
  }
}

.intro-sticky-content {
  width: calc(var(--svw) * 100);
  height: calc(var(--lvh) * 100);
  max-height: calc(var(--lvh) * 100);
  position: relative;
  overflow: hidden;

  &-contact {
    position: absolute;
    bottom: var(--contact-bottom);
    left: 0;
    width: 100%;
    height: calc(var(--lvh) * 100);
    max-height: calc(var(--lvh) * 100);
  }
}
</style>
