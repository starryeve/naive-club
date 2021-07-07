<template>
  <n-card title="活动总览"
          style="margin-bottom: 16px;">
    <n-data-table :columns="commentColumns"
                  :data="activities"
                  :pagination="pagination"
                  :row-key="obj => obj.club_id" />
    <n-modal v-model:show="isClose"
             preset="dialog"
             title="确认"
             content="你确认?"
             positive-text="确认"
             @positive-click="handlePositiveClick"
             @negative-click="handleNegativeClick"
             negative-text="算了">
      <n-input placeholder="请输入评价"
               v-model:value="comment"></n-input>
    </n-modal>
  </n-card>
</template>
<script>
import { h, defineComponent, onMounted, toRefs, reactive } from 'vue'
import { NButton, useMessage, useDialog } from 'naive-ui'
import request from '../../networks/index'


const createCommentColumns = ({ comment }) => {
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
      title: '我的评价',
      key: 'comment',

    },
    {
      title: '评价',
      key: 'comment',
      render (row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => comment(row)
          },
          { default: () => '评价' },
        )
      }
    }
  ]
}


export default defineComponent({
  setup () {
    const info = useMessage()


    let data = reactive({
      activities: [],
      isClose: false,
      comment: '',
      activity_id: 0
    })

    onMounted(() => {
      request({
        url: '/activity/unCommentActivity',
        method: 'post',
        data: {
          teacher_id: sessionStorage.getItem('id')
        }
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
      commentColumns: createCommentColumns({
        comment (rowData) {
          data.isClose = true;
          data.activity_id = rowData.activity_id;

        }
      }),
      pagination: {
        pageSize: 10
      },
      handleNegativeClick () {
        info.warning('取消');
        data.isClose = false;
      },
      handlePositiveClick () {
        info.success('确认');
        request({
          url: '/activity/commentActivity',
          method: 'put',
          data: {
            comment: data.comment,
            activity_id: data.activity_id
          }
        }).then(res => {
          info.success('评价成功！')
          window.location.reload()
        }).catch(err => {
          info.success('出错了')
        })
        data.isClose = false;
      },

      ...toRefs(data)
    }
  }
})
</script>
