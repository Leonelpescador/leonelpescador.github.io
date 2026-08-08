<script setup lang="ts">
import HeaderLink from "./HeaderLink.vue";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { t } from "../i18n/utils/translate";
import { translations } from "../i18n/store";
import { scrollToTarget } from "../composables/useScroll";
import { projectId } from "../composables/useRouteObserver";

const props = defineProps<{
  isDarkTheme: boolean;
  hasScrolledIntoView: boolean;
}>();

type ActiveLink = "about" | "skills" | "journey" | "education" | "projects" | "contact";
const activeLink = ref<ActiveLink | null>(null);
const sections: ActiveLink[] = ["about", "skills", "journey", "education", "projects", "contact"];
let frameId = 0;
let resizeObserver: ResizeObserver | null = null;

const isMounted = ref(false);
const navRef = ref<HTMLElement | null>(null);

const barStyle = ref({ transform: "translateX(0)", width: "0px" });

const updateBarPosition = () => {
  if (!activeLink.value || !navRef.value) return;

  const activeElement = navRef.value.querySelector<HTMLElement>(`[data-section="${activeLink.value}"]`);
  if (!activeElement) return;

  barStyle.value = {
    transform: `translateX(${activeElement.offsetLeft - 3}px)`,
    width: `${activeElement.offsetWidth}px`,
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

  if (nextActive !== activeLink.value) activeLink.value = nextActive;
  updateBarPosition();
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
  resizeObserver = new ResizeObserver(updateBarPosition);
  if (navRef.value) resizeObserver.observe(navRef.value);
  scheduleActiveLinkUpdate();
  isMounted.value = true;
});

watch(translations, () => nextTick(updateBarPosition));

onUnmounted(() => {
  window.removeEventListener("scroll", scheduleActiveLinkUpdate);
  window.removeEventListener("resize", scheduleActiveLinkUpdate);
  resizeObserver?.disconnect();
  resizeObserver = null;
  if (frameId) cancelAnimationFrame(frameId);
});
</script>

<template>
  <div :class="['header-home', { 'header-home-mounted': isMounted, 'header-home-isProjectPage': projectId !== null }]">
    <nav
      ref="navRef"
      :class="['header-home-links', { 'header-home-links-dark': props.isDarkTheme }]"
      :aria-label="t('primary-navigation')"
    >
      <div
        :class="[
          'header-home-bar',
          {
            'header-home-bar-active': activeLink !== null && props.hasScrolledIntoView,
            'header-home-bar-dark': props.isDarkTheme,
          },
        ]"
        :style="barStyle"
      ></div>
      <HeaderLink
        v-for="section in sections"
        :key="section"
        :is-active="activeLink === section"
        :class="[
          'header-home-link',
          { 'header-home-link-active': activeLink === section && props.hasScrolledIntoView },
          'children-unclickable',
        ]"
        @click="handleLinkClick(section)"
        :is-dark-theme="props.isDarkTheme"
        :aria-label="t(section)"
        :aria-current="activeLink === section ? 'location' : undefined"
        :data-section="section"
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

  @include mixins.mq("xl") {
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
    width: 0;
    background: var(--color-orange-400);
    border-radius: 100px;
    transition:
      transform 0.3s var(--ease-smooth),
      width 0.3s var(--ease-smooth),
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
    width: auto;
    min-width: 96px;
    padding-inline: var(--space-md);
    white-space: nowrap;
    text-transform: uppercase;

    &-active {
      color: var(--color-white-400);
    }
  }
}
</style>
