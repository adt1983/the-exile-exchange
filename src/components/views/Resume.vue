<template>
  <div v-once class="resume">
    <article class="wrapper">
      <!-- <h1>{{title}}</h1> -->

      <h2>{{academic}}</h2>
      <academic></academic>

      <h2>{{business}}</h2>
      <business></business>
    </article>
  </div>
</template>

<script>

// TODO : create a reuseable comp with animations and extend
// other views from this

// import academic from 'Academic'
import academic from 'components/views/resume/Academic'
import business from 'components/views/resume/Business'

export default {
  name: 'resume',
  data () {
    return {
      title: 'Resume',
      academic: 'Academic',
      business: 'Business'
    }
  },
  beforeRouteUpdate (to, from, next) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    console.log('toDepth', to)
    console.log('fromDepth', from)
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  },
  components: {
    academic,
    business
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// call settings for global SCSS access
@import '../../styles/settings';

  .resume {
    display: block;
    width: 100%;
    padding-top: $global-padding*2;
    padding-left: $global-padding*2;
    .wrapper {
      max-width: rem-calc(600);
    }
    h2 {
      height: $global-padding*5;
      margin-top: rem-calc(8);
      margin-bottom: rem-calc(15);
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  
  
$animation-duration-default: 0.8s !default;
.li {
    display: block;
    &.staggered-enter,
    &.staggered-move {
        transition: opacity ($animation-duration-default/3)*2 ease-in,
              transform $animation-duration-default ease-out;
    }
    &.staggered-enter-before {
        opacity: 0;
    }
    &.staggered-enter {
        transform: translateX(rem-calc(-200));
        opacity: 0;
        // transform: translate3d(100%, 0, 0);
        &.staggered-enter-to {
          opacity: 1;
          transform: translateX(rem-calc(0));
      }
    }
    &.staggered-move {
        transform: translateX(rem-calc(50));
        &.staggered-move-to {
          transform: translateX(rem-calc(0));
      }
    }
    &.staggered-enter-stagger,
    &.staggered-move-stagger,
    &.staggered-leave-stagger // &.staggered-stagger,
    {
        /* this will have a 100ms delay between each successive leave animation */
        transition-delay: $animation-duration-default/4;
        // As of 1.4.4, this must always be set: it signals ngAnimate
        // to not accidentally inherit a delay property from another CSS class
        transition-duration: 0s;
    }
    // &.staggered-enter-stagger,
    // &.staggered-move-stagger,
    // &.staggered-leave-stagger {
    // }
    // &.staggered-leave-prepare { 
    //     transform: translateX(0);
    // }
    &.staggered-leave {
        transition: opacity $animation-duration-default/2 ease-in 0s,
              transform $animation-duration-default ease-in 0s;
        // opacity: 1;
        // border: 1px solid green;
        transform: translateX(0);
        &.staggered-leave-to {
            opacity: 0;
            transform: translateX(rem-calc(200));
        }
    }
}
  // .location {
  //   font-size: $small-font-size;
  //   color: red;
  // }
  // .small {
  //   font-size: $small-font-size;
  // }

  // li {
  //   margin-bottom: $global-padding;
  // }
</style>
