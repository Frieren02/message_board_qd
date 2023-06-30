<template>
  <div class="bg" :class="{
    'night': !night,
    'daytime': night,
    'bg1': num == 1,
    'bg2': num == 2,
    'bg3': num == 3,
  }">
    <headerContainer />
    <div class="content_box">
      <!-- 路由组件 -->
      <router-view></router-view>
    </div>
    <div class="Switch_topic">
      <el-tooltip :effect="night ? 'light' : 'dark'" content="切换主题" placement="right-end">
        <svg-icon :icon-file-name="btnName" @click.native="changeTheme"></svg-icon>
      </el-tooltip>
    </div>
    <div class="add_msg">
      <el-tooltip :effect="night ? 'light' : 'dark'" content="发布留言" placement="right-end">
        <svg-icon :icon-file-name="btnAddName" @click.native="addMsg"></svg-icon>
      </el-tooltip>
    </div>
  </div>
</template>
  
<script>
import headerContainer from '../views/header/index.vue'
import { mapState } from 'vuex'

export default {
  name: 'userpage',
  components: {
    headerContainer
  },
  data() {
    return {
      num: 1,
      btnName: 'sun',
      btnAddName: 'add_w'
    }
  },
  computed: {
    ...mapState({
      night: (state) => state.page.theme,
    }),

  },
  created() {
    this.setBg()
  },
  watch: {
    night: {
      handler: function (val) {
        val ? this.btnName = 'sun' : this.btnName = 'moon_'
        val ? this.btnAddName = 'add_b' : this.btnAddName = 'add_w'
        const pic = Math.floor(Math.random() * 3) + 1;
        this.num = pic
      },
      immediate: true
    }
  },
  methods: {
    setBg() {
      const now = new Date();
      const hour = now.getHours();
      this.$store.dispatch('page/changeTheme', hour >= 6 && hour < 18 ? 1 : 0)
    },
    changeTheme() {
      this.$store.dispatch('page/changeTheme', this.night ? 0 : 1)
    },
    addMsg() {
      this.$router.push('/publish')
    }
  },
}
</script>
  
<style lang="scss" scoped>
.bg::before {
  content: "";
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('~@/assets/admin_bg/daytime1.jpg') no-repeat center/cover;
}

// .night::before {
//   background-image: url('~@/assets/admin_bg/night.jpg');
// }
.night {
  &.bg1::before {
    background-image: url('~@/assets/admin_bg/night.jpg');
  }

  &.bg2::before {
    background-image: url('~@/assets/admin_bg/night2.jpg');
  }

  &.bg3::before {
    background-image: url('~@/assets/admin_bg/night3.jpg');
  }
}

.daytime {
  &.bg1::before {
    background-image: url('~@/assets/admin_bg/daytime1.jpg');
  }

  &.bg2::before {
    background-image: url('~@/assets/admin_bg/daytime2.jpg');
  }

  &.bg3::before {
    background-image: url('~@/assets/admin_bg/daytime3.jpg');
  }
}

.Switch_topic,
.add_msg {
  cursor: pointer;
  position: fixed;
  right: 35px;
  font-size: 45px;
}
.Switch_topic {
  bottom: 200px;
}
.add_msg {
  bottom: 130px;
}
.content_box {
  margin-top: 108px;
}
</style>
  