<script setup lang="ts">
import { computed } from "vue";
import { locale } from "../../../i18n/store";
import spanishPreviews from "../../../content/projects/previews/es";
import englishPreviews from "../../../content/projects/previews/en";
import PreviewCard from "../../projects/components/PreviewCard.vue";
import NotchSection from "../../../components/NotchSection.vue";
import Banner from "../../../components/Banner.vue";
import { t } from "../../../i18n/utils/translate";
import { isFeatureEnabled } from "../../../utils/features";

import type { ProjectPreview } from "../../../content/types";

const loadedPreviews = computed<ProjectPreview[]>(() =>
  locale.value === "en" ? [...englishPreviews] : [...spanishPreviews],
);
</script>

<template>
  <div class="projects">
    <NotchSection class="projects-notch-start" />
    <NotchSection class="projects-notch-end" />
    <div class="grid">
      <div class="projects-title">
        <Banner class="projects-title-banner" :copy="t('selected')" size="sm" animated />
        <h2 class="projects-title-copy">{{ t("projects") }}</h2>
        <p class="projects-title-intro">{{ t("projects-intro") }}</p>
      </div>
    </div>
    <div class="grid">
      <div class="projects-cards">
        <PreviewCard
          v-for="(preview, index) in loadedPreviews"
          :key="preview.title"
          :preview="preview"
          :index="index"
        />
        <PreviewCard v-if="isFeatureEnabled('startProject')" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  scroll-margin-top: calc(var(--height-header) + var(--space-md));
  gap: var(--space-xl);
  padding-left: var(--space-outer);
  padding-right: var(--space-outer);
  background-color: var(--color-beige-400);
  min-height: calc(var(--lvh) * 100 + var(--radius-xxl));
  padding-top: 104px;
  padding-bottom: 112px;

  @include mixins.mq("md") {
    padding-top: 144px;
    padding-bottom: 144px;
    gap: var(--space-xxl);
  }

  @include mixins.mq("lg") {
    gap: var(--space-xxxl);
  }

  &-title {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 1 / 11;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 9;
    }

    &-copy {
      font-weight: 900;
      letter-spacing: 0.02em;
      font-size: var(--font-size-title-md);

      @include mixins.mq("sm") {
        font-size: var(--font-size-title-lg);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-xl);
      }
    }

    &-intro {
      max-width: 58ch;
      margin-top: var(--space-sm);
      color: var(--color-text-300);
      font-size: var(--font-size-lg);
      line-height: 1.55;
    }

    &-banner {
      position: absolute;
      top: 0;
      left: -8px;
      transform: translate(0, -20%) rotate(-4deg);

      @include mixins.mq("lg") {
        left: -16px;
        transform: translate(0, -20%) rotate(-6deg);
      }
    }
  }

  &-notch {
    &-start {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      color: var(--color-beige-400);
      --icon-color: var(--color-beige-400);
    }

    &-end {
      position: absolute;
      bottom: 0;
      left: 0;
      color: var(--color-beige-600);
      --icon-color: var(--color-beige-600);
    }
  }

  &-cards {
    max-width: 100%;
    grid-column: 1 / span 12;
    display: flex;
    flex-direction: column;
    gap: var(--space-xxl);

    @include mixins.mq("md") {
      grid-column: 1 / 13;
      gap: var(--space-xxxl);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 12;
    }
  }
}
</style>
