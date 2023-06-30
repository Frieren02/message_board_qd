<template>
  <div class="msgCard_box" :style="cardBg" @click="toDetail">
    <div class="header">
      <el-tooltip :effect="night ? 'light' : 'dark'" :content="tip" placement="top">
        <i :class="icon" @click.stop="changePrivacy"></i>
      </el-tooltip>
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
import { changePrivacy } from '@/api/myServer.js'
import { mapState } from 'vuex'

export default {
  name: 'msgCardMy',
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
      valid: true,
    }
  },
  computed: {
    ...mapState({
      night: (state) => state.page.theme,
    }),
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
    },
    icon() {
      return this.item.privacy == 1 ? 'el-icon-lock' : 'el-icon-unlock'
    },
    tip() {
      return this.item.privacy == 1 ? '私密' : '公开'
    }
  },
  methods: {
    toDetail() {
      this.$router.push({
        path: `/commonDetail/${this.item.content_id}`,
        query: {
          type: 'my'
        }
      })
    },
    changePrivacy() {
      if (!this.valid) {
        return
      }
      this.valid = false
      const privacy = this.item.privacy == 1 ? 0 : 1
      const content_id = this.item.content_id
      const newprivacytip = this.item.privacy == 1 ? '公开' : '私密'
      changePrivacy({ privacy, content_id }).then((res) => {
        if (res.code == 200) {
          this.$set(this.item,'privacy',privacy)
          this.$message.success(`已设置为${newprivacytip}`)
        }
      }).finally(() => {
        this.valid = true
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
    transform: translate(2px, -2px);
    box-shadow: -2px 3px 2px 1px rgba(0, 0, 0, 0.5);
  }


  .content {
    padding: 1px 5px 10px;
    height: calc(100% - 11px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .text_content {
      word-break: break-all;
      white-space: pre-wrap;
      line-break: anywhere;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      text-overflow: ellipsis;
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