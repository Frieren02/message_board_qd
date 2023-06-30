<template>
  <div id="app">
    <router-view></router-view>
    <!-- <headerContainer/> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      themes: {
        dark: 'black',
        light: 'white'
      }
    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.page.theme,
    }),
  },
  watch: {
    theme: {
      handler: function(val) {
        document.documentElement.style.setProperty('--textColor', val ? 'black' : 'white');
        document.documentElement.style.setProperty('--bgColor', val ? 'white' : 'black');
        document.documentElement.style.setProperty('--bgColorA', val ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.6)');
      },
      immediate: true
    }
  },
  components: {
    // headerContainer
  },
  mounted() {
    document.querySelector('#main-loading').style.display = 'none'
  },
}
</script>

<style lang="scss">
:root {
  --textColor: rgb(177, 92, 92);
  --bgColor: rgb(82, 44, 44);
  --bgColorA: rgba(0,0,0,.6);
  color: var(--textColor);
}

.el-avatar {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>
