<template>
  <div class="page-index">
    <el-form ref="form" :model="Form" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="Form.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="Form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="Form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
        </el-col>
        <el-col :span="2" class="line">
          -
        </el-col>
        <el-col :span="11">
          <el-time-picker v-model="Form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="Form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="Form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="Form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="Form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          Create
        </el-button>
        <el-button @click="onCancel">
          Cancel
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

definePageMeta({
  key: route => route.fullPath,
  name: 'form',
  title: 'form',
  icon: 'Edit',
  index: 2,
  sidebar: true,
  layout: 'dashboard'
})

const Form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const onSubmit = () => {
  ElMessage('submit!')
}

const onCancel = () => {
  ElMessage({
    message: 'cancel!',
    type: 'warning'
  })
}
</script>

<style lang="scss" scoped>
.page-index {
  padding-top: 60px;
  text-align: center;
}

.line {
  text-align: center;
}
</style>
