(function () {
  const root = document.getElementById('academic-home-app');
  const dataNode = document.getElementById('academic-home-data');

  if (!root || !dataNode || !window.Vue) {
    return;
  }

  let payload;

  try {
    payload = JSON.parse(dataNode.textContent);
  } catch (error) {
    root.innerHTML = '';
    return;
  }

  const { createApp } = window.Vue;

  createApp({
    data() {
      return {
        activePart: 'all',
        activeMode: 'formula',
        content: payload
      };
    },
    computed: {
      parts() {
        return [
          { id: 'all', label: this.content.labels.all },
          ...this.content.parts.map((part) => ({
            id: part.id,
            label: part.shortTitle
          }))
        ];
      },
      chapters() {
        if (this.activePart === 'all') {
          return this.content.parts.flatMap((part) => part.chapters);
        }

        const part = this.content.parts.find((item) => item.id === this.activePart);
        return part ? part.chapters : [];
      },
      activeModeItem() {
        return this.content.modes.find((mode) => mode.id === this.activeMode);
      },
      chapterCount() {
        return this.content.parts.reduce(
          (total, part) => total + part.chapters.length,
          0
        );
      },
      topicCount() {
        return new Set(
          this.content.parts.flatMap((part) =>
            part.chapters.flatMap((chapter) => chapter.tags)
          )
        ).size;
      }
    },
    template: `
      <section class="academic-hero" aria-labelledby="academic-home-title">
        <div>
          <p class="academic-kicker">{{ content.kicker }}</p>
          <h1 id="academic-home-title">{{ content.title }}</h1>
          <p class="academic-lead">{{ content.lead }}</p>
        </div>
        <div class="academic-metrics" aria-label="Project metrics">
          <div class="academic-metric">
            <strong>{{ content.parts.length }}</strong>
            <span>{{ content.labels.parts }}</span>
          </div>
          <div class="academic-metric">
            <strong>{{ chapterCount }}</strong>
            <span>{{ content.labels.chapters }}</span>
          </div>
          <div class="academic-metric">
            <strong>{{ topicCount }}</strong>
            <span>{{ content.labels.topics }}</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="academic-map-title">
        <div class="academic-toolbar">
          <h2 id="academic-map-title">{{ content.labels.mapTitle }}</h2>
          <label>
            <span class="visually-hidden">{{ content.labels.filter }}</span>
            <select class="academic-select" v-model="activePart">
              <option v-for="part in parts" :value="part.id" :key="part.id">
                {{ part.label }}
              </option>
            </select>
          </label>
        </div>

        <div class="academic-map">
          <article
            v-for="chapter in chapters"
            class="academic-card"
            :key="chapter.href"
          >
            <h3>{{ chapter.title }}</h3>
            <p>{{ chapter.summary }}</p>
            <div class="academic-tags" aria-label="Tags">
              <span
                v-for="tag in chapter.tags"
                class="academic-tag"
                :key="chapter.href + tag"
              >
                {{ tag }}
              </span>
            </div>
            <a :href="chapter.href">{{ content.labels.read }}</a>
          </article>
        </div>
      </section>

      <section class="academic-panel academic-derivation" aria-labelledby="academic-mode-title">
        <h2 id="academic-mode-title">{{ content.labels.derivationTitle }}</h2>
        <div class="academic-derivation-body">
          <div class="academic-mode-list">
            <button
              v-for="mode in content.modes"
              class="academic-mode-button"
              type="button"
              :aria-pressed="mode.id === activeMode"
              :key="mode.id"
              @click="activeMode = mode.id"
            >
              <span class="academic-mode-mark">{{ mode.mark }}</span>
              <span>{{ mode.label }}</span>
            </button>
          </div>
          <article class="academic-mode-content">
            <h3>{{ activeModeItem.title }}</h3>
            <p>{{ activeModeItem.body }}</p>
            <pre v-if="activeModeItem.code"><code>{{ activeModeItem.code }}</code></pre>
          </article>
        </div>
      </section>
    `
  }).mount(root);
})();
