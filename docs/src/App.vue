<script setup lang="ts">
import Header from "./components/Header.vue";
import { defineAsyncComponent, nextTick, watch } from "vue";
import { useTranslations } from "./i18n/composables/useTranslations";
import { usePreloader } from "./composables/usePreloader";
import Cursor from "./components/Cursor.vue";
import { useAgent } from "./composables/useAgent";
import { useMusic } from "./features/sounds/composables/useMusic";
import { useHowler } from "./features/sounds/composables/useHowler";
import { useRouteObserver } from "./composables/useRouteObserver";
import Home from "./features/home/components/Home.vue";
import { useProjectTransition } from "./composables/useProjectTransition";
import { useScroll } from "./composables/useScroll";
import { projectVisible } from "./composables/useRouteObserver";
import { useClickSound } from "./features/sounds/composables/useClickSounds";
import { t } from "./i18n/utils/translate";
//import { useHoverSound } from "./features/sounds/composables/useHoverSounds";

const { isTransitioning } = useProjectTransition();
const Project = defineAsyncComponent(() => import("./features/projects/components/Project.vue"));
const ProjectBackground = defineAsyncComponent(() => import("./features/projects/components/ProjectBackground.vue"));

useTranslations();
usePreloader();
useMusic();
useHowler();
useScroll();
useRouteObserver();
useClickSound();
//useHoverSound();
const { isTouch } = useAgent();

watch(projectVisible, async () => {
  await nextTick();
  document.querySelector<HTMLElement>(projectVisible.value ? ".project-hero-title" : "#main-content")?.focus();
});
</script>

<template>
  <a class="skip-link" href="#main-content">{{ t("skip-to-content") }}</a>
  <Header />

  <main id="main-content" tabindex="-1">
    <!-- main page -->
    <div :class="{ 'home-wrapper-projectIsReady': projectVisible }" :aria-hidden="projectVisible">
      <Home />
    </div>

    <!-- overlay page -->
    <ProjectBackground v-if="projectVisible || isTransitioning" />
    <div
      class="project-wrapper"
      :aria-hidden="!projectVisible"
      :class="{
        'project-wrapper-visible': projectVisible,
        'project-wrapper-transitioning': isTransitioning,
      }"
    >
      <div class="project-content">
        <Project v-if="projectVisible || isTransitioning" />
      </div>
    </div>
  </main>

  <Cursor v-if="!isTouch" />
</template>

<style lang="scss">
.home-wrapper-projectIsReady {
  visibility: hidden;
  position: fixed;
  inset: 0;
}

.project-wrapper {
  position: fixed; /* <-- key */
  inset: 0;
  overflow: hidden; /* new page must NOT scroll during transition */
  z-index: var(--z-index-layout-project);
  visibility: hidden;
  pointer-events: none; /* avoid interaction before fully opened */

  &-visible {
    visibility: visible;
    pointer-events: auto;
    position: static;
  }
}

.project-content {
  width: 100%;
  height: 100%;
  overflow: hidden; /* ensure no scroll container */
}
</style>
