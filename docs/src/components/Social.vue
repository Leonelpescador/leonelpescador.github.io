<script setup lang="ts">
import { ref } from "vue";
import Github from "./icons/Github.vue";
import Linkedin from "./icons/Linkedin.vue";
import Instagram from "./icons/Instagram.vue";
import Mail from "./icons/Mail.vue";
import X from "./icons/X.vue";
import Link from "./Link.vue";
import { t } from "../i18n/utils/translate";
import ButtonRound from "./ButtonRound.vue";

import { social } from "../content/social";
import type { SocialItem } from "../content/social";

const props = defineProps<{
  variant?: "theme" | "background";
}>();

// map icon names to components
const icons = {
  mail: Mail,
  github: Github,
  "github-cpces": Github,
  linkedin: Linkedin,
  x: X,
  instagram: Instagram,
} as const;

const getAriaLabel = (item: SocialItem) =>
  `${t("go-to")} ${item.label ?? item.name.charAt(0).toUpperCase() + item.name.slice(1)}`;

const copied = ref(false);
let copyTimeout: ReturnType<typeof setTimeout> | null = null;

const copyEmail = async (email: string) => {
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = email;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  copied.value = true;
  if (copyTimeout) clearTimeout(copyTimeout);
  copyTimeout = setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<template>
  <div class="social">
    <template v-for="item in social" :key="item.url">
      <button
        v-if="item.copy"
        type="button"
        class="social-link"
        data-cursor="circle-white"
        @click="copyEmail(item.copy)"
      >
        <ButtonRound
          renderAs="div"
          :variant="props.variant ?? 'theme'"
          class="children-unclickable"
          data-hoversound="hover"
        >
          <component :is="icons[item.name]" :aria-label="getAriaLabel(item)" external />
        </ButtonRound>
      </button>

      <Link
        v-else
        external
        :href="item.url"
        :aria-label="getAriaLabel(item)"
        class="social-link"
        data-cursor="circle-white"
      >
        <ButtonRound
          renderAs="div"
          :variant="props.variant ?? 'theme'"
          class="children-unclickable"
          data-hoversound="hover"
        >
          <component :is="icons[item.name]" :aria-label="getAriaLabel(item)" external />
        </ButtonRound>
      </Link>
    </template>

    <Transition name="toast">
      <div v-if="copied" class="toast" role="status" aria-live="polite">
        {{ t("email-copied") }}
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.social {
  display: flex;
  gap: var(--space-md);
  position: relative;
}

.social-link {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: inherit;
  font: inherit;
}

.toast {
  position: fixed;
  bottom: var(--space-xl);
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  background-color: var(--color-text-400);
  color: var(--color-background-400);
  font-size: var(--font-size-sm);
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
</style>
