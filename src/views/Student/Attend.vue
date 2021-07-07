<template>
  <n-card title="活动总览"
          style="margin-bottom: 16px;">
    <n-data-table :columns="attendColumns"
                  :data="activities.audited"
                  :pagination="pagination"
                  :row-key="obj => obj.club_id" />
  </n-card>
</template>
<script>
import { h, defineComponent, onMounted, toRefs, reactive } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import request from '../../networks/index'


const createAttendColumns = ({ attend }) => {
  return [
    {
      title: '活动',
      key: 'activity_name'
    },
    {
      title: '地点',
      key: 'place'
    },
    {
      title: '时间',
      key: 'time'
    },

    {
      title: '主题',
      key: 'title'
    },
    {
      title: '负责人',
      key: 'head_name'
    },
    {
      title: '负责人手机',
      key: 'phone'
    },
    {
      title: '',
      key: 'attend',
      render (row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => attend(row)
          },
          { default: () => '我要报名' },
        )
      }
    }
  ]
}


export default defineComponent({
  setup () {
    const info = useMessage()
    let data = reactive({
      activities: []
    })

    onMounted(() => {
      request({
        url: '/activity/getActivityList',
        method: 'get'
      }).then(res => {
        const { data: { activities } } = res;
        data.activities = activities;
        console.log(activities);
        console.log(data);

      }).catch(err => {
        console.log(err);
      })
    })
    return {

      attendColumns: createAttendColumns({
        attend (rowData) {
          request({
            url: '/activity/attendActivity',
            method: 'post',
            data: {
              activity_id: rowData.activity_id,
              student_id: sessionStorage.getItem('id')
            }
          }).then(res => {
            const { data: { error } } = res;
            if (error) {
              return info.error('不能重复报名！')
            }
            info.success('报名成功')
            setTimeout(() => {
              window.location.reload()
            }, 1000);
          }).catch(err => {
            info.success('报名失败')
          })
        },

      }),
      pagination: {
        pageSize: 10
      },
      ...toRefs(data)
    }
  }
})
</script>
