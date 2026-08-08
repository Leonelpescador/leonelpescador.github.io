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

  if (contactElement.value && props.enhanced) {
    import("../../../animations").then(({ transitions }) => {
      if (!active || !contactElement.value) return;
      transitions.contact.setup(contactElement.value);
      destroy = transitions.contact.destroy;
    });
  }

  onCleanup(() => {
    active = false;
    destroy?.();
  });
});
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
      <a class="contact-email" href="mailto:leopescador07@gmail.com">leopescador07@gmail.com</a>
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
  padding: var(--space-outer);
  padding-top: var(--space-lg);

  &-fallback {
    background: var(--color-dark-blue-500);
    color: var(--color-white-400);
  }

  @include mixins.mq("md") {
    padding-top: var(--space-xxl);
  }

  &-content {
    position: relative;
    padding: var(--space-md);
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    border-radius: var(--radius-lg);
    background: var(--color-dark-blue-500);
    color: var(--color-white-400);

    @include mixins.mq("sm") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("md") {
      gap: var(--space-xl);
      grid-column: 1 / 6;
      padding: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 6;
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

@media (prefers-reduced-motion: reduce) {
  .contact {
    background: var(--color-dark-blue-500);
    color: var(--color-white-400);
  }
}
</style>
