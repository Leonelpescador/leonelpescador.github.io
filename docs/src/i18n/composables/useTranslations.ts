import { watch } from "vue";
import { loadTranslations } from "../utils/load";
import { locale, translations } from "../store";
import { onMounted } from "vue";
import { LOCALES } from "../constants";

import type { Locale } from "../types";

export const useTranslations = () => {
  onMounted(() => {
    locale.value = window.localStorage.getItem("portfolio-locale") as Locale;
    if (!locale.value) {
      const preferredLocale = navigator.language.split("-")[0] as Locale;

      if (preferredLocale in LOCALES) {
        locale.value = preferredLocale;
      } else {
        locale.value = "en";
      }
    }
  });

  watch(locale, () => {
    if (!locale.value) return;
    window.localStorage.setItem("portfolio-locale", locale.value);
    document.documentElement.lang = locale.value;

    const isSpanish = locale.value === "es";
    const title = isSpanish
      ? "Pescador Jesús Leonel · Full-Stack Developer"
      : "Pescador Jesús Leonel · Full-Stack Developer";
    const description = isSpanish
      ? "Analista de Sistemas y Full-Stack Developer en Salta. Diseño soluciones Python, Odoo y web de punta a punta con impacto operativo medible."
      : "Systems Analyst and Full-Stack Developer in Salta. I build end-to-end Python, Odoo and web solutions with measurable operational impact.";
    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute("content", description);
  });

  watch(
    locale,
    async (newLocale) => {
      if (!newLocale) return;
      translations.value = (await loadTranslations("common", newLocale)) ?? {};
    },
    { immediate: true },
  );
};
