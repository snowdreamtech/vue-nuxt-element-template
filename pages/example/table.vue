<template>
  <div class="page-index">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template #default="{ row }">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template #default="{ row }">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template #default="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template #default="{ row }">
          {{ row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="110" align="center">
        <template #default="{ row }">
          <el-tag :type="statusFilter(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template #default="{ row }">
          <i class="el-icon-time" />
          <span>{{ row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

  
<script setup lang="ts">
import { getList } from '@/api/table'

definePageMeta({
  key: (route) => route.fullPath,
  name: "table",
  title: "table",
  icon: "Grid",
  index: 0,
  sidebar: true,
  layout: "dashboard",
});

const list = ref()

const listLoading = ref(true)

onMounted(() => {
  fetchData()
})

const statusMap = {
  published: 'success',
  draft: 'gray',
  deleted: 'danger'
} as SSObject


const statusFilter = (status: string):any => {
  return statusMap[status]
};

const fetchData = async () => {
  listLoading.value = true
  getList({}).then(response => {
    // console.log(response.data.items)
    list.value = response.data.items
    listLoading.value = false
  })
}
</script>

<style lang="scss" scoped>
.page-index {
  padding-top: 60px;
  text-align: center;
}
</style>
