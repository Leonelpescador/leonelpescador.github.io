<script setup lang="ts">
import Button from "./Button.vue";
import Logo from "./Logo.vue";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { t } from "../i18n/utils/translate";
import { useHeaderTheme } from "../composables/useHeaderTheme";
import { scrollToTarget } from "../composables/useScroll";
import { projectId } from "../composables/useRouteObserver";
import ButtonRound from "./ButtonRound.vue";
import ArrowRight from "./icons/ArrowRight.vue";
import SoundsToggle from "./SoundsToggle.vue";
import LangSwitch from "./LangSwitch.vue";
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
const menuPanelRef = ref<HTMLElement | null>(null);
let previouslyFocused: HTMLElement | null = null;

const handleBackClick = () => {
  if (isFirstRoute.value) {
    router.push("/");
  } else {
    router.back();
  }
};

const handleLogoClick = () => {
  closeMenu();
  scrollToTarget(0);
};

const toggleMenu = () => {
  if (!isMenuOpen.value) previouslyFocused = document.activeElement as HTMLElement | null;
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const navTo = (target: string) => {
  closeMenu();
  nextTick(() => scrollToTarget("#" + target));
};

const handleMenuKeydown = (event: KeyboardEvent) => {
  if (!isMenuOpen.value || !menuPanelRef.value) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu();
    return;
  }

  if (event.key !== "Tab") return;

  const focusable = Array.from(
    menuPanelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
  const first = focusable[0];
  const last = focusable.at(-1);
  if (!first || !last) return;

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

watch(
  isMenuOpen,
  async (open) => {
    if (open) {
      previouslyFocused ??= document.activeElement as HTMLElement | null;
      document.documentElement.style.overflow = "hidden";
      document.querySelector("main")?.setAttribute("inert", "");
      await nextTick();
      menuPanelRef.value?.querySelector<HTMLElement>("button")?.focus();
    } else {
      document.documentElement.style.overflow = "";
      document.querySelector("main")?.removeAttribute("inert");
      await nextTick();
      previouslyFocused?.focus();
      previouslyFocused = null;
    }
  },
  { flush: "post" },
);

watch(projectId, closeMenu);

onMounted(() => document.addEventListener("keydown", handleMenuKeydown));
onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleMenuKeydown);
  document.documentElement.style.overflow = "";
  document.querySelector("main")?.removeAttribute("inert");
});

const handleOverlayClick = (e: MouseEvent) => {
  const overlay = e.currentTarget as HTMLElement;
  if (e.target === overlay) {
    isMenuOpen.value = false;
  }
};

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
    <button
      type="button"
      :class="{
        'header-logo': true,
        'header-logo-isProjectPage': projectId !== null,
        'header-logo-clickable': scrolledPastHeroVisible,
        'children-unclickable': true,
      }"
      @click="handleLogoClick"
      :aria-label="t('back-to-top')"
      :tabindex="scrolledPastHeroVisible && projectId === null ? 0 : -1"
      data-sound="click"
      data-hoversound="hover"
      data-cursor="circle-white"
    >
      <Logo class="header-logo-image" />
    </button>
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
      <LangSwitch class="header-lang-switch" />
      <SoundsToggle
        class="header-sounds-toggle"
        :isDarkTheme="isDarkTheme"
        v-if="isFeatureEnabled('sounds')"
      />
      <button
        v-show="!isMenuOpen"
        class="header-menu-toggle"
        :class="{ 'header-menu-toggle-open': isMenuOpen }"
        @click="toggleMenu"
        :aria-label="isMenuOpen ? t('close-menu') : t('open-menu')"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-navigation"
        data-cursor="circle-white"
        data-sound="click"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <Teleport to="body">
      <Transition name="mobile-menu">
        <div
          v-if="isMenuOpen"
          class="mobile-menu-overlay"
          @click="handleOverlayClick"
        >
          <div
            id="mobile-navigation"
            ref="menuPanelRef"
            class="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div class="mobile-menu-header">
              <Logo class="mobile-menu-logo" />
              <h2 id="mobile-menu-title" class="visually-hidden">{{ t("primary-navigation") }}</h2>
              <button
                class="mobile-menu-close"
                @click="closeMenu"
                :aria-label="t('close-menu')"
              >
                <span></span>
                <span></span>
              </button>
            </div>
            <nav class="mobile-menu-nav">
              <button class="mobile-menu-item" @click="navTo('about')">
                {{ t("about") }}
              </button>
              <button class="mobile-menu-item" @click="navTo('journey')">
                {{ t("journey") }}
              </button>
              <button class="mobile-menu-item" @click="navTo('education')">
                {{ t("education") }}
              </button>
              <button class="mobile-menu-item" @click="navTo('projects')">
                {{ t("projects") }}
              </button>
              <button class="mobile-menu-item" @click="navTo('contact')">
                {{ t("contact") }}
              </button>
            </nav>
            <div class="mobile-menu-footer">
              <LangSwitch class="mobile-menu-language" />
              <a
                class="mobile-menu-cv"
                href="/static/media/pdfs/Pescador_Jesus_Leonel_CV.pdf"
                download="Pescador_Jesus_Leonel_CV.pdf"
              >
                {{ t("download-cv") }}
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  right: 0;
  margin: 0 auto;
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

  &-lang-switch {
    display: none;

    @include mixins.mq("md") {
      display: flex;
    }
  }

  &-logo {
    cursor: pointer;
    border: 0;
    background: transparent;
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
}
</style>

<style>
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 89;
  background-color: rgba(45, 42, 36, 0.5);
  display: flex;
  justify-content: flex-end;
}

.mobile-menu-panel {
  width: min(320px, 85vw);
  height: 100%;
  background-color: var(--color-beige-400);
  color: var(--color-text-400);
  display: flex;
  flex-direction: column;
  padding: var(--space-outer);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-xl);
}

.mobile-menu-logo {
  width: 28px !important;
  height: auto;
}

.mobile-menu-close {
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}

.mobile-menu-close span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 2px;
  background-color: var(--color-text-400);
  display: block;
}

.mobile-menu-close span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.mobile-menu-close span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.mobile-menu-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  flex: 1;
  padding: var(--space-md) 0;
}

.mobile-menu-item {
  width: 100%;
  text-align: left;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-lg);
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--color-text-400);
  border: none;
  background: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color 0.15s ease;
}

.mobile-menu-item:active {
  background-color: var(--color-grayscale-500);
}

.mobile-menu-footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-top: var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-grayscale-500);
}

.mobile-menu-language {
  align-self: flex-start;
}

.mobile-menu-cv {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--color-orange-400);
  color: var(--color-black-400);
  border: none;
  border-radius: 100px;
  font-weight: 700;
  font-size: var(--font-size-md);
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-active .mobile-menu-panel,
.mobile-menu-leave-active .mobile-menu-panel {
  transition: transform 0.3s var(--ease-smooth);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu-panel,
.mobile-menu-leave-to .mobile-menu-panel {
  transform: translateX(100%);
}

@media (min-width: 1024px) {
  .mobile-menu-overlay {
    display: none;
  }
}
</style>
