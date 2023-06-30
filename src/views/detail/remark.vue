<template>
  <div class="remark_contentbox">
    <div v-for="item, i in remarks" :key="item.id" class="item">
      <div class="grid_header">
        <el-avatar :size="33" :src="item.avatar_url" icon="el-icon-user-solid"></el-avatar>
        <div>
          <div>
            <span v-text="item.name" class="name"></span>
            <span v-text="item.remark_at" class="time"></span>
          </div>
          <div class="remark_content">
            <span v-text="item.remark_content" @click="choose(item)"></span>
          </div>
          <template v-if="item.children">
            <transition name="el-zoom-in-top">
              <div v-show="item.isOpen" class="transition-box">
                <div v-for="citem in item.children" :key="citem.id" class="citem">
                  <div class="cgrid_header">
                    <el-avatar :size="30" :src="citem.avatar_url" icon="el-icon-user-solid"></el-avatar>
                    <div>
                      <div>
                        <span class="cname">{{ citem.name }}</span>
                        <template v-if="citem.back_name">
                          <span>
                            <i class="el-icon-caret-right"></i>
                            {{ citem.back_name  }}
                          </span>
                        </template>
                        <span class="time">{{ citem.remark_at }}</span>
                      </div>
                      <div class="remark_content">
                        <span v-text="citem.remark_content" @click="choose(citem)"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </template>
          <div v-if="item.hasChild" class="getMore">
            <template v-if="!item.isOpen || item.children?.length < item.hasChild">
              <el-link class="loadmore" type="info" @click="getMoreRemark(item, i)">{{ moreTip(item) }}</el-link>
            </template>

            <template v-if="item.isOpen">
              <el-link type="info" @click="closeMore(item)">收起</el-link>
            </template>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'remark',
  props: {
    remarks: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    moreTip(item) {
      let msg = `展开${item.hasChild}条评论`
      if (!item.isOpen) {
        return msg
      } else if (item.children?.length && item.children?.length < item.hasChild) {
        msg = '查看更多评论'
      } else {
        msg = ''
      }
      return msg
    },
    choose(item) {
      this.$emit('chooseItem', item)
    },
    getMoreRemark(item, i) {
      if (!item.isOpen && item.children || item.children && item.children.length >= item.hasChild) {
        this.$set(item, 'isOpen', true)
      } else {
        this.$emit('getChildRemark', i)
      }
    },
    closeMore(item) {
      this.$set(item, 'isOpen', false)
    }
  },
}
</script>

<style lang="scss" scoped>
.remark_contentbox {
  .item {
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: var(--bgColorA);
  }

  .grid_header {
    display: grid;
    grid-template-columns: 39px auto;

    .name {
      font-size: 15px;
      margin-right: 7px;
    }

    .time {
      font-size: 12px;

    }

    .remark_content {
      word-break: break-all;
      white-space: pre-wrap;
      line-break: anywhere;

      span {
        cursor: pointer;
      }
    }

    .citem {
      padding: 6px 0 3px;
    }
    .cgrid_header {
      display: grid;
      grid-template-columns: 35px auto;

      .cname {
        font-size: 15px;
      }
      .time {
        margin-left: 6px;
      }
    }

    .getMore {
      position: relative;
      padding-left: 25px;

      &::before {
        position: absolute;
        content: '';
        width: 20px;
        left: 0;
        top: 50%;
        border-top: 1px dotted var(--textColor);
      }
      .loadmore {
        margin-right: 7px;
      }
    }
  }
}
</style>