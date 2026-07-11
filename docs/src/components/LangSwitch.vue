<script setup lang="ts">
import Button from "./Button.vue";
import { locale } from "../i18n/store";
import { changeLocale } from "../i18n/utils/locale";

const handleLangSwitch = () => {
  changeLocale(locale.value === "en" ? "es" : "en");
};
</script>

<template>
  <Button
    variant="border"
    size="sm"
    @click="handleLangSwitch"
    data-cursor="circle-white"
    data-sound="click"
    data-hoversound="hover"
    >{{ locale === "en" ? "ES" : "EN" }}</Button
  >
</template>
