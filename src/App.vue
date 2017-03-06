<!-- App view -->
<template>

  <div id="app" class="grid-frame vertical">
      <!-- <modal></modal> -->
    <!-- <article class="grid-container"> -->
        <!-- <section class="grid-block align-left"> -->
            <!-- <div class="grid-container vertical medium-horizontal"> -->
          <!-- <div class="grid-block small-2 medium-3"> -->
              <!-- <page-header class="grid-content noscroll"></page-header> -->
          <!-- </div> -->
   <!--        <div class="grid-block">
            <div class="grid-content">
              <h1>App Layer</h1>
            </div>
          </div> -->
          <div class="grid-block">
            <transition name="slide-fade">
              <!-- <keep-alive> -->
                <router-view></router-view>
              <!-- </keep-alive> -->
            </transition>
          </div>
          <!-- <modal></modal> -->
            <!-- </div> -->
        <!-- </section> -->
        <page-footer class="grid-block shrink align-center"></page-footer>
    <!-- </article> -->

  </div>

</template>

<!-- App Ctrl -->
<script>
// import pageHeader from './components/Header'
import pageFooter from './components/Footer'
// import Modal from './components/Modal'
// import Exchange from './components/Exchange'
export default {
  name: 'app',
  data () {
    return {
      league: '',
      loading: false
    }
  },
  created () {
    this.setLeague()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'setLeague'
  },
  components: {
    // pageHeader,
    // Modal,
    pageFooter
  },
  methods: {
    setLeague () {
      this.league = this.$route.params.leagueid || ''
      // getPost(this.$route.params.id, (err, post) => {
      //   this.loading = false
      //   if (err) {
      //     this.error = err.toString()
      //   } else {
      //     this.post = post
      //   }
      // })
    }
  }
}
</script>

<!-- App syles -->
<style lang="scss">
// do NOT add `scoped` to this <style> !!
// call `globals` to define the base styles globally
@import './assets/styles/globals';
@import './assets/styles/svg-icon';

body {
  background: repeating-linear-gradient(
    -55deg,
    #222,
    #222 rem-calc(10)*5,
    #333 rem-calc(10)*5,
    #333 rem-calc(20)*5
  );
}

#app {
  border-top: rem-calc(3) solid $primary-color;
}

.stage {
  // display: block;
  // flex-direction: row;
  // align-content:stretch;
  // justify-content:stretch;
}
// html { overflow-y: scroll; }

// /* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: transform $default-animation-speed*2 linear $default-animation-speed*3;
}
.slide-fade-leave-active {
  transition: transform $default-animation-speed*2 linear;
}
.slide-fade-enter
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateY(100%);
}
.slide-fade-leave-to {
  opacity: 0;
  overflow: hidden;

  transform: translateY(-80%);
}
// .slide-fade-leave {
//   transform: translateX(0);
// }


</style>
