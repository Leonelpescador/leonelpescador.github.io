<!--
THESIS: El portfolio es un recorrido de entrega técnica, no una colección de métricas ni tarjetas equivalentes.
OWN-WORLD: Papel cálido para la evidencia; azul profundo, cian y escena 3D para los momentos inmersivos.
STORY: Entender el perfil, recorrer la trayectoria, comprobar cuatro casos y cerrar con una conversación.
FIRST VIEWPORT: Nombre, especialidad, propuesta concreta y dos acciones sobre la escena 3D; sin grilla de cifras.
FORM: Secuencia de proyectos de problema a producción, cuarta dirección estructural; seed 6ab7fc45.
-->
<script setup lang="ts">
import Layout from "../../../components/Layout.vue";
import Hero from "./Hero.vue";
import AboutExtended from "./AboutExtended.vue";
//import AboutSections from "../features/about/Sections.vue";
import Projects from "./Projects.vue";
import Contact from "./Contact.vue";
import Footer from "../../../components/Footer.vue";
import { defineAsyncComponent, ref, onMounted, onUnmounted, computed, watch } from "vue";
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

const introRef = ref<HTMLElement | null>(null);
const stickyObserver = ref<IntersectionObserver | null>(null);
const canvasObserver = ref<IntersectionObserver | null>(null);
const scrolledPastIntro = ref(true);
const introInView = ref(true);
const contactInView = ref(false);
const canvasInView = ref(true);
const contactRef = ref<HTMLElement | null>(null);
const aboutSpacerRef = ref<HTMLElement | null>(null);
const isHoveringObject3D = ref<boolean>(false);
const threeCanvasRef = ref<HTMLCanvasElement | null>(null);
const threeInitialized = ref<boolean>(false);
const sceneEnabled = ref(true);
let sceneScheduleId: number | null = null;
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
  return scrolledPastIntro.value;
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
      entries.forEach((entry) => {
        if (entry.target === introRef.value) introInView.value = entry.isIntersecting;
        if (entry.target === contactRef.value) contactInView.value = entry.isIntersecting;
      });
      canvasInView.value = introInView.value || contactInView.value;
      updateRendererState();
    });
    canvasObserver.value.observe(introRef.value as HTMLElement);
    canvasObserver.value.observe(contactRef.value as HTMLElement);
  }

  if (canvas && sceneEnabled.value && !threeInitialized.value) {
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
      sceneScheduleId = null;
      updateRendererState();
      if (threeInitialized.value && !isTouch.value) gsap.ticker.add(updateCursor);
    });
  }

  document.addEventListener("visibilitychange", updateRendererState);
});

onUnmounted(() => {
  stickyObserver.value?.disconnect();
  stickyObserver.value = null;
  canvasObserver.value?.disconnect();
  canvasObserver.value = null;
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

watch([threeInitialized, preloaderVisible], ([initialized, preloader]) => {
  if (initialized && !preloader) sceneModules?.animations.init();
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
    <Layout>
      <div class="intro-wrapper" ref="introRef">
        <div
          class="intro-sticky"
          :class="{ 'intro-sticky-visible': isStickyVisible }"
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
    <Projects id="projects" />
      <div ref="contactRef" class="home-contact">
        <Contact id="contact" :enhanced="sceneEnabled && threeInitialized" />
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
    position: fixed;
    top: 0;
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
