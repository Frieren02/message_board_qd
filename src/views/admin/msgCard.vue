<template>
  <div class="msgCard_box" :style="cardBg" @click="toDetail">
    <div class="header">
      <el-avatar :size="33" :src="item.avatar_url" icon="el-icon-user-solid"></el-avatar>
      <span v-text="item.name" :style="textColor"></span>
    </div>
    <div class="content">
      <div v-html="item.content" :style="textColor" class="text_content"></div>
    </div>
    <div class="footer">
      <span v-text="item.create_time" class="time" :style="textColor"></span>
      <div class="like_box">
        <svg-icon :icon-file-name="item.like_count ? 'heart_light' : 'heart_dark'"></svg-icon>
        <span class="count">{{ item.like_count ? item.like_count > 99 ? "99+" : item.like_count : '0' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'msgCard',
    props: {
      item: {
        type: Object,
        required: true
      },
      bgColor: {
        required: true
      }
    },
    data() {
        return {
            
        }
    },
    computed: {
      cardBg() {
        let option = {
          'background-color': this.bgColor
        }
        if (this.item.bg_url) {
          let obj = {
            'background-image': `url('${this.item.bg_url}')`,
            'background-position': 'center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            '-webkit-filter': 'opacity(90%)',
            'filter': 'opacity(90%)',
          }
          Object.assign(option, obj)
        }
        return option
      },
      textColor() {
        return this.item?.text_color ?
          { color: this.item.text_color } : {}
      }
    },
    methods: {
      toDetail() {
        this.$router.push({
          path: `/commonDetail/${this.item.content_id}`
        })
      }
    },
}
</script>

<style lang="scss" scoped>
.msgCard_box {
  position: absolute;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  top: 0;
  padding: 5px;
  display: grid;
  grid-template-rows: 33px auto 19px;
  cursor: pointer;
  transition: all .3s;
  &:hover {
    transform: translate(2px,-2px);
    box-shadow: -2px 3px 2px 1px rgba(0,0,0,0.5);
  }
  .header {
    display: grid;
    grid-template-columns: 45px auto;
    align-items: center;
  }
  .content {
    padding: 1px 5px 10px;
    height: calc(100% - 11px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .text_content {
      word-break:break-all;
      white-space:pre-wrap;
      line-break: anywhere;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      text-overflow:ellipsis;
    }
  }
  .footer {
    display: grid;
    grid-template-columns: auto 50px;
    align-items: end;
    .time {
      font-size: 12px;
    }
    .like_box {
      font-size: 15px;
      background-color: var(--bgColor);
      border-radius: 99px;
      text-align: center;
      .count {
        font-size: 14px;
        color: var(--textColor);
      }
    }
  }
}
</style>