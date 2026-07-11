<script setup lang="ts">
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
</script>

<template>
  <div class="social">
    <Link
      v-for="item in social"
      :key="item.url"
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
  </div>
</template>

<style scoped lang="scss">
.social {
  display: flex;
  gap: var(--space-md);
}
</style>
