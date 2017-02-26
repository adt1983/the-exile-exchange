<!-- App view -->
<template>

  <div id="app" class="grid-frame">
    <!-- <article class="grid-container"> -->
        <!-- <section class="grid-block align-left"> -->
            <!-- <div class="grid-container vertical medium-horizontal"> -->
          <!-- <div class="grid-block small-2 medium-3"> -->
              <!-- <page-header class="grid-content noscroll"></page-header> -->
          <!-- </div> -->
          <!-- <div class="grid-block medium-9 align-left"> -->
            <transition name="slide-fade">
              <!-- <keep-alive> -->
                <router-view></router-view>
              <!-- </keep-alive> -->
            </transition>
          <!-- </div> -->
            <!-- </div> -->
        <!-- </section> -->
        <!-- <page-footer class="grid-block shrink align-center"></page-footer> -->
    <!-- </article> -->
  </div>

</template>

<!-- App Ctrl -->
<script>
// import pageHeader from './components/Header'
// import Exchange from './components/Exchange'
export default {
  name: 'app'
  // data () {
  //   return {
  //     transitionName: 'slide-left'
  //   }
  // },
  // beforeRouteUpdate (to, from, next) {
  //   const toDepth = to.path.split('/').length
  //   const fromDepth = from.path.split('/').length
  //   console.log('toDepth', toDepth)
  //   console.log('fromDepth', fromDepth)
  //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  //   next()
  // },
  // components: {
  //   // pageHeader,
  //   Exchange
  // }
}
</script>

<!-- App syles -->
<style lang="scss">
// do NOT add `scoped` to this <style> !!
// call `globals` to define the base styles globally
@import './assets/styles/globals';
@import './assets/styles/svg-icon';



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
// 
// 
// 
// 
// 
// .fade-enter-active, .fade-leave-active {
//   transition: opacity .5s ease;
// }
// .fade-enter, .fade-leave-active {
//   opacity: 0
// }
// .child-view {
//   position: absolute;
//   transition: all .5s cubic-bezier(.55,0,.1,1);
// }
// .slide-left-enter, .slide-right-leave-active {
//   opacity: 0;
//   // -webkit-transform: translate(30px, 0);
//   transform: translate(300px, 0);
// }
// .slide-left-leave-active, .slide-right-enter {
//   opacity: 0;
//   // -webkit-transform: translate(-30px, 0);
//   transform: translate(-300px, 0);
// }



// /* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s linear .5s;
}
.slide-fade-leave-active {
  transition: all .3s linear;
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
