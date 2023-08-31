<template>
  <div class="page-index">
    <Logos />
    <Examples />
    <div>
    <form>
      <select v-model="locale">
        <option value="zh">zh</option>
        <option value="en">en</option>
        <option value="es">es</option>
        <option value="ja">ja</option>
      </select>
      <p>{{ $t('welcome') }}</p>
      <p>{{ $t('route.dashboard') }}</p>
    </form>
  </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

console.log(locale.value)
console.log(useI18n())
definePageMeta({
    key: (route) => route.fullPath,
    name: "dashboard",
    title: "dashboard",
    icon: "Compass",
    index: 0,
    sidebar: true,
    layout: "dashboard",
});
</script>

<style>
.page-index {
  padding-top: 60px;
  text-align: center;
}
</style>
