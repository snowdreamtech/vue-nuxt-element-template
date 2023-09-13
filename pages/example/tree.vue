<template>
  <div class="page-index">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2Ref"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,
  name: 'Tree',
  title: 'Tree',
  icon: 'Expand',
  index: 1,
  sidebar: true,
  layout: 'dashboard'
})

const tree2Ref = ref()

const defaultProps = reactive({
  children: 'children',
  label: 'label'
})

const filterText = ref('')

const data2 = reactive([{
  id: 1,
  label: 'Level one 1',
  children: [{
    id: 4,
    label: 'Level two 1-1',
    children: [{
      id: 9,
      label: 'Level three 1-1-1'
    }, {
      id: 10,
      label: 'Level three 1-1-2'
    }]
  }]
}, {
  id: 2,
  label: 'Level one 2',
  children: [{
    id: 5,
    label: 'Level two 2-1'
  }, {
    id: 6,
    label: 'Level two 2-2'
  }]
}, {
  id: 3,
  label: 'Level one 3',
  children: [{
    id: 7,
    label: 'Level two 3-1'
  }, {
    id: 8,
    label: 'Level two 3-2'
  }]
}])

const filterNode = (value: any, data: any) => {
  if (!value) { return true }
  return data.label.includes(value)
}

watch(filterText, (newFilterText, oldFilterText) => {
  tree2Ref.value.filter(newFilterText)
})
</script>

<style lang="scss" scoped>
.page-index {
  padding-top: 60px;
  text-align: center;
}
</style>
