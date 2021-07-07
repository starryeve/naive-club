<template>
  <n-card title="社团总览"
          style="margin-bottom: 16px;">
    <n-tabs type="line">
      <n-tab-pane name="audited"
                  tab="已入驻">
        <n-data-table :columns="columns"
                      :data="clubs.audited"
                      :pagination="pagination"
                      :row-key="obj => obj.club_id" />
      </n-tab-pane>
      <n-tab-pane name="unaudited"
                  tab="待审核">
        <n-data-table :columns="auditColumns"
                      :data="clubs.unaudited"
                      :pagination="pagination"
                      :row-key="obj => obj.club_id" />
      </n-tab-pane>
      <n-tab-pane name="disallowed"
                  tab="不通过">
        <n-data-table :columns="columns"
                      :data="clubs.disallowed"
                      :pagination="pagination"
                      :row-key="obj => obj.club_id" />
      </n-tab-pane>
    </n-tabs>
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
    },
    {
      title: '指导老师',
      key: 'teacher_name'
    },
    {
      title: '指导老师工号',
      key: 'teacher_id'
    }
  ]
}
const createAuditColumns = ({ allow, disallow }) => {
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
    },
    {
      title: '指导老师',
      key: 'teacher_name'
    },
    {
      title: '指导老师工号',
      key: 'teacher_id'
    },
    {
      title: '审核',
      key: 'audit',
      render (row) {
        return [h(
          NButton,
          {
            size: 'small',
            onClick: () => allow(row)
          },
          { default: () => '通过' },
        ), h(
          NButton,
          {
            size: 'small',
            onClick: () => disallow(row)
          },
          { default: () => '不通过' },

        )]
      }
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
        url: '/club/getClubList',
        method: 'get'
      }).then(res => {
        const { data: { clubs } } = res;
        data.clubs = clubs;
        console.log(clubs);
        console.log(data);

      }).catch(err => {
        console.log(err);
      })
    })
    return {

      columns: createColumns(),
      auditColumns: createAuditColumns({
        allow (rowData) {
          request({
            url: '/club/auditClub',
            method: 'put',
            data: {
              club_id: rowData.club_id,
              status: 1
            }
          }).then(res => {
            info.success('审核成功')
            window.location.reload()

          }).catch(err => {
            info.success('审核成功')
          })
        },
        disallow (rowData) {
          request({
            url: '/club/auditClub',
            method: 'put',
            data: {
              club_id: rowData.club_id,
              status: 2
            }
          }).then(res => {
            info.success('审核成功')
            window.location.reload()

          }).catch(err => {
            info.success('审核成功')
          })
        }
      }),
      pagination: {
        pageSize: 10
      },
      ...toRefs(data)

    }
  }
})
</script>
