<template>
  <n-card title="活动申请"
          style="margin-bottom: 16px;">
    <n-form-item label="标题：">
      <n-input placeholder="请输入活动标题"
               v-model:value="form.activity_name" />
    </n-form-item>
    <n-form-item label="地点：">
      <n-input placeholder="请输入活动地点"
               v-model:value="form.place" />
    </n-form-item>
    <n-form-item label="时间：">
      <n-input placeholder="请输入活动时间"
               v-model:value="form.time" />
    </n-form-item>
    <n-form-item label="经费：">
      <n-input placeholder="请输入活动经费"
               v-model:value="form.budget" />
    </n-form-item>
    <n-form-item label="主题：">
      <n-input placeholder="请输入活动主题"
               v-model:value="form.title" />
    </n-form-item>
    <n-form-item label="负责人：">
      <n-input placeholder="请输入活动负责人"
               v-model:value="form.head_name" />
    </n-form-item>
    <n-form-item label="phone：">
      <n-input placeholder="请输入负责人手机号"
               v-model:value="form.phone" />
    </n-form-item>
    <n-button type="primary">添加</n-button>
  </n-card>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {

    const form = ref({
      member_name: null,
      phone: null,
      gender: null,
      position: null,
      student_id: null,
      session: null,
      club_id: null
    })

    const add = () => {
      console.log(loginForm);
    }



    return {

      form,
      add,


    }
  }
}
</script>

<style>
</style>