<template>
  <nav class="home align-center">
    <router-link to="/resume" class="button large">{{ msg }}</router-link>
  </nav>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'View Resume'
    }
  }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../../styles/settings';

.home {
	margin-top: $global-padding;
}
</style>
