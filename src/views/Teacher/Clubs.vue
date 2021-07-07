<template>
  <n-card title="社团总览"
          style="margin-bottom: 16px;">
    <n-data-table :columns="columns"
                  :data="clubs"
                  :pagination="pagination"
                  :row-key="obj => obj.club_id" />
  </n-card>
</template>
<script>
import { h, defineComponent, onMounted, toRefs, reactive } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import request from '../../networks/index'

const createColumns = () => {
  return [
    {
      title: '社团名称',
      key: 'club_name'
    },
    {
      title: '社长',
      key: 'president'
    },
    {
      title: '社长学号',
      key: 'president_id'
    }

  ]
}

export default defineComponent({
  setup () {
    const info = useMessage()
    let data = reactive({
      clubs: []
    })

    onMounted(() => {
      request({
        url: '/club/getGuideClubList',
        method: 'post',
        data: {
          teacher_id: sessionStorage.getItem('id')
        }
      }).then(res => {
        const { data: { clubs } } = res;
        data.clubs = clubs;
      }).catch(err => {
        console.log(err);
      })
    })
    return {

      columns: createColumns(),
      pagination: {
        pageSize: 10
      },
      ...toRefs(data)

    }
  }
})
</script>
