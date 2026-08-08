<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { t } from "../../../i18n/utils/translate";

const sectionRef = ref<HTMLElement | null>(null);
const triggers: ScrollTrigger[] = [];

const experiences = [
  {
    companyKey: "exp1-company",
    dateKey: "exp1-date",
    roleKey: "exp1-role",
    bulletsKeys: ["exp1-b1", "exp1-b2", "exp1-b3", "exp1-b4"],
    current: true,
    typeKey: "exp1-type",
  },
  {
    companyKey: "exp3-company",
    dateKey: "exp3-date",
    roleKey: "exp3-role",
    bulletsKeys: ["exp3-b1", "exp3-b2", "exp3-b3", "exp3-b4"],
    current: true,
    typeKey: "exp3-type",
  },
  {
    companyKey: "exp2-company",
    dateKey: "exp2-date",
    roleKey: "exp2-role",
    bulletsKeys: ["exp2-b1", "exp2-b2", "exp2-b3", "exp2-b4"],
    current: false,
    typeKey: "exp2-type",
  },
];

onMounted(() => {
  if (!sectionRef.value) return;

  const revealElements = sectionRef.value.querySelectorAll("[data-reveal]");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(revealElements, { clearProps: "all" });
    return;
  }

  revealElements.forEach((el) => {
    gsap.set(el, { opacity: 0, y: 40 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      },
    });
    triggers.push(trigger);
  });
});

onUnmounted(() => {
  triggers.forEach((trigger) => trigger.kill());
});
</script>

<template>
  <section id="journey" class="about-extended" ref="sectionRef">
    <div class="about-extended-content grid">
      <div class="about-extended-header" data-reveal>
        <span class="about-extended-label">{{ t("journey") }}</span>
        <h2 class="about-extended-title">{{ t("journey-title") }}</h2>
        <div class="about-extended-underline"></div>
      </div>

      <div class="about-extended-bio" data-reveal>
        <p class="about-extended-bio-text" v-html="t('journey-bio1')"></p>
        <p class="about-extended-bio-text" v-html="t('journey-bio2')"></p>
        <p class="about-extended-bio-text" v-html="t('journey-bio3')"></p>
      </div>

      <div class="about-extended-experience" data-reveal>
        <h3 class="about-extended-section-title">{{ t("experience-title") }}</h3>
        <p class="about-extended-experience-context">{{ t("experience-context") }}</p>
        <div class="about-extended-timeline">
          <div v-for="exp in experiences" :key="exp.companyKey" class="about-extended-card">
            <div class="about-extended-card-top">
              <span class="about-extended-card-company">
                {{ t(exp.companyKey) }}
                <span v-if="exp.current" class="about-extended-card-current">{{ t("experience-current") }}</span>
              </span>
              <span class="about-extended-card-date">{{ t(exp.dateKey) }}</span>
            </div>
            <span class="about-extended-card-type">{{ t(exp.typeKey) }}</span>
            <p class="about-extended-card-role">{{ t(exp.roleKey) }}</p>
            <p class="about-extended-card-location">{{ t("experience-location") }}</p>
            <ul class="about-extended-card-list">
              <li v-for="bullet in exp.bulletsKeys" :key="bullet">{{ t(bullet) }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="about-extended-education" id="education">
        <h3 class="about-extended-section-title">{{ t("education-title") }}</h3>
        <div class="about-extended-card">
          <div class="about-extended-card-top">
            <span class="about-extended-card-company">{{ t("edu-degree") }}</span>
            <span class="about-extended-card-date">{{ t("edu-date") }}</span>
          </div>
          <p class="about-extended-card-role">{{ t("edu-institution") }}</p>
          <p class="about-extended-card-location">{{ t("edu-location") }}</p>
          <span class="about-extended-edu-badge">{{ t("edu-badge") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-extended {
  width: 100%;
  background-color: var(--color-beige-500);
  color: var(--color-text-400);
  padding: 104px var(--space-outer) 120px;
  position: relative;
  z-index: 1;
  scroll-margin-top: calc(var(--height-header) + var(--space-md));

  @include mixins.mq("md") {
    padding-top: 144px;
    padding-bottom: 160px;
  }

  &-content {
    width: 100%;
    max-width: calc(var(--breakpoint-xxxl));
    row-gap: var(--space-xxl);
  }

  &-header {
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);

    @include mixins.mq("md") {
      grid-column: 1 / 6;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 6;
    }
  }

  &-label {
    font-size: var(--font-size-sm);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-300);
  }

  &-title {
    font-size: var(--font-size-title-md);
    font-weight: 900;
    line-height: var(--line-height-title);

    @include mixins.mq("md") {
      font-size: var(--font-size-title-lg);
    }
  }

  &-underline {
    width: 48px;
    height: 3px;
    background-color: var(--color-orange-400);
    border-radius: var(--radius-sm);
    margin-top: var(--space-xs);
  }

  &-bio {
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);

    @include mixins.mq("md") {
      grid-column: 6 / 13;
    }

    @include mixins.mq("lg") {
      grid-column: 7 / 12;
    }

    &-text {
      font-size: var(--font-size-lg);
      line-height: var(--line-height-copy);
      color: var(--color-text-400);

      :deep(.hi) {
        color: var(--color-dark-blue-500);
        font-weight: 700;
      }
    }
  }

  &-section-title {
    font-size: var(--font-size-title-sm);
    font-weight: 800;
    margin-bottom: var(--space-sm);

    @include mixins.mq("md") {
      font-size: var(--font-size-title-md);
    }
  }

  &-experience {
    grid-column: 1 / 13;
    margin-top: var(--space-xl);

    @include mixins.mq("md") {
      grid-column: 1 / 13;
    }

    &-context {
      max-width: 68ch;
      margin-top: calc(var(--space-sm) * -1);
      margin-bottom: var(--space-lg);
      color: var(--color-text-300);
      line-height: 1.55;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 12;
    }
  }

  &-timeline {
    display: flex;
    flex-direction: column;
    position: relative;
    border-bottom: 1px solid var(--color-grayscale-500);
  }

  &-card {
    border-top: 1px solid var(--color-grayscale-500);
    padding: var(--space-lg) 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-xs) var(--space-lg);

    @include mixins.mq("md") {
      grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1.7fr);
      padding: var(--space-xl) 0;
    }

    &-top {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-sm);

      @include mixins.mq("md") {
        grid-column: 1;
        grid-row: 1;
      }
    }

    &-company {
      font-size: var(--font-size-lg);
      font-weight: 800;
      color: var(--color-text-400);
    }

    &-current {
      display: inline-block;
      margin-left: var(--space-xs);
      padding: 2px 8px;
      background-color: var(--color-orange-400);
      color: var(--color-black-400);
      font-size: var(--font-size-xs);
      font-weight: 800;
      text-transform: uppercase;
      border-radius: 100px;
      vertical-align: middle;
    }

    &-type {
      align-self: flex-start;
      color: var(--color-text-300);
      font-size: var(--font-size-sm);
      font-weight: 700;

      @include mixins.mq("md") {
        grid-column: 1;
        grid-row: 2;
      }
    }

    &-date {
      font-size: var(--font-size-sm);
      font-weight: 700;
      color: var(--color-text-300);
    }

    &-role {
      font-size: var(--font-size-xl);
      font-weight: 800;
      color: var(--color-dark-blue-500);

      @include mixins.mq("md") {
        grid-column: 2;
        grid-row: 1;
      }
    }

    &-location {
      font-size: var(--font-size-sm);
      color: var(--color-text-300);

      @include mixins.mq("md") {
        grid-column: 2;
        grid-row: 2;
      }
    }

    &-list {
      list-style-type: disc;
      padding-left: 1.4em;
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      margin-top: var(--space-xs);

      @include mixins.mq("md") {
        grid-column: 2;
        grid-row: 3;
      }

      li {
        font-size: var(--font-size-md);
        line-height: var(--line-height-copy);
      }
    }
  }

  &-education {
    grid-column: 1 / 13;
    margin-top: var(--space-xl);
    scroll-margin-top: calc(var(--height-header) + var(--space-md));

    @include mixins.mq("md") {
      grid-column: 1 / 10;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 10;
    }

    > .about-extended-card {
      border-bottom: 1px solid var(--color-grayscale-500);
    }
  }

  &-edu-badge {
    display: inline-flex;
    align-self: flex-start;
    margin-top: var(--space-xs);
    padding: var(--space-xxs) var(--space-sm);
    background-color: var(--color-dark-blue-500);
    color: var(--color-white-400);
    font-size: var(--font-size-sm);
    font-weight: 800;
    border-radius: var(--radius-sm);
  }
}
</style>
