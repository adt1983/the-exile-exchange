<template>
  <transition-group 
    name="slide-fade"
    class="no-bullet"
    tag="ul"
  >
    <li v-for="(item, index) in items" v-bind:key="item.title">
      <strong>
          {{ item.title }}
      </strong><span v-html="item.subtitle"></span>
      <br />
      <span v-html="item.desc"></span>
    </li>
  </transition-group>
</template>

<script>
import json from '../../../../static/data/academic.json'
export default {
  name: 'academic',
  data () {
    return json
  }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../../../styles/settings';

  li {
    padding-bottom: $global-padding*2;
  }


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
    transform: translateX(100%);
  }
  .slide-fade-leave-to {
    opacity: 0;
    overflow: hidden;

    transform: translateX(-80%);
  }
</style>
