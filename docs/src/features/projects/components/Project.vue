<script setup lang="ts">
import { projectId, projectVisible, recentProjectId } from "../../../composables/useRouteObserver";
import { isTransitioning } from "../../../composables/useProjectTransition";
import { ref, watch } from "vue";
import { projectModules } from "../../../content/projects";
import ProjectContent from "./ProjectContent.vue";
import Footer from "../../../components/Footer.vue";
import { locale } from "../../../i18n/store";
import { lenis } from "../../../composables/useScroll";
import Button from "../../../components/Button.vue";
import { t } from "../../../i18n/utils/translate";
import { useRouter } from "../../../composables/useRouter";

import type { Locale } from "../../../i18n/types";
import type { ProjectContent as ProjectContentType } from "../../../content/types";

const loading = ref(true);
const content = ref<ProjectContentType | null>(null);
const error = ref<Error | null>(null);
const router = useRouter();
let requestId = 0;

const fetchProject = async (project: string | undefined) => {
  const currentRequest = ++requestId;
  loading.value = true;
  error.value = null;
  content.value = null;

  try {
    const loader = projectModules[locale.value as Locale]?.[project as string];
    if (!loader) throw new Error("Project not found");
    const module = await loader();
    if (currentRequest === requestId) content.value = module.default;
  } catch (err) {
    if (currentRequest === requestId) error.value = new Error(`Failed to fetch project ${project}`);
  } finally {
    if (currentRequest === requestId) loading.value = false;
  }
};

watch(
  [recentProjectId, locale],
  () => {
    if (recentProjectId.value) {
      fetchProject(recentProjectId.value);
    }
  },
  { immediate: true },
);

watch(
  [projectId, isTransitioning, locale],
  () => {
    if (!projectId.value || isTransitioning.value) return;
    lenis.value?.scrollTo(0, { immediate: true });
  },
  { immediate: true },
);
</script>

<template>
  <div
    ref="projectRef"
    :class="[
      'project',
      recentProjectId !== null && `project-${recentProjectId}`,
      isTransitioning && `project-transitioning`,
      projectVisible && `project-visible`,
    ]"
  >
    <div :class="['project-content-wrapper', projectVisible && `project-content-wrapper-visible`]">
      <ProjectContent
        v-if="content && recentProjectId && projectVisible"
        :content="content"
        :projectId="recentProjectId"
      />
      <div v-else-if="loading && projectVisible" class="project-state" role="status" aria-live="polite">
        <p>{{ t("project-loading") }}</p>
      </div>
      <div v-else-if="error && projectVisible" class="project-state" role="alert">
        <p class="project-state-code">404</p>
        <h1>{{ t("project-not-found") }}</h1>
        <p>{{ t("project-not-found-description") }}</p>
        <Button variant="accent" @click="router.replace('/')">{{ t("back-to-home") }}</Button>
      </div>
      <Footer :class="['project-footer', `project-${recentProjectId}`]"></Footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project {
  min-height: calc(var(--lvh) * 100);
  background-color: var(--color-background-300);
  max-width: calc(var(--lvw) * 100);
  overflow: hidden;

  &-content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    opacity: 0;
    transition: opacity 0.4s ease-out;

    &-visible {
      opacity: 1;
    }
  }

  &-footer {
    position: relative;
    margin-top: auto;
    color: var(--color-text-400);
  }

  &-state {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
    padding: var(--space-outer);
    text-align: center;

    &-code {
      color: var(--color-orange-400);
      font-size: var(--font-size-title-xl);
      font-weight: 900;
      line-height: 1;
    }

    h1 {
      font-size: var(--font-size-title-md);
    }

    > p:not(.project-state-code) {
      max-width: 55ch;
      color: var(--color-text-300);
      line-height: 1.55;
    }
  }

  ::selection {
    background: var(--color-accent-400);
    color: var(--color-accent-text-400);
    text-shadow: none;
  }

  ::-moz-selection {
    background: var(--color-accent-400);
    color: var(--color-accent-text-400);
    text-shadow: none;
  }
}
</style>
