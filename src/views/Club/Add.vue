<template>
  <n-card title="添加会员"
          style="margin-bottom: 16px;">
    <n-form-item label="姓名：">
      <n-input placeholder="请输入姓名"
               v-model:value="form.member_name" />
    </n-form-item>
    <n-form-item label="手机：">
      <n-input placeholder="请输入手机号码"
               v-model:value="form.phone" />
    </n-form-item>
    <n-form-item label="性别">
      <n-radio-group v-model:value="form.gender">
        <n-radio :value="0">男</n-radio>
        <n-radio :value="1">女</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="职位：">
      <n-input placeholder="请输入社团职位"
               v-model:value="form.position" />
    </n-form-item>
    <n-form-item label="学号：">
      <n-input placeholder="请输入会员学号"
               v-model:value="form.student_id" />
    </n-form-item>
    <n-form-item label="年份：">
      <n-input placeholder="请输入会员加入社团的年份"
               v-model:value="form.session" />
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