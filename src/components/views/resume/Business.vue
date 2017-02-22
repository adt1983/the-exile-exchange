<template>
  <transition-group 
    class="no-bullet business-items"
    tag="ul"
  >
    <li v-for="(item, index) in items" v-bind:key="item.company">
        <em v-html="item.title"></em>
        <br />
        <strong v-html="item.company">
            The University of the Arts
        </strong>
        ( <a v-bind:href="item.url" target="_blank" :title="item.company">{{item.shortUrl}}&nbsp;<div class="svg-icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="32" viewBox="0 0 30 32">
          <path d="M26 21.714q0-0.714-0.5-1.214l-3.714-3.714q-0.5-0.5-1.214-0.5-0.75 0-1.286 0.571 0.054 0.054 0.339 0.33t0.384 0.384 0.268 0.339 0.232 0.455 0.063 0.491q0 0.714-0.5 1.214t-1.214 0.5q-0.268 0-0.491-0.063t-0.455-0.232-0.339-0.268-0.384-0.384-0.33-0.339q-0.589 0.554-0.589 1.304 0 0.714 0.5 1.214l3.679 3.696q0.482 0.482 1.214 0.482 0.714 0 1.214-0.464l2.625-2.607q0.5-0.5 0.5-1.196zM13.446 9.125q0-0.714-0.5-1.214l-3.679-3.696q-0.5-0.5-1.214-0.5-0.696 0-1.214 0.482l-2.625 2.607q-0.5 0.5-0.5 1.196 0 0.714 0.5 1.214l3.714 3.714q0.482 0.482 1.214 0.482 0.75 0 1.286-0.554-0.054-0.054-0.339-0.33t-0.384-0.384-0.268-0.339-0.232-0.455-0.063-0.491q0-0.714 0.5-1.214t1.214-0.5q0.268 0 0.491 0.063t0.455 0.232 0.339 0.268 0.384 0.384 0.33 0.339q0.589-0.554 0.589-1.304zM29.429 21.714q0 2.143-1.518 3.625l-2.625 2.607q-1.482 1.482-3.625 1.482-2.161 0-3.643-1.518l-3.679-3.696q-1.482-1.482-1.482-3.625 0-2.196 1.571-3.732l-1.571-1.571q-1.536 1.571-3.714 1.571-2.143 0-3.643-1.5l-3.714-3.714q-1.5-1.5-1.5-3.643t1.518-3.625l2.625-2.607q1.482-1.482 3.625-1.482 2.161 0 3.643 1.518l3.679 3.696q1.482 1.482 1.482 3.625 0 2.196-1.571 3.732l1.571 1.571q1.536-1.571 3.714-1.571 2.143 0 3.643 1.5l3.714 3.714q1.5 1.5 1.5 3.643z"></path>
          </svg></div></a> )
        <strong class="location">
            {{item.location}}
        </strong>
        <br />
        <span v-html="item.desc"></span>
        <br />
        <span class="info-color" v-if="item.tech" v-html="item.tech">
        </span>
    </li>
  </transition-group>
</template>

<script>
import json from '../../../../static/data/business.json'
export default {
  name: 'business',
  data () {
    // items: [...]
    return json
  }
}
</script>004

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../../../styles/settings';

  // .location {
  //   font-size: $small-font-size;
  // }
  // 
  .business-items {
    .svg-icon {
      top: 0.125em;
      // top: 0.25em;
      color: $secondary-color;
      svg {
        height: $small-font-size;
        width: $small-font-size;
        fill: $anchor-font-color;
      }
    }
    // a {
    //   @include hovershadow;
    // }
  }
  .info-color {
    color: $info-color;
  }
  .info-color,
  .location {
    font-size: $small-font-size;
  }
  li {
    padding-bottom: $global-padding*2;
  }
</style>
