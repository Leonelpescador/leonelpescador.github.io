<script setup lang="ts">
import { t } from "../../../i18n/utils/translate";

type Skill = {
  name?: string;
  labelKey?: string;
  icon: string;
  color: string;
};

type SkillGroup = {
  titleKey: string;
  skills: Skill[];
};

const neutralColor = "#ff8400";

const skillGroups: SkillGroup[] = [
  {
    titleKey: "skills-group-foundations",
    skills: [
      { name: "Python", icon: "python", color: "#3776ab" },
      { name: "Java", icon: "java", color: "#e76f00" },
      { name: "JavaScript", icon: "javascript", color: "#f7df1e" },
      { name: "TypeScript", icon: "typescript", color: "#3178c6" },
      { name: "SQL", icon: "sql", color: "#005fad" },
      { name: "HTML5", icon: "html5", color: "#e34f26" },
      { name: "CSS3", icon: "css3", color: "#663399" },
      { name: "XML", icon: "xml", color: "#005fad" },
      { name: "Bash", icon: "bash", color: "#4eaa25" },
      { name: "PowerShell", icon: "powershell", color: "#5391fe" },
    ],
  },
  {
    titleKey: "skills-group-backend",
    skills: [
      { name: "Django", icon: "django", color: "#092e20" },
      { name: "FastAPI", icon: "fastapi", color: "#009688" },
      { name: "Odoo", icon: "odoo", color: "#714b67" },
      { name: "Node.js", icon: "node", color: "#5fa04e" },
      { labelKey: "skills-rest-api", icon: "api", color: neutralColor },
    ],
  },
  {
    titleKey: "skills-group-frontend",
    skills: [
      { name: "Angular", icon: "angular", color: "#dd0031" },
      { name: "Angular Material", icon: "angular-material", color: "#ffa726" },
      { name: "React", icon: "react", color: "#087ea4" },
      { name: "Next.js", icon: "next", color: "#000000" },
      { name: "Vue.js", icon: "vue", color: "#42b883" },
      { name: "React Native", icon: "react-native", color: "#087ea4" },
      { name: "Expo", icon: "expo", color: "#1c2024" },
      { name: "Sass/SCSS", icon: "sass", color: "#cc6699" },
      { name: "Bootstrap", icon: "bootstrap", color: "#7952b3" },
      { name: "Tailwind CSS", icon: "tailwind", color: "#06b6d4" },
      { name: "Three.js", icon: "three", color: "#000000" },
      { name: "Vite", icon: "vite", color: "#9135ff" },
      { name: "WordPress", icon: "wordpress", color: "#21759b" },
    ],
  },
  {
    titleKey: "skills-group-data",
    skills: [
      { name: "PostgreSQL", icon: "postgresql", color: "#4169e1" },
      { name: "MySQL", icon: "mysql", color: "#4479a1" },
      { name: "SQL Server", icon: "sql-server", color: "#cc2927" },
      { name: "MongoDB", icon: "mongodb", color: "#47a248" },
      { name: "SQLite", icon: "sqlite", color: "#003b57" },
      { name: "Firebase Authentication", icon: "firebase", color: "#dd2c00" },
    ],
  },
  {
    titleKey: "skills-group-infrastructure",
    skills: [
      { name: "Docker", icon: "docker", color: "#2496ed" },
      { name: "Linux", icon: "linux", color: "#e5b700" },
      { name: "Kubernetes", icon: "kubernetes", color: "#326ce5" },
      { name: "AWS", icon: "aws", color: "#ff9900" },
      { name: "Azure", icon: "azure", color: "#0078d4" },
      { name: "Cloudflare", icon: "cloudflare", color: "#f38020" },
      { name: "Railway", icon: "railway", color: "#0b0d0e" },
      { name: "Odoo.sh", icon: "odoo-sh", color: "#714b67" },
      { name: "Nginx", icon: "nginx", color: "#009639" },
      { name: "Apache", icon: "apache", color: "#d22128" },
      { name: "MikroTik", icon: "mikrotik", color: "#293239" },
      { name: "Cisco", icon: "cisco", color: "#1ba0d7" },
      { labelKey: "skills-dns-hosting", icon: "hosting", color: neutralColor },
      { labelKey: "skills-network-security", icon: "network", color: neutralColor },
    ],
  },
  {
    titleKey: "skills-group-delivery",
    skills: [
      { name: "Git", icon: "git", color: "#f03c2e" },
      { name: "GitHub", icon: "github", color: "#181717" },
      { name: "GitHub Actions / CI/CD", icon: "github-actions", color: "#2088ff" },
      { name: "Postman", icon: "postman", color: "#ff6c37" },
      { name: "Jira", icon: "jira", color: "#0052cc" },
      { name: "Trello", icon: "trello", color: "#0052cc" },
      { name: "Figma", icon: "figma", color: "#f24e1e" },
      { name: "Canva", icon: "canva", color: "#00c4cc" },
      { name: "Agile", icon: "workflow", color: neutralColor },
      { name: "Scrum", icon: "workflow", color: neutralColor },
      { name: "Kanban", icon: "kanban", color: neutralColor },
      { labelKey: "skills-functional-analysis", icon: "analysis", color: neutralColor },
      { labelKey: "skills-requirements", icon: "requirements", color: neutralColor },
      { labelKey: "skills-software-architecture", icon: "architecture", color: neutralColor },
      { labelKey: "skills-data-migration", icon: "migration", color: neutralColor },
      { labelKey: "skills-deployment", icon: "deployment", color: neutralColor },
      { labelKey: "skills-training", icon: "training", color: neutralColor },
    ],
  },
];

const getSkillLabel = (skill: Skill) => (skill.labelKey ? t(skill.labelKey) : skill.name);
</script>

<template>
  <section id="skills" class="skills-section">
    <div class="skills-content grid">
      <h2 class="skills-title">{{ t("skills-title") }}</h2>
      <p class="skills-intro">{{ t("skills-intro") }}</p>

      <div class="skills-map">
        <section v-for="group in skillGroups" :key="group.titleKey" class="skills-group">
          <h3 class="skills-group-title">{{ t(group.titleKey) }}</h3>
          <ul class="skills-list" role="list">
            <li
              v-for="skill in group.skills"
              :key="skill.name ?? skill.labelKey"
              class="skills-item"
              :style="{ '--skill-brand': skill.color }"
            >
              <svg class="skills-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <use :href="`/static/media/skills.svg#${skill.icon}`"></use>
              </svg>
              <span>{{ getSkillLabel(skill) }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.skills {
  &-section {
    width: 100%;
    position: relative;
    z-index: 1;
    padding: 104px var(--space-outer) 120px;
    scroll-margin-top: calc(var(--height-header) + var(--space-md));
    background-color: var(--color-beige-400);
    color: var(--color-text-400);
    border-top: 1px solid var(--color-grayscale-500);

    &::before {
      content: "";
      position: absolute;
      top: -1px;
      left: var(--space-outer);
      width: clamp(48px, 8vw, 112px);
      height: 4px;
      background-color: var(--color-orange-400);
    }

    @include mixins.mq("md") {
      padding-top: 144px;
      padding-bottom: 152px;
    }
  }

  &-content {
    width: 100%;
    max-width: var(--breakpoint-xxxl);
    row-gap: var(--space-lg);
  }

  &-title {
    grid-column: 1 / 13;
    max-width: 10ch;
    color: var(--color-dark-blue-500);
    font-size: var(--font-size-title-md);
    font-weight: 900;
    line-height: var(--line-height-title);
    letter-spacing: -0.025em;
    text-wrap: balance;

    @include mixins.mq("md") {
      grid-column: 1 / 7;
      font-size: var(--font-size-title-lg);
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 7;
    }
  }

  &-intro {
    grid-column: 1 / 13;
    max-width: 66ch;
    color: var(--color-text-300);
    font-size: var(--font-size-lg);
    line-height: var(--line-height-copy);

    @include mixins.mq("md") {
      grid-column: 7 / 13;
      align-self: end;
    }

    @include mixins.mq("lg") {
      grid-column: 7 / 12;
    }
  }

  &-map {
    grid-column: 1 / 13;
    margin-top: var(--space-xl);
    border-top: 1px solid var(--color-grayscale-500);

    @include mixins.mq("lg") {
      grid-column: 2 / 12;
      margin-top: var(--space-xxl);
    }
  }

  &-group {
    display: grid;
    gap: var(--space-lg);
    padding: var(--space-xl) 0;
    border-bottom: 1px solid var(--color-grayscale-500);

    @include mixins.mq("md") {
      grid-template-columns: minmax(180px, 1fr) minmax(0, 3fr);
      gap: var(--space-xxl);
    }

    &-title {
      max-width: 16ch;
      color: var(--color-dark-blue-500);
      font-size: var(--font-size-xl);
      font-weight: 800;
      line-height: 1.15;
      text-wrap: balance;
    }
  }

  &-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-xs) var(--space-sm);

    @include mixins.mq("md") {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      column-gap: var(--space-lg);
    }

    @include mixins.mq("xl") {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  &-item {
    --skill-brand: var(--color-orange-400);

    min-width: 0;
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: var(--color-text-400);
    font-size: var(--font-size-sm);
    font-weight: 700;
    line-height: 1.25;
    overflow-wrap: anywhere;

    @include mixins.mq("md") {
      font-size: var(--font-size-md);
    }

    @include mixins.hover {
      &:hover .skills-icon {
        color: var(--skill-brand);
        transform: translateY(-1px);
      }
    }
  }

  &-icon {
    width: var(--icon-size-md);
    height: var(--icon-size-md);
    flex: 0 0 var(--icon-size-md);
    color: var(--color-dark-blue-500);
    fill: currentColor;
    transition:
      color 0.18s ease-out,
      transform 0.18s ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skills-icon {
    transition: none;
  }
}
</style>
