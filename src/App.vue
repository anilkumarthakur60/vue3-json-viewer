<template>
  <div class="comprehensive-demo">
    <h1>Vue3 JSON Viewer - Comprehensive Demo</h1>

    <div class="controls">
      <button
        @click="toggleDarkMode"
        class="control-btn"
      >
        {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
      </button>
      <button
        @click="toggleExpanded"
        class="control-btn"
      >
        {{ isExpanded ? '📁 Collapse All' : '📂 Expand All' }}
      </button>
      <select
        v-model="selectedExample"
        @change="loadExample"
        class="control-select"
      >
        <option value="basic">Basic Object</option>
        <option value="complex">Complex Data</option>
        <option value="api">API Response</option>
        <option value="edge">Edge Cases</option>
        <option value="performance">Performance Test</option>
        <option value="realworld">Real World Data</option>
      </select>
    </div>

    <div class="demo-grid">
      <div class="demo-section">
        <h2>{{ currentExample.title }}</h2>
        <p>{{ currentExample.description }}</p>

        <div class="json-viewer-container">
          <JsonViewer
            :data="currentExample.data"
            :darkMode="isDarkMode"
            :expanded="isExpanded"
            :key="viewerKey"
          />
        </div>
      </div>

      <div class="demo-section">
        <h2>Usage Examples</h2>

        <div class="usage-tabs">
          <button
            v-for="tab in usageTabs"
            :key="tab.id"
            @click="activeUsageTab = tab.id"
            :class="['tab-btn', { active: activeUsageTab === tab.id }]"
          >
            {{ tab.title }}
          </button>
        </div>

        <div class="usage-content">
          <pre><code>{{ currentUsageExample }}</code></pre>
        </div>
      </div>
    </div>

    <div class="features-section">
      <h2>Features Showcase</h2>

      <div class="features-grid">
        <div class="feature-card">
          <h3>🎨 Theming</h3>
          <div class="theme-demo">
            <JsonViewer
              :data="{
                theme: 'Dark theme example',
                colors: ['#e06c75', '#e5c07b', '#98c379'],
              }"
              :darkMode="true"
              :expanded="true"
            />
          </div>
          <div class="theme-demo">
            <JsonViewer
              :data="{
                theme: 'Light theme example',
                colors: ['#d32f2f', '#fbc02d', '#388e3c'],
              }"
              :darkMode="false"
              :expanded="true"
            />
          </div>
        </div>

        <div class="feature-card">
          <h3>📋 Copy Functionality</h3>
          <JsonViewer
            :data="{
              copyable: 'Click the copy icon to copy this data',
              nested: { also: 'copyable' },
            }"
            :darkMode="isDarkMode"
            :expanded="true"
          />
        </div>

        <div class="feature-card">
          <h3>🔍 Data Types</h3>
          <JsonViewer
            :data="dataTypesExample"
            :darkMode="isDarkMode"
            :expanded="true"
          />
        </div>

        <div class="feature-card">
          <h3>🌐 Special Objects</h3>
          <JsonViewer
            :data="specialObjectsExample"
            :darkMode="isDarkMode"
            :expanded="true"
          />
        </div>
      </div>
    </div>

    <div class="composable-section">
      <h2>Composable Usage</h2>
      <div class="composable-demo">
        <div class="composable-controls">
          <button
            @click="composableToggle"
            class="control-btn"
          >
            {{ composableExpanded ? 'Collapse' : 'Expand' }}
          </button>
          <button
            @click="composableCopy"
            class="control-btn"
          >
            Copy {{ composableCopySuccess ? '✓' : '📋' }}
          </button>
          <span class="info">Data Type: {{ composableDataType }}</span>
        </div>
        <JsonViewer
          :data="{ composable: 'example', controlled: 'via useJsonViewer' }"
          :darkMode="isDarkMode"
          :expanded="composableExpanded"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { JsonViewer, useJsonViewer } from './package';
  import './package/style/global.scss';

  // Basic reactive state
  const isDarkMode = ref(true);
  const isExpanded = ref(true);
  const selectedExample = ref('basic');
  const viewerKey = ref(0);
  const activeUsageTab = ref('npm');

  // Composable demo
  const composableData = {
    composable: 'example',
    controlled: 'via useJsonViewer',
  };
  const {
    expanded: composableExpanded,
    copySuccess: composableCopySuccess,
    displayDataType: composableDataType,
    toggle: composableToggle,
    copyNode: composableCopy,
  } = useJsonViewer({
    data: composableData,
    darkMode: isDarkMode.value,
    level: 0,
    parentKey: 'root',
    expanded: false,
  });

  // Example data
  const examples = {
    basic: {
      title: 'Basic Object',
      description: 'Simple JSON object with common data types',
      data: {
        name: 'John Doe',
        age: 30,
        isActive: true,
        hobbies: ['reading', 'coding', 'traveling'],
        address: {
          street: '123 Main St',
          city: 'New York',
          zipCode: '10001',
        },
      },
    },
    complex: {
      title: 'Complex Data Structure',
      description: 'Nested objects with arrays and mixed data types',
      data: {
        users: [
          { id: 1, name: 'Alice', role: 'admin' },
          { id: 2, name: 'Bob', role: 'user' },
        ],
        metadata: {
          version: '1.0.0',
          created: new Date().toISOString(),
          tags: ['production', 'stable'],
          config: {
            debug: false,
            features: {
              darkMode: true,
              analytics: false,
            },
          },
        },
        stats: {
          totalUsers: 1250,
          activeUsers: 892,
          conversionRate: 0.234,
        },
      },
    },
    api: {
      title: 'API Response',
      description: 'Typical REST API response structure',
      data: {
        status: 'success',
        code: 200,
        message: 'Data retrieved successfully',
        data: {
          items: Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            title: `Item ${i + 1}`,
            description: `Description for item ${i + 1}`,
            price: Math.random() * 100,
            inStock: Math.random() > 0.3,
            categories: [`category${(i % 3) + 1}`, `tag${(i % 2) + 1}`],
            metadata: {
              created: new Date(
                Date.now() - Math.random() * 10000000000,
              ).toISOString(),
              updated: new Date().toISOString(),
            },
          })),
          pagination: {
            page: 1,
            limit: 5,
            total: 25,
            hasNext: true,
            hasPrev: false,
          },
        },
        timestamp: new Date().toISOString(),
      },
    },
    edge: {
      title: 'Edge Cases',
      description: 'Special values and edge cases',
      data: {
        emptyString: '',
        emptyArray: [],
        emptyObject: {},
        nullValue: null,
        undefinedValue: undefined,
        zeroNumber: 0,
        falseBoolean: false,
        specialChars: '🚀 Special chars: ñü øæß ♠♣♥♦',
        longString:
          'This is a very long string that should be handled properly by the JSON viewer component without breaking the layout or causing performance issues.',
        deepNesting: {
          level1: {
            level2: {
              level3: {
                level4: {
                  level5: 'Deep value',
                },
              },
            },
          },
        },
      },
    },
    performance: {
      title: 'Performance Test',
      description: 'Large dataset to test performance',
      data: {
        largeArray: Array.from({ length: 100 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
          value: Math.random(),
          nested: {
            property1: `value${i}`,
            property2: i * 2,
            property3: i % 2 === 0,
          },
        })),
        complexObject: Object.fromEntries(
          Array.from({ length: 50 }, (_, i) => [
            `key${i}`,
            {
              id: i,
              data: Array.from({ length: 10 }, (_, j) => `item${j}`),
              metadata: {
                created: new Date().toISOString(),
                index: i,
              },
            },
          ]),
        ),
      },
    },
    realworld: {
      title: 'Real World Example',
      description: 'E-commerce product data with complex structure',
      data: {
        product: {
          id: 'prod_123456789',
          sku: 'LAPTOP-DELL-XPS13',
          name: 'Dell XPS 13 Laptop',
          description: 'High-performance ultrabook with premium build quality',
          price: {
            amount: 1299.99,
            currency: 'USD',
            discounted: {
              amount: 1199.99,
              validUntil: '2024-12-31T23:59:59Z',
            },
          },
          specifications: {
            processor: 'Intel Core i7-1165G7',
            memory: '16GB LPDDR4x',
            storage: '512GB SSD',
            display: {
              size: '13.3 inches',
              resolution: '1920x1200',
              touchscreen: true,
              brightness: 500,
            },
            connectivity: {
              wifi: '802.11ax',
              bluetooth: '5.1',
              ports: ['USB-C', 'Thunderbolt 4', '3.5mm jack'],
            },
            dimensions: {
              width: 295.7,
              depth: 198.7,
              height: 14.8,
              weight: 1.27,
            },
          },
          availability: {
            inStock: true,
            quantity: 15,
            warehouses: [
              { location: 'US-East', stock: 8 },
              { location: 'US-West', stock: 7 },
            ],
            shipping: {
              standard: { days: 5, cost: 9.99 },
              express: { days: 2, cost: 19.99 },
              overnight: { days: 1, cost: 39.99 },
            },
          },
          reviews: {
            average: 4.7,
            count: 1284,
            distribution: {
              5: 856,
              4: 312,
              3: 89,
              2: 18,
              1: 9,
            },
          },
          metadata: {
            created: '2023-01-15T10:30:00Z',
            updated: '2024-01-10T15:45:00Z',
            version: 3,
            tags: ['laptop', 'ultrabook', 'premium', 'business'],
            seo: {
              title: 'Dell XPS 13 - Premium Ultrabook | Best Buy',
              description:
                'Shop the Dell XPS 13 ultrabook with Intel i7 processor...',
              keywords: ['dell xps 13', 'ultrabook', 'laptop', 'intel i7'],
            },
          },
        },
      },
    },
  };

  const currentExample = computed(
    () => examples[selectedExample.value as keyof typeof examples],
  );

  // Data type examples
  const dataTypesExample = {
    string: 'Hello World',
    number: 42,
    float: 3.14159,
    boolean: true,
    null: null,
    array: [1, 2, 3, 'mixed', true],
    object: { nested: 'value' },
  };

  const specialObjectsExample = {
    date: new Date(),
    regex: /pattern/gi,
    map: new Map([
      ['key1', 'value1'],
      ['key2', 'value2'],
    ]),
    set: new Set([1, 2, 3, 4, 5]),
  };

  // Usage examples
  const usageTabs = [
    { id: 'npm', title: 'NPM' },
    { id: 'cdn', title: 'CDN' },
    { id: 'esm', title: 'ESM' },
    { id: 'composable', title: 'Composable' },
  ];

  const usageExamples = {
    npm: `// Install via NPM
npm install @anilkumarthakur/vue3-json-viewer

// Import and use
import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer'
import '@anilkumarthakur/vue3-json-viewer/styles.css'

// In your component
<JsonViewer 
  :data="jsonData" 
  :darkMode="true" 
  :expanded="true" 
/>`,

    cdn:
      `<!-- Include via CDN -->
<script src="https://unpkg.com/vue@3"><` +
      `/script>
<script src="https://unpkg.com/@anilkumarthakur/vue3-json-viewer"><` +
      `/script>
<link rel="stylesheet" href="https://unpkg.com/@anilkumarthakur/vue3-json-viewer/dist/index.css">

<script>
const { createApp } = Vue;
const { JsonViewer } = Vue3JsonViewer;

createApp({
  components: { JsonViewer },
  data() {
    return {
      jsonData: { hello: 'world' }
    }
  }
}).mount('#app');
<` +
      `/script>`,

    esm: `// ES Module import
import { JsonViewer, useJsonViewer } from '@anilkumarthakur/vue3-json-viewer'

// Tree-shaking friendly
import JsonViewer from '@anilkumarthakur/vue3-json-viewer/dist/JsonViewer'

// Dynamic import
const { JsonViewer } = await import('@anilkumarthakur/vue3-json-viewer')`,

    composable: `// Using the composable
import { useJsonViewer } from '@anilkumarthakur/vue3-json-viewer'

const {
  expanded,
  copySuccess,
  isObject,
  toggle,
  copyNode,
  formatValue
} = useJsonViewer({
  data: jsonData,
  darkMode: true,
  expanded: false
})`,
  };

  const currentUsageExample = computed(
    () => usageExamples[activeUsageTab.value as keyof typeof usageExamples],
  );

  // Methods
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
    viewerKey.value++; // Force re-render
  };

  const loadExample = () => {
    viewerKey.value++; // Force re-render when example changes
  };

  onMounted(() => {
    console.log('Vue3 JSON Viewer Demo loaded');
  });
</script>

<style scoped>
  .comprehensive-demo {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .control-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .control-btn:hover {
    background: #f5f5f5;
    transform: translateY(-1px);
  }

  .control-select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: white;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .demo-section {
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    padding: 1.5rem;
    background: white;
  }

  .json-viewer-container {
    border: 1px solid #e1e5e9;
    border-radius: 6px;
    padding: 1rem;
    background: #f8f9fa;
    max-height: 500px;
    overflow: auto;
  }

  .usage-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tab-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    border-radius: 4px 4px 0 0;
  }

  .tab-btn.active {
    background: #007acc;
    color: white;
    border-color: #007acc;
  }

  .usage-content {
    background: #f8f9fa;
    border: 1px solid #e1e5e9;
    border-radius: 0 6px 6px 6px;
    padding: 1rem;
  }

  .usage-content pre {
    margin: 0;
    white-space: pre-wrap;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .features-section {
    margin: 3rem 0;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .feature-card {
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    padding: 1.5rem;
    background: white;
  }

  .theme-demo {
    margin: 1rem 0;
    border: 1px solid #e1e5e9;
    border-radius: 4px;
    padding: 0.5rem;
  }

  .composable-section {
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    padding: 1.5rem;
    background: white;
  }

  .composable-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  .info {
    padding: 0.25rem 0.5rem;
    background: #f0f0f0;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .demo-grid {
      grid-template-columns: 1fr;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }

    .controls {
      flex-direction: column;
    }

    .usage-tabs {
      flex-wrap: wrap;
    }
  }
</style>
