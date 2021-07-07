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
      <n-input-number placeholder="请输入活动经费，0~999"
                      v-model:value="form.budget"
                      :min="0"
                      :max="9999" />
    </n-form-item>
    <n-form-item label="主题：">
      <n-input placeholder="请输入活动主题"
               v-model:value="form.title" />
    </n-form-item>
    <n-form-item label="负责人：">
      <n-input placeholder="请输入活动负责人"
               v-model:value="form.head_name" />
    </n-form-item>
    <n-form-item label="手机号：">
      <n-input placeholder="请输入负责人手机号"
               v-model:value="form.phone" />
    </n-form-item>
    <n-button type="primary"
              @click="handleApply">添加</n-button>
  </n-card>
</template>

<script>
import { ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui'
import request from '../../networks/index'
export default {
  setup () {
    const dialog = useDialog();
    const info = useMessage();
    const form = ref({
      activity_name: null,
      place: null,
      time: null,
      budget: null,
      title: null,
      head_name: null,
      phone: null,
      comment: '',
      status: 0,
      club_id: sessionStorage.getItem('id')
    })

    const handleApply = () => {
      dialog.success({
        title: '确认',
        content: '你要申请这个活动吗？',
        positiveText: '是的',
        negativeText: '不要了',
        onPositiveClick: () => {
          request({
            url: 'activity/applyActivity',
            method: 'post',
            data: form.value
          }).then(res => {
            console.log(res);
            info.success('已提交申请')
            window.location.reload();
          }).catch(err => {
            console.log(err);
            info.error('申请失败')
          })
        },
        onNegativeClick: () => {
          info.success('不确定')
        }
      })
    }



    return {

      form,
      handleApply


    }
  }
}
</script>

<style>
</style>