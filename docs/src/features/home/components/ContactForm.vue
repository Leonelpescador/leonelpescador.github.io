<script setup lang="ts">
import { ref, computed } from "vue";
import { t } from "../../../i18n/utils/translate";
import Button from "../../../components/Button.vue";

const formRef = ref<HTMLFormElement | null>(null);
const status = ref<"idle" | "loading" | "success" | "error">("idle");
const formAction = "https://formspree.io/f/xzdlpejn";

const whatsappUrl =
  "https://wa.me/5493875795436?text=Hola%20Leonel%2C%20me%20contact%C3%A9%20contigo%20para%20poder%20charlar%20sobre%20un%20proyecto";

const buttonText = computed(() => {
  if (status.value === "loading") return t("form-sending");
  return t("form-send");
});

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  if (!formRef.value) return;

  status.value = "loading";
  const formData = new FormData(formRef.value);

  try {
    const response = await fetch(formAction, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      status.value = "success";
      formRef.value.reset();
    } else {
      status.value = "error";
    }
  } catch {
    status.value = "error";
  }
};
</script>

<template>
  <div class="contact-form-wrapper">
    <form
      ref="formRef"
      :action="formAction"
      method="POST"
      class="contact-form"
      :aria-busy="status === 'loading'"
      @submit="handleSubmit"
    >
      <input type="text" name="_gotcha" style="display: none" />
      <div class="contact-form-group">
        <label class="contact-form-label" for="contact-name">{{ t("form-name") }}</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          class="contact-form-input"
          required
          autocomplete="name"
          maxlength="100"
          :placeholder="t('form-name')"
        />
      </div>
      <div class="contact-form-group">
        <label class="contact-form-label" for="contact-email">{{ t("form-email") }}</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          class="contact-form-input"
          required
          autocomplete="email"
          maxlength="200"
          placeholder="you@email.com"
        />
      </div>
      <div class="contact-form-group">
        <label class="contact-form-label" for="contact-topic">{{ t("form-topic") }}</label>
        <select id="contact-topic" name="topic" class="contact-form-input" required>
          <option value="job">{{ t("form-topic-job") }}</option>
          <option value="project">{{ t("form-topic-project") }}</option>
        </select>
      </div>
      <div class="contact-form-group">
        <label class="contact-form-label" for="contact-message">{{ t("form-message") }}</label>
        <textarea
          id="contact-message"
          name="message"
          class="contact-form-textarea"
          required
          maxlength="2000"
          :placeholder="t('form-message')"
        ></textarea>
      </div>
      <div class="contact-form-actions">
        <Button
          type="submit"
          variant="accent"
          size="md"
          :disabled="status === 'loading'"
          data-cursor="circle-white"
          data-sound="click"
        >
          {{ buttonText }}
        </Button>
        <Button
          renderAs="a"
          :href="whatsappUrl"
          variant="border"
          size="md"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="circle-white"
          data-sound="click"
        >
          {{ t("whatsapp-cta") }}
        </Button>
      </div>
      <p v-if="status === 'success'" class="contact-form-feedback contact-form-feedback-success" role="status" aria-live="polite">
        {{ t("form-success") }}
      </p>
      <p v-if="status === 'error'" class="contact-form-feedback contact-form-feedback-error" role="alert">
        {{ t("form-error") }}
      </p>
    </form>
  </div>
</template>

<style scoped lang="scss">
.contact-form-wrapper {
  width: 100%;
  max-width: 560px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-md);
  border: var(--stroke-sm) solid var(--color-cyan-400);
  border-radius: var(--radius-md);
  background: linear-gradient(
    to bottom,
    var(--color-hologram-top, rgba(20, 40, 60, 0.9)) 0%,
    var(--color-hologram-bottom, rgba(10, 25, 40, 0.95)) 100%
  );
  color: var(--color-text-cyan-400, var(--color-white-400));
  font-family: "ProFontWindows", monospace;

  @include mixins.mq("md") {
    padding: var(--space-lg);
  }
}

.contact-form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
}

.contact-form-label {
  font-size: var(--font-size-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.contact-form-input,
.contact-form select,
.contact-form-textarea {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--color-cyan-400);
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-md);
  color: var(--color-text-cyan-400, var(--color-white-400));
  font-family: inherit;
  font-size: var(--font-size-md);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.45);
  }

  &:focus {
    border-color: var(--color-white-400);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15);
  }

  &:disabled {
    opacity: 0.65;
  }
}

.contact-form-textarea {
  min-height: 120px;
  resize: vertical;
}

.contact-form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-xs);
}

.contact-form-feedback {
  font-size: var(--font-size-sm);
  font-weight: 700;

  &-success {
    color: var(--color-accent-400, var(--color-green-400, #4ade80));
  }

  &-error {
    color: var(--color-red-400, #f87171);
  }
}
</style>
