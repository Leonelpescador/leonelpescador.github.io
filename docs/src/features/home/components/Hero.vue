<script setup lang="ts">
import Button from "../../../components/Button.vue";
import Banner from "../../../components/Banner.vue";
import { preloaderVisible } from "../../../composables/usePreloader";
import { t } from "../../../i18n/utils/translate";
import { scrollToTarget } from "../../../composables/useScroll";

const impactItems = [
  { value: "7.000+", label: "impact-professionals" },
  { value: "24", label: "impact-modules" },
  { value: "3", label: "impact-systems" },
  { value: "8", label: "impact-team" },
];
</script>

<template>
  <div class="hero">
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <div class="hero-content-copys">
          <p class="hero-eyebrow">{{ t("hero-eyebrow") }}</p>
          <h1 class="hero-title">Pescador<br />Jesús Leonel</h1>
          <Banner class="hero-banner" :copy="t('job-title')" v-if="!preloaderVisible" animated />
        </div>
        <p class="hero-summary">{{ t("hero-summary") }}</p>
        <div class="hero-actions">
          <Button variant="accent" size="md" @click="scrollToTarget('#projects')">
            {{ t("hero-projects-cta") }}
          </Button>
          <Button
            renderAs="a"
            variant="border"
            size="md"
            href="/static/media/pdfs/Pescador_Jesus_Leonel_CV.pdf"
            download="Pescador_Jesus_Leonel_CV.pdf"
          >
            {{ t("download-cv") }}
          </Button>
        </div>
      </div>
    </div>
    <dl class="hero-impact" :aria-label="t('impact-title')">
      <div v-for="item in impactItems" :key="item.label" class="hero-impact-item">
        <dt class="hero-impact-value">{{ item.value }}</dt>
        <dd class="hero-impact-label">{{ t(item.label) }}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped lang="scss">
.hero {
  max-height: calc(var(--lvh) * 100);
  height: calc(var(--lvh) * 100);
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;

  &-eyebrow {
    color: var(--color-text-300);
    font-size: var(--font-size-sm);
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  &-content {
    align-items: center;
    justify-content: center;
    height: 60%;

    @include mixins.landscape {
      height: 100%;

      @include mixins.mq("md") {
        padding-bottom: 16%;
      }

      @include mixins.mq("lg") {
        padding-bottom: 5%;
      }
    }

    &-inner {
      transform-origin: center center;
      grid-column: 1 / 13;
      gap: var(--space-md);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: fit-content;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      @include mixins.landscape {
        left: 0;
        transform: translateX(0);
        grid-column: 2 / 13;
        width: fit-content;
      }
    }

    &-copys {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);

      @include mixins.mq("md") {
        gap: var(--space-md);
      }
    }
  }

  &-summary {
    max-width: 58ch;
    color: var(--color-text-300);
    font-size: var(--font-size-md);
    line-height: 1.55;

    @include mixins.mq("md") {
      font-size: var(--font-size-lg);
    }
  }

  &-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  &-impact {
    position: absolute;
    inset-inline: var(--space-outer);
    bottom: var(--space-outer);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    margin: 0 auto;
    max-width: 980px;
    overflow: hidden;
    border: 1px solid var(--color-grayscale-500);
    border-radius: var(--radius-lg);
    background: var(--color-grayscale-500);
    z-index: 2;

    @include mixins.mq("md") {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      inset-inline: max(var(--space-outer), calc((100vw - 980px) / 2));
    }

    &-item {
      min-width: 0;
      padding: var(--space-sm);
      background: var(--color-beige-400);

      @include mixins.mq("md") {
        padding: var(--space-md);
      }
    }

    &-value {
      color: var(--color-dark-blue-500);
      font-size: var(--font-size-xxl);
      font-weight: 900;
      letter-spacing: -0.02em;
      line-height: 1;
    }

    &-label {
      margin-top: var(--space-xxs);
      color: var(--color-text-300);
      font-size: var(--font-size-xs);
      line-height: 1.3;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: -0.025em;
    font-size: clamp(2.7rem, 10vw, var(--font-size-title-xl));
    line-height: 0.92;

    @include mixins.landscape {
      font-size: clamp(3rem, 7vw, var(--font-size-title-xl));
    }

    @include mixins.landscape-large {
      @include mixins.mq("sm") {
        font-size: var(--font-size-title-xl);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-xxl);
      }
    }
  }

  &-banner {
    position: static;
    align-self: flex-end;
    margin-top: calc(var(--space-sm) * -1);
    z-index: 10;
    transform: rotate(-4deg);

    @include mixins.mq("sm") {
      margin-right: calc(var(--space-sm) * -1);
    }

    @include mixins.mq("lg") {
      margin-right: calc(var(--space-md) * -1);
    }
  }
}

@media (max-height: 700px) {
  .hero-impact {
    display: none;
  }
}
</style>
