<script setup lang="ts">
export interface EvidenceStat {
  value: string;
  label: string;
}

export interface EvidenceStage {
  title: string;
  detail: string;
}

export interface Props {
  index: number;
  title: string;
  summary?: string;
  stats?: EvidenceStat[];
  stages: EvidenceStage[];
  note?: string;
}

defineProps<Props>();
</script>

<template>
  <section class="project-evidence" :aria-labelledby="`evidence-${index}`">
    <div class="project-evidence-heading">
      <h2 :id="`evidence-${index}`" class="project-evidence-title">{{ title }}</h2>
      <p v-if="summary" class="project-evidence-summary">{{ summary }}</p>
    </div>

    <dl v-if="stats?.length" class="project-evidence-stats">
      <div v-for="stat in stats" :key="stat.label" class="project-evidence-stat">
        <dt class="project-evidence-value">{{ stat.value }}</dt>
        <dd class="project-evidence-label">{{ stat.label }}</dd>
      </div>
    </dl>

    <ol class="project-evidence-flow">
      <li v-for="(stage, stageIndex) in stages" :key="stage.title" class="project-evidence-stage">
        <span class="project-evidence-step" aria-hidden="true">{{ String(stageIndex + 1).padStart(2, "0") }}</span>
        <div>
          <h3>{{ stage.title }}</h3>
          <p>{{ stage.detail }}</p>
        </div>
      </li>
    </ol>

    <p v-if="note" class="project-evidence-note">{{ note }}</p>
  </section>
</template>

<style scoped lang="scss">
.project-evidence {
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: var(--space-md);
  row-gap: var(--space-xl);
  max-width: 1180px;
  justify-self: center;
  padding-block: var(--space-xl);
  border-block: 1px solid var(--color-grayscale-500);
  color: var(--color-text-400);

  @include mixins.mq("md") {
    grid-column: 1 / 13;
    column-gap: var(--space-lg);
  }

  &-heading {
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 1 / 6;
    }
  }

  &-title {
    max-width: 14ch;
    font-size: var(--font-size-title-md);
    font-weight: 900;
    letter-spacing: -0.02em;
    line-height: 1.04;
  }

  &-summary {
    max-width: 58ch;
    margin-top: var(--space-sm);
    color: var(--color-text-300);
    line-height: 1.55;
  }

  &-stats {
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-self: start;
    border-top: 1px solid var(--color-grayscale-500);

    @include mixins.mq("md") {
      grid-column: 7 / 13;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  }

  &-stat {
    padding: var(--space-md) var(--space-sm) var(--space-md) 0;
    border-bottom: 1px solid var(--color-grayscale-500);

    & + & {
      padding-left: var(--space-sm);
    }
  }

  &-value {
    color: var(--color-dark-blue-500);
    font-size: var(--font-size-xxl);
    font-weight: 900;
    line-height: 1;
  }

  &-label {
    margin-top: var(--space-xxs);
    color: var(--color-text-300);
    font-size: var(--font-size-sm);
    line-height: 1.35;
  }

  &-flow {
    grid-column: 1 / 13;
    display: grid;
    gap: var(--space-lg);

    @include mixins.mq("md") {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &-stage {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding-top: var(--space-md);
    border-top: 3px solid var(--color-text-400);

    h3 {
      font-size: var(--font-size-lg);
      font-weight: 800;
      line-height: 1.2;
    }

    p {
      margin-top: var(--space-xxs);
      color: var(--color-text-300);
      font-size: var(--font-size-sm);
      line-height: 1.5;
    }
  }

  &-step {
    color: var(--color-dark-blue-500);
    font-family: "ProFontWindows", monospace;
    font-size: var(--font-size-sm);
    font-weight: 700;
  }

  &-note {
    grid-column: 1 / 13;
    max-width: 75ch;
    color: var(--color-text-300);
    font-size: var(--font-size-sm);
    line-height: 1.5;
  }
}
</style>
