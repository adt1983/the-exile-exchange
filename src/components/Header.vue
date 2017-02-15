<template>
  <span class="page-header" v-once>
  <router-link :to="{ name: 'home' }">
    <h1>
      <strong>{{initials}}</strong>
      {{title}}
    </h1>
    </router-link>
    <h4>
        {{subtitle}}
    </h4>
  </span>
</template>

<script>
export default {
  name: 'pageHeader',
  data () {
    return {
      initials: 'tm',
      title: 'Travis Mullen',
      subtitle: 'interactive consultant'
    }
  }
}
</script>

<style lang="scss" scoped>

// call settings for global SCSS access
@import '../styles/settings';

.page-header {
  padding-top: $global-padding*4;
//   background-color: green;
//   border: 2px solid $secondary-color;
}
h1 {
  padding-top: $global-padding*1;
  white-space: nowrap;
  // background-color: yellow;
  // color: $secondary-color;
  letter-spacing: -1px;
  strong {
    padding: $global-padding;
    border: 3px solid $body-font-color;
    border-radius: $global-radius;
  }

}
h4 {
  padding-top: $global-padding*1;
}
</style>
