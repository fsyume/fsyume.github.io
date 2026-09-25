---
title: 时间线
description: 按发表日期倒序浏览全站文章
---
<script setup>
import { computed } from 'vue'
import posts from 'virtual:posts'

const groups = computed(() => {
  const map = new Map()
  for (const p of posts) {
    if (!p.date) continue
    const year = p.date.slice(0, 4)
    if (!map.has(year)) map.set(year, [])
    map.get(year).push({ ...p, day: p.date.slice(5).replace('-', '/') })
  }
  return [...map.entries()].map(([year, items]) => ({ year, items }))
})
</script>

# 时间线

<div class="tl">
  <section v-for="g in groups" :key="g.year" class="tl-group">
    <h2 class="tl-year">{{ g.year }}</h2>
    <ul class="tl-list">
      <li v-for="p in g.items" :key="p.link" class="tl-item">
        <time class="tl-date">{{ p.day }}</time>
        <a class="tl-title" :href="p.link">{{ p.title }}</a>
        <span class="tl-cat">{{ p.category }}</span>
      </li>
    </ul>
  </section>
</div>

<style scoped>
.tl {
  position: relative;
  margin-top: 2rem;
}
.tl-group {
  position: relative;
  padding-left: 1.5rem;
  border-left: 2px solid var(--vp-c-divider);
}
.tl-group:last-child .tl-list {
  padding-bottom: 0.5rem;
}
.tl-year {
  position: relative;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}
.tl-year::before {
  content: '';
  position: absolute;
  left: -1.95rem;
  top: 0.35rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
}
.tl-list {
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
}
.tl-item {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.35rem 0;
  line-height: 1.4;
}
.tl-item::before {
  content: '';
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin-left: -1.35rem;
  margin-right: -0.15rem;
  border-radius: 50%;
  background: var(--vp-c-text-3);
}
.tl-date {
  flex-shrink: 0;
  width: 3.2rem;
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}
.tl-title {
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}
.tl-title:hover {
  color: var(--vp-c-brand-1);
}
.tl-cat {
  flex-shrink: 0;
  font-size: 0.75rem;
  line-height: 1.6;
  padding: 0 0.5rem;
  border-radius: 99rem;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
@media (max-width: 640px) {
  .tl-item {
    flex-wrap: wrap;
    gap: 0.25rem 0.75rem;
  }
  .tl-date {
    width: auto;
  }
}
</style>
