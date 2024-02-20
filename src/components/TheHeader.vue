<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { navTabs } from '@/data';

const activeTab = ref('Expenses');
</script>

<template>
  <header class="header">
    <span class="header__active-label">{{ activeTab }} </span>
    <ul class="top-nav">
      <router-link
        v-for="tab of navTabs"
        :key="tab"
        :to="{ name: tab, params: { title: tab.toLowerCase() } }"
        class="top-nav__item"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        <span>{{ tab }}</span>
      </router-link>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.2;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: $color-background;
  box-shadow: $box-shadow;
  z-index: 5;
  &__active-label {
    padding: 24px;
    font-size: 3rem;
    font-weight: 900;
    color: $color-text-secondary;
    opacity: 0.5;
    animation: appear 2s ease-in-out forwards;
    @include mobile {
      display: none;
    }
  }
}
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 24px;

  @include mobile {
    margin: 0;
    padding: 4px;
    font-size: 0.5rem;
    flex-wrap: wrap;
  }

  &__item {
    padding: 24px;
    text-transform: uppercase;
    font-size: 1.1rem;
    font-weight: 600;
    color: $color-accent;
    @include mobile {
      font-size: 0.8rem;
      padding: 16px;
    }

    &:hover {
      cursor: pointer;
      color: $color-accent-dark;
      font-weight: 900;
      transition: all 0.2s ease-in;
    }

    &.active {
      font-weight: 900;
      span {
        border-bottom: 2px solid $color-accent;
      }
    }
  }
}
</style>
