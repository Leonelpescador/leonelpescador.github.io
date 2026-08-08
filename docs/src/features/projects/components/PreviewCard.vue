<script setup lang="ts">
import Link from "../../../components/Link.vue";
import ArrowRightLong from "../../../components/icons/ArrowRightLong.vue";
import gsap from "gsap";
import { onMounted, onUnmounted, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { t } from "../../../i18n/utils/translate";
import { social } from "../../../content/social";
import Plus from "../../../components/icons/Plus.vue";

import type { ProjectPreview } from "../../../content/types";

const tlRef = ref<gsap.core.Timeline | null>(null);
const wrapperRef = ref<HTMLDivElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);

const props = defineProps<{
  preview?: ProjectPreview;
  index?: number;
}>();

onMounted(async () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!wrapperRef.value || ScrollTrigger.isInViewport(wrapperRef.value)) {
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: "top bottom",
    },
  });
  tl.fromTo(wrapperRef.value, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: "power1.out" }, 0);
  tl.fromTo(imageRef.value, { scale: 1.2 }, { scale: 1, duration: 0.4, ease: "power1.out" }, 0);

  tlRef.value = tl;
});

onUnmounted(() => {
  if (tlRef.value) {
    tlRef.value.kill();
    tlRef.value = null;
  }
});
</script>

<template>
  <Link
    class="preview-card children-unclickable"
    :to="`/project/${props.preview.slug}`"
    :aria-label="t('switch-to-project', { project: props.preview.title })"
    data-cursor="arrow"
    data-sound="click"
    data-hoversound="hover"
    v-if="props.preview"
  >
    <div class="preview-card-visual" ref="wrapperRef">
      <div class="preview-card-image-container">
        <img
          :src="props.preview.thumbnail"
          alt=""
          class="preview-card-image"
          ref="imageRef"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          width="960"
          height="540"
        />
      </div>
    </div>
    <div class="preview-card-content">
      <div class="preview-card-copys">
        <p class="preview-card-kicker">
          {{ String((props.index ?? 0) + 1).padStart(2, "0") }} · {{ t("case-study") }}
        </p>
        <h3 class="preview-card-title">{{ props.preview.title }}</h3>
        <p class="preview-card-description">{{ props.preview.description }}</p>
      </div>
      <ul class="preview-card-evidence" :aria-label="t('case-evidence')">
        <li v-for="item in props.preview.evidence" :key="item">{{ item }}</li>
      </ul>
      <span class="preview-card-cta">
        {{ t("view-project") }}
        <ArrowRightLong class="preview-card-cta-icon" />
      </span>
    </div>
  </Link>

  <Link
    v-else
    class="preview-card children-unclickable"
    data-cursor="arrow-external"
    data-hoversound="hover"
    external
    :href="social[0]?.url ?? ''"
  >
    <div class="preview-card-visual preview-card-visual-empty">
      <Plus class="preview-card-visual-empty-icon" />
    </div>
    <div class="preview-card-content">
      <div class="preview-card-copys">
        <h3 class="preview-card-title">{{ t("start-a-new-project") }}</h3>
      </div>
    </div>
  </Link>
</template>

<style scoped lang="scss">
.preview-card {
  position: relative;
  z-index: var(--z-index-layout);
  display: grid;
  gap: var(--space-lg);
  padding-block: var(--space-md) var(--space-lg);
  border-top: 1px solid var(--color-grayscale-500);

  @include mixins.mq("md") {
    grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
    align-items: center;
    gap: var(--space-xxl);
    padding-block: var(--space-lg) var(--space-xxl);
  }

  @include mixins.hover {
    &:hover {
      .preview-card-image-container {
        transform: scale(1.025);
      }

      .preview-card-title {
        color: var(--color-dark-blue-500);
      }

      .preview-card-cta-icon {
        transform: translateX(6px);
      }
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-lg);
  }

  &-evidence {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      padding-block: var(--space-xs);
      border-top: 1px solid var(--color-grayscale-500);
      color: var(--color-text-300);
      font-size: var(--font-size-sm);
      font-weight: 700;
      line-height: 1.35;
    }
  }

  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &-container {
      height: 100%;
      transition: transform 0.3s var(--ease-power2-out);
      aspect-ratio: 16/9;
    }
  }

  &-visual {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background-color: var(--color-beige-500);

    &-empty {
      border: 4px dashed var(--color-grayscale-500);
      border-radius: var(--radius-lg);
      background-color: var(--color-grayscale-400);
      display: flex;
      align-items: center;
      justify-content: center;

      &-icon {
        width: var(--icon-size-lg);
        color: var(--color-text-300);
        --icon-color: var(--color-text-300);
        --stroke-width: 4px;
      }
    }
  }

  &-copys {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  &-kicker {
    color: var(--color-text-300);
    font-family: "ProFontWindows", monospace;
    font-size: var(--font-size-sm);
    font-weight: 700;
  }

  &-title {
    font-size: var(--font-size-title-sm);
    font-weight: 900;
    color: var(--color-text-400);
    line-height: 1.08;
    transition: color 0.2s ease;
  }

  &-description {
    font-size: var(--font-size-md);
    color: var(--color-text-300);
    font-weight: 500;
    line-height: 1.5;
  }

  &-cta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    color: var(--color-dark-blue-500);
    font-weight: 800;

    &-icon {
      width: var(--icon-size-md);
      transition: transform 0.2s var(--ease-power2-out);
    }
  }
}
</style>
