<template>
  <n-card title="我已参与"
          style="margin-bottom: 16px;">
    <n-card hoverable
            v-for="a in activities">
      <n-gradient-text type="info"
                       :size="45"> {{a.activity_name}} </n-gradient-text>
      <br />
      <n-gradient-text type="danger"
                       :size="40"> 地点：{{a.place}} </n-gradient-text>
      <br />
      <n-gradient-text :size="35"
                       type="warning">
        时间：{{a.time}}
      </n-gradient-text>
      <br />
      <n-gradient-text :size="30"
                       :gradient="{
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }">
        负责人：{{a.head_name}}
      </n-gradient-text>
      <br />
      <n-gradient-text :size="24"
                       type="success"> 手机：{{a.phone}} </n-gradient-text>
    </n-card>
  </n-card>
</template>
<script>
import request from '../../networks/index'
import { reactive, toRefs, onMounted } from 'vue'
export default {
  setup () {
    const data = reactive({
      activities: []
    })
    onMounted(() => {
      request({
        url: '/activity/participateActivity',
        method: 'post',
        data: {
          student_id: sessionStorage.getItem('id')
        }
      }).then(res => {
        console.log(res.data);
        data.activities = res.data.activities;
      }).catch(err => {
        console.log(err);
      })
    })

    return {
      ...toRefs(data)
    }
  }
}
</script>
