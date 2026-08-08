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
      <h3 :id="`evidence-${index}`" class="project-evidence-title">{{ title }}</h3>
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
          <h4>{{ stage.title }}</h4>
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
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  max-width: 1040px;
  justify-self: center;
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  background: var(--color-dark-blue-500);
  color: var(--color-white-400);

  @include mixins.mq("md") {
    grid-column: 2 / 12;
    padding: var(--space-xl);
  }

  &-heading {
    max-width: 68ch;
  }

  &-title {
    font-size: var(--font-size-title-sm);
    letter-spacing: -0.02em;
  }

  &-summary {
    margin-top: var(--space-xs);
    color: var(--color-text-cyan-400);
    line-height: 1.55;
  }

  &-stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-block: 1px solid rgba(255, 255, 255, 0.25);

    @include mixins.mq("md") {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  }

  &-stat {
    padding: var(--space-md) var(--space-sm);

    & + & {
      border-left: 1px solid rgba(255, 255, 255, 0.18);
    }
  }

  &-value {
    color: var(--color-cyan-400);
    font-size: var(--font-size-xxl);
    font-weight: 900;
    line-height: 1;
  }

  &-label {
    margin-top: var(--space-xxs);
    color: var(--color-text-cyan-400);
    font-size: var(--font-size-sm);
    line-height: 1.35;
  }

  &-flow {
    display: grid;
    gap: var(--space-sm);

    @include mixins.mq("md") {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &-stage {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-sm);
    padding: var(--space-md);
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: var(--radius-md);

    h4 {
      font-size: var(--font-size-lg);
      line-height: 1.2;
    }

    p {
      margin-top: var(--space-xxs);
      color: var(--color-text-cyan-400);
      font-size: var(--font-size-sm);
      line-height: 1.5;
    }
  }

  &-step {
    color: var(--color-cyan-400);
    font-family: "ProFontWindows", monospace;
    font-size: var(--font-size-sm);
  }

  &-note {
    max-width: 75ch;
    color: var(--color-text-cyan-400);
    font-size: var(--font-size-sm);
    line-height: 1.5;
  }
}
</style>
