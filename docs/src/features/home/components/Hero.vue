<script setup lang="ts">
import Button from "../../../components/Button.vue";
import Banner from "../../../components/Banner.vue";
import { preloaderVisible } from "../../../composables/usePreloader";
import { t } from "../../../i18n/utils/translate";
import { scrollToTarget } from "../../../composables/useScroll";
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
        <ul class="hero-signals" :aria-label="t('hero-signals-title')">
          <li>{{ t("hero-signal-architecture") }}</li>
          <li>{{ t("hero-signal-data") }}</li>
          <li>{{ t("hero-signal-production") }}</li>
        </ul>
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

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      var(--color-beige-400) 0%,
      var(--color-beige-400) 50%,
      rgba(248, 242, 232, 0.96) 64%,
      rgba(248, 242, 232, 0) 84%
    );

    @include mixins.landscape {
      display: none;
    }
  }

  &-eyebrow {
    color: var(--color-text-300);
    font-size: var(--font-size-sm);
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  &-content {
    position: relative;
    z-index: 1;
    align-items: center;
    justify-content: center;
    height: 74%;
    padding-top: var(--height-header);

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
    max-width: 54ch;
    color: var(--color-text-300);
    font-size: var(--font-size-md);
    line-height: 1.55;

    @include mixins.mq("md") {
      font-size: var(--font-size-lg);
    }
  }

  &-signals {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs) var(--space-md);
    margin: 0;
    padding: 0;
    color: var(--color-text-400);
    font-size: var(--font-size-sm);
    font-weight: 700;
    list-style: none;

    li {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);

      &::before {
        content: "";
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--color-orange-400);
      }
    }
  }

  &-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
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

</style>
