<script setup lang="ts">
withDefaults(
  defineProps<{
    amount: number;
    currency: string;
    size?: 'default' | 'large' | 'small';
  }>(),
  {
    size: 'default',
  },
);
</script>

<template>
  <div class="price-item">
    <span
      class="price-item__amount"
      :class="{ large: size === 'large', small: size === 'small' }"
      >{{ amount }}</span
    >

    <span class="price-item__currency" :class="{ [size]: size }">{{ currency }}</span>
  </div>
</template>

<style lang="scss" scoped>
.price-item {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 4px;
  font-weight: 500;
  &__amount {
    font-size: 1.3rem;
    @include mobile {
      font-size: 1rem;
    }
    &.large {
      font-size: 1.8rem;
      font-weight: 700;
    }
    &.small {
      font-size: 1rem;
    }
  }
  &__currency {
    font-size: 0.6rem;
    color: $color-text-secondary;
    &.large {
      font-size: 1rem;
      color: $color-reverse;
    }
    &.small {
      font-size: 1rem;
    }
  }
}
</style>
