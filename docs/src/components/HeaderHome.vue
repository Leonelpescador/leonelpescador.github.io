<script setup lang="ts">
import HeaderLink from "./HeaderLink.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { t } from "../i18n/utils/translate";
import { scrollToTarget } from "../composables/useScroll";
import { useHeaderTheme } from "../composables/useHeaderTheme";
import { projectId } from "../composables/useRouteObserver";

type ActiveLink = "about" | "journey" | "education" | "projects" | "contact";
const activeLink = ref<ActiveLink | null>(null);
const sections: ActiveLink[] = ["about", "journey", "education", "projects", "contact"];
let frameId = 0;

const isMounted = ref(false);

const barStyle = ref({ transform: "" });
const ITEM_WIDTH = 124;

const { isDarkTheme, hasScrolledIntoView } = useHeaderTheme();

const updateBarPosition = () => {
  const index = sections.indexOf(activeLink.value as ActiveLink);
  const left = index * ITEM_WIDTH;
  barStyle.value = {
    transform: `translateX(${left}px)`,
  };
};

const updateActiveLink = () => {
  frameId = 0;
  const marker = window.innerHeight * 0.25;
  const nextActive = [...sections].reverse().find((section) => {
    const element = document.getElementById(section);
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.top <= marker && rect.bottom > marker;
  }) ?? null;

  if (nextActive !== activeLink.value) {
    activeLink.value = nextActive;
    updateBarPosition();
  }
};

const scheduleActiveLinkUpdate = () => {
  if (!frameId) frameId = requestAnimationFrame(updateActiveLink);
};

const handleLinkClick = (section: ActiveLink) => {
  activeLink.value = section;
  updateBarPosition();
  scrollToTarget(`#${section}`);
};

onMounted(() => {
  window.addEventListener("scroll", scheduleActiveLinkUpdate, { passive: true });
  window.addEventListener("resize", scheduleActiveLinkUpdate);
  scheduleActiveLinkUpdate();
  isMounted.value = true;
});

onUnmounted(() => {
  window.removeEventListener("scroll", scheduleActiveLinkUpdate);
  window.removeEventListener("resize", scheduleActiveLinkUpdate);
  if (frameId) cancelAnimationFrame(frameId);
});
</script>

<template>
  <div :class="['header-home', { 'header-home-mounted': isMounted, 'header-home-isProjectPage': projectId !== null }]">
    <nav :class="['header-home-links', { 'header-home-links-dark': isDarkTheme }]" :aria-label="t('primary-navigation')">
      <div
        :class="[
          'header-home-bar',
          { 'header-home-bar-active': activeLink !== null && hasScrolledIntoView, 'header-home-bar-dark': isDarkTheme },
        ]"
        :style="barStyle"
      ></div>
      <HeaderLink
        v-for="section in sections"
        :key="section"
        :is-active="activeLink === section"
        :class="[
          'header-home-link',
          { 'header-home-link-active': activeLink === section && hasScrolledIntoView },
          'children-unclickable',
        ]"
        @click="handleLinkClick(section)"
        :is-dark-theme="isDarkTheme"
        :aria-label="t(section)"
        :aria-current="activeLink === section ? 'location' : undefined"
        data-sound="click"
        data-hoversound="hover"
      >
        {{ t(section) }}
      </HeaderLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.header-home {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-index-header-home);
  height: var(--height-header);
  align-items: center;
  justify-content: center;
  display: none;
  opacity: 0;
  transition:
    opacity 0.3s ease-in-out,
    transform var(--transition-route-duration) var(--transition-route-ease);

  &-isProjectPage {
    transform: translateX(-50%) translateY(-100%);
  }

  &-mounted {
    opacity: 1;
  }

  @include mixins.mq("lg") {
    display: flex;
  }

  &-links {
    position: relative;
    display: flex;
    padding: 3px;
    background-color: var(--color-beige-500);
    border-radius: 100px;
    color: var(--color-text-400);
    transition:
      color 0.1s ease-in-out,
      background-color 0.1s ease-in-out;

    &-dark {
      background-color: var(--color-dark-blue-500);
      color: var(--color-white-400);
    }
  }

  &-bar {
    position: absolute;
    top: 3px;
    left: 3px;
    height: calc(100% - 6px);
    width: 124px;
    background: var(--color-orange-400);
    border-radius: 100px;
    transition:
      transform 0.3s var(--ease-smooth),
      opacity 0.1s ease-in-out,
      background-color 0.1s ease-in-out;
    z-index: 1;
    opacity: 0;

    &-dark {
      background-color: var(--color-cyan-500);
    }

    &-active {
      opacity: 1;
    }
  }

  &-link {
    position: relative;
    z-index: 2;
    letter-spacing: 0.02em;
    font-weight: 700;
    border: none;
    background: none;
    transition: color 0.1s ease-in-out;
    font-size: var(--font-size-sm);
    width: 124px;
    white-space: nowrap;
    text-transform: uppercase;

    &-active {
      color: var(--color-white-400);
    }
  }
}
</style>
