<script setup lang="ts">
import { computed, ref } from 'vue';
import Datepicker from 'vue3-datepicker';

defineProps<{
  startDate: Date;
  endDate: Date;
}>();

const inputStyle = computed(() => {
  return {
    border: '1px solid grey',
    padding: '4px 8px',
  };
});
</script>

<template>
  <div class="daterange-picker">
    <Datepicker v-model="startDate" placeholder="Choose start date" :style="inputStyle" typeable />
    <Datepicker v-model="endDate" placeholder="Choose end date" :style="inputStyle" typeable />
  </div>
</template>
<style lang="scss" scoped>
.daterange-picker {
  display: flex;
  gap: 16px;
}
.v3dp__datepicker {
  --vdp-hover-bg-color: #00ddc2;
}
</style>
