<template>
  <n-card title="我已参与"
          style="margin-bottom: 16px;">
    <n-tabs type="line">
      <n-tab-pane name="oasis"
                  tab="Oasis">
        <n-card :title="a.activity_name"
                hoverable
                v-for="a in activities.unaudited">
          {{a.place}}
          {{a.budget}}
          {{a.title}}
        </n-card>
      </n-tab-pane>
      <n-tab-pane name="the beatles"
                  tab="the Beatles">Hey Jude</n-tab-pane>
      <n-tab-pane name="jay chou"
                  tab="周杰伦">七里香</n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script>
const activities = {
  unaudited: [
    {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    },
    {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    },
    {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    },
    {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    }
  ],
  allowed: [
    {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    }, {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    }, {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    }, {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    }, {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    }
  ],
  disallowed: [
    {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    }, {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    }, {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    }, {
      activity_id: 0,
      activity_name: '阴雨天音乐节',
      place: '大操场',
      budget: 200,
      club_id: 1,
      title: '音乐',
      number: 100,
      head_name: '曾繁浩',
      phone: 17625252525,
      status: 0,
      comment: '！好'
    }
  ],
  held: [

  ]
}
export default {
  setup () {
    return {
      activities
    }
  }
}
</script>
