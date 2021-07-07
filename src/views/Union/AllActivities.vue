<template>
  <n-card title="活动总览"
          style="margin-bottom: 16px;">
    <n-tabs type="line">
      <n-tab-pane name="unaudited"
                  tab="待审核">
        <n-data-table :columns="auditColumns"
                      :data="activities.unaudited"
                      :pagination="pagination"
                      :row-key="obj => obj.club_id" />
      </n-tab-pane>
      <n-tab-pane name="audited"
                  tab="已通过">
        <n-data-table :columns="columns"
                      :data="activities.audited"
                      :pagination="pagination"
                      :row-key="obj => obj.club_id" />
      </n-tab-pane>
      <n-tab-pane name="disallowed"
                  tab="不通过">
        <n-data-table :columns="columns"
                      :data="activities.disallowed"
                      :pagination="pagination"
                      :row-key="obj => obj.club_id" />
      </n-tab-pane>
      <n-tab-pane name="held"
                  tab="已举办">
        <n-data-table :columns="commentColumns"
                      :data="activities.held"
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
      title: '经费',
      key: 'budget'
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

  ]
}
const createCommentColumns = () => {
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
      title: '经费',
      key: 'budget'
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
      title: '教师评价',
      key: 'comment'
    }
  ]
}
const createAuditColumns = ({ allow, disallow }) => {
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
      title: '经费',
      key: 'budget'
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
      columns: createColumns(),
      commentColumns: createCommentColumns(),
      auditColumns: createAuditColumns({
        allow (rowData) {

          request({
            url: '/activity/auditActivity',
            method: 'put',
            data: {
              activity_id: rowData.activity_id,
              status: 1
            }
          }).then(res => {
            info.success('审核成功')
            window.location.reload()
          }).catch(err => {
            info.success('审核失败')
          })
        },
        disallow (rowData) {

          request({
            url: '/activity/auditActivity',
            method: 'put',
            data: {
              activity_id: rowData.activity_id,
              status: 1
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
