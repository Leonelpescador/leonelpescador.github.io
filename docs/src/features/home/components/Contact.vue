<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { t } from "../../../i18n/utils/translate";
import Social from "../../../components/Social.vue";
import ContactForm from "./ContactForm.vue";

const contactElement = ref<HTMLElement | null>(null);

const props = defineProps<{ enhanced?: boolean }>();

watchEffect((onCleanup) => {
  let active = true;
  let destroy: (() => void) | null = null;
  let frameId: number | null = null;

  if (contactElement.value && props.enhanced) {
    frameId = requestAnimationFrame(() => {
      import("../../../animations").then(({ transitions }) => {
        if (!active || !contactElement.value) return;
        transitions.contact.setup(contactElement.value);
        destroy = transitions.contact.destroy;
      });
    });
  }

  onCleanup(() => {
    active = false;
    if (frameId !== null) cancelAnimationFrame(frameId);
    destroy?.();
  });
}, { flush: "post" });
</script>

<template>
  <div :class="['contact', 'grid', { 'contact-fallback': !props.enhanced }]" ref="contactElement">
    <div class="contact-content">
      <h2 class="contact-title" v-html="t('lets-work-together')"></h2>
      <p class="contact-intro">{{ t("contact-intro") }}</p>
      <div class="contact-paths">
        <div class="contact-path">
          <h3>{{ t("contact-recruiter-title") }}</h3>
          <p>{{ t("contact-recruiter-description") }}</p>
        </div>
        <div class="contact-path">
          <h3>{{ t("contact-project-title") }}</h3>
          <p>{{ t("contact-project-description") }}</p>
        </div>
      </div>
      <a class="contact-email" href="mailto:leopescador07@gmail.com"></a>
      <Social variant="background" />
      <ContactForm />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  max-width: calc(var(--svw) * 100);
  overflow: hidden;
  min-height: calc(var(--lvh) * 100);
  align-items: center;
  padding: var(--space-outer);
  padding-top: calc(var(--height-header) + var(--space-lg));
  padding-bottom: var(--space-xxxl);
  position: relative;
  isolation: isolate;
  scroll-margin-top: var(--height-header);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(
      90deg,
      rgba(5, 46, 135, 0.98) 0%,
      rgba(5, 46, 135, 0.9) 42%,
      rgba(5, 46, 135, 0.42) 62%,
      rgba(5, 46, 135, 0) 82%
    );
  }

  &-fallback {
    background: var(--color-dark-blue-500);
    color: var(--color-white-400);

    &::before {
      display: none;
    }
  }

  @include mixins.mq("md") {
    padding-top: calc(var(--height-header) + var(--space-xxl));
  }

  &-content {
    position: relative;
    z-index: 1;
    padding: 0;
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    color: var(--color-white-400);

    @include mixins.mq("sm") {
      grid-column: 1 / 10;
    }

    @include mixins.mq("md") {
      gap: var(--space-lg);
      grid-column: 1 / 7;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 7;
    }
  }

  &-title {
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
    color: var(--color-text-cyan-400);
    font-size: var(--font-size-lg);
    line-height: 1.55;
  }

  &-paths {
    display: grid;
    gap: var(--space-sm);

    @include mixins.mq("sm") {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &-path {
    padding-top: var(--space-sm);
    border-top: 1px solid var(--color-text-cyan-300);

    h3 {
      font-size: var(--font-size-md);
    }

    p {
      margin-top: var(--space-xxs);
      color: var(--color-text-cyan-400);
      font-size: var(--font-size-sm);
      line-height: 1.45;
    }
  }

  &-email {
    width: fit-content;
    color: var(--color-cyan-400);
    font-weight: 800;
    text-decoration: underline;
  }
}

@media (max-width: 839px) {
  .contact::before {
    background: rgba(5, 46, 135, 0.74);
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact {
    background: var(--color-dark-blue-500);
    color: var(--color-white-400);
  }
}
</style>
