<script setup lang="ts">
import Button from "./Button.vue";
import Logo from "./Logo.vue";
import HeaderLink from "./HeaderLink.vue";
import { computed, ref, watch } from "vue";
import { t } from "../i18n/utils/translate";
import { useHeaderTheme } from "../composables/useHeaderTheme";
import { lenis } from "../composables/useScroll";
import { projectId } from "../composables/useRouteObserver";
import ButtonRound from "./ButtonRound.vue";
import ArrowRight from "./icons/ArrowRight.vue";
import SoundsToggle from "./SoundsToggle.vue";
import { isFeatureEnabled } from "../utils/features";
import { useRouter } from "../composables/useRouter";
import { useFirstRoute } from "../composables/useFirstRoute";

const router = useRouter();
const { isFirstRoute } = useFirstRoute();

const scrolledPastHeroVisible = ref(false);
const { isDarkTheme } = useHeaderTheme({
  onUpdate: (element, boundingClientRect, hasScrolledIntoView) => {
    if (!element || !boundingClientRect) {
      scrolledPastHeroVisible.value = false;
      return;
    }

    if (hasScrolledIntoView) {
      scrolledPastHeroVisible.value = true;
    } else {
      scrolledPastHeroVisible.value = false;
    }
  },
});

const isMenuOpen = ref(false);

const navItems = [
  { id: "about", label: t("about") },
  { id: "journey", label: t("journey") },
  { id: "education", label: t("education") },
  { id: "projects", label: t("projects") },
  { id: "contact", label: t("contact") },
];

const handleBackClick = () => {
  // If it's the first route the user visited, navigate to home
  // Otherwise, go back in browser history
  if (isFirstRoute.value) {
    router.push("/");
  } else {
    router.back();
  }
};

const handleLogoClick = () => {
  closeMenu();
  if (!lenis.value) return;
  lenis.value.scrollTo(0);
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleNavClick = (target: string) => {
  closeMenu();
  if (!lenis.value) return;
  lenis.value.scrollTo("#" + target);
};

watch(isMenuOpen, (open) => {
  if (open) {
    document.documentElement.classList.add("menu-open");
  } else {
    document.documentElement.classList.remove("menu-open");
  }
});

const classNames = computed(() => {
  return {
    header: true,
    "header-dark": isDarkTheme.value,
    "header-scrolled": scrolledPastHeroVisible.value,
    [`project-${projectId.value}`]: projectId.value !== null,
  };
});

const getInTouchClassNames = computed(() => {
  return {
    "header-get-in-touch": true,
    "header-get-in-touch-isProjectPage": projectId.value !== null,
  };
});
</script>

<template>
  <header :class="classNames">
    <div class="header-left">
      <ButtonRound
        v-if="projectId !== null"
        variant="accent"
        @click="handleBackClick"
        :aria-label="t('back-to-home')"
        :class="{ 'header-back': true, 'header-back-isProjectPage': projectId !== null }"
        data-cursor="circle-white"
        data-sound="click"
        data-hoversound="hover"
      >
        <ArrowRight class="header-back-icon" />
      </ButtonRound>
    </div>
    <div
      :class="{
        'header-logo': true,
        'header-logo-isProjectPage': projectId !== null,
        'header-logo-clickable': scrolledPastHeroVisible,
        'children-unclickable': true,
      }"
      @click="handleLogoClick"
      data-sound="click"
      data-hoversound="hover"
      data-cursor="circle-white"
    >
      <Logo class="header-logo-image" />
    </div>
    <div class="header-right">
      <Button
        renderAs="a"
        variant="accent"
        :aria-label="t('download-cv')"
        href="/static/media/pdfs/Pescador_Jesus_Leonel_CV.pdf"
        download="Pescador_Jesus_Leonel_CV.pdf"
        :class="getInTouchClassNames"
        data-cursor="circle-white"
        data-hoversound="hover"
        >{{ t("download-cv") }}</Button
      >
      <SoundsToggle class="header-sounds-toggle" :isDarkTheme="isDarkTheme" v-if="isFeatureEnabled('sounds')" />
      <button
        class="header-menu-toggle"
        :class="{ 'header-menu-toggle-open': isMenuOpen }"
        @click="toggleMenu"
        :aria-label="isMenuOpen ? t('close-menu') : t('open-menu')"
        :aria-expanded="isMenuOpen"
        data-cursor="circle-white"
        data-sound="click"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div
      class="header-mobile-menu"
      :class="{ 'header-mobile-menu-open': isMenuOpen }"
      @click.self="closeMenu"
    >
      <div class="header-mobile-menu-inner">
        <div class="header-mobile-menu-top">
          <Logo class="header-mobile-menu-logo" />
          <button
            class="header-mobile-menu-close"
            @click="closeMenu"
            :aria-label="t('close-menu')"
            data-cursor="circle-white"
            data-sound="click"
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <nav class="header-mobile-menu-nav">
          <HeaderLink
            v-for="item in navItems"
            :key="item.id"
            class="header-mobile-menu-link"
            @click="handleNavClick(item.id)"
            :aria-label="item.label"
            data-cursor="circle-white"
            data-sound="click"
            data-hoversound="hover"
          >
            {{ item.label }}
          </HeaderLink>
        </nav>
        <div class="header-mobile-menu-footer">
          <Button
            renderAs="a"
            variant="accent"
            href="/static/media/pdfs/Pescador_Jesus_Leonel_CV.pdf"
            download="Pescador_Jesus_Leonel_CV.pdf"
            data-cursor="circle-white"
            data-hoversound="hover"
            >{{ t("download-cv") }}</Button
          >
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
  width: var(--breakpoint-xxxl);
  padding: 0 var(--space-outer);
  max-width: 100%;
  z-index: var(--z-index-header);
  height: var(--height-header);
  pointer-events: none;

  --scrolled: 0;

  &-scrolled {
    --scrolled: 1;
  }

  &-back {
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    transition-delay: 0.1s;
    pointer-events: auto;

    &-icon {
      width: 100%;
      transform: rotate(180deg);
    }

    &-isProjectPage {
      pointer-events: auto;
      opacity: 1;
    }
  }

  &-left {
    position: absolute;
    left: var(--space-outer);
    top: 50%;
    transform: translateY(-50%);
  }

  &-get-in-touch {
    width: fit-content;

    &-isProjectPage {
      opacity: 1 !important;
    }
  }

  &-right {
    position: absolute;
    right: var(--space-outer);
    top: 50%;
    transform: translateY(-50%);
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  &-music-toggle {
    display: flex;
  }

  &-dark {
    color: var(--color-white-400);
    --icon-color: var(--color-white-400);
  }

  &-get-in-touch {
    display: none;

    @include mixins.mq("md") {
      display: flex;
    }
  }

  &-logo {
    cursor: pointer;
    display: flex;
    gap: var(--space-xs);
    transition: color 0.2s ease-in-out;
    opacity: var(--scrolled);
    pointer-events: none;

    &-clickable {
      pointer-events: all;
    }

    @include mixins.mq("md") {
      gap: var(--space-sm);
    }

    &-isProjectPage {
      transition: opacity 0.2s ease-in-out;
      pointer-events: none;
      opacity: 0;
    }

    &-image {
      width: 36px;

      @include mixins.mq("md") {
        width: 40px;
      }
    }

    &-text {
      font-weight: 900;
      font-size: 18px;

      @include mixins.mq("md") {
        font-size: 20px;
      }
    }
  }

  &-menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    position: relative;
    z-index: 1;

    @include mixins.mq("lg") {
      display: none;
    }

    span {
      display: block;
      width: 26px;
      height: 2px;
      background-color: currentColor;
      transition: transform 0.25s ease, opacity 0.25s ease;
    }

    &-open {
      span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  }

  &-mobile-menu {
    position: fixed;
    inset: 0;
    background-color: rgba(45, 42, 36, 0.4);
    z-index: calc(var(--z-index-header) - 1);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;

    @include mixins.mq("lg") {
      display: none;
    }

    &-open {
      opacity: 1;
      pointer-events: auto;
    }

    &-inner {
      position: absolute;
      top: 0;
      right: 0;
      width: min(320px, 85vw);
      height: 100%;
      background-color: var(--color-beige-400);
      color: var(--color-text-400);
      transform: translateX(100%);
      transition: transform 0.3s var(--ease-smooth);
      display: flex;
      flex-direction: column;
      padding: var(--space-outer);
      box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
    }

    &-open &-inner {
      transform: translateX(0);
    }

    &-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-xl);
    }

    &-logo {
      width: 40px;
      height: auto;
    }

    &-close {
      width: 44px;
      height: 44px;
      background: none;
      border: none;
      cursor: pointer;
      position: relative;

      span {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 24px;
        height: 2px;
        background-color: var(--color-text-400);
        display: block;

        &:first-child {
          transform: translate(-50%, -50%) rotate(45deg);
        }
        &:last-child {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }

    &-nav {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      flex: 1;
    }

    &-link {
      width: 100%;
      text-align: left;
      padding: var(--space-sm) 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-400);
      border-radius: var(--radius-md);

      &::after {
        border-radius: var(--radius-md);
      }
    }

    &-footer {
      margin-top: var(--space-lg);
      padding-top: var(--space-lg);
      border-top: 1px solid var(--color-grayscale-500);
    }
  }
}
</style>
