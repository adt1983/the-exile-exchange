<!-- App view -->
<template>

  <div id="app" class="grid-frame vertical">
    <!-- <article class="grid-container"> -->
        <section class="grid-block align-left">
            <!-- <div class="grid-container vertical medium-horizontal"> -->
                <div class="grid-block medium-6">
                    <page-header class="grid-content"></page-header>
                </div>
                <div class="grid-block medium-6">
                    <router-view class="grid-content"></router-view>
                </div>
            <!-- </div> -->
        </section>
        <page-footer class="grid-block shrink align-center"></page-footer>
    <!-- </article> -->
  </div>

</template>

<!-- App Ctrl -->
<script>

import pageHeader from './components/Header'
import pageFooter from './components/Footer'

export default {
  name: 'app',
  components: {
    pageHeader,
    pageFooter
  }

}

</script>

<!-- App syles -->
<style lang="scss">
// do NOT add `scoped` to this <style> !!
// call `globals` to define the base styles globally
@import 'styles/globals';

#app {
    border-top: 3px solid $primary-color;
}
// html { overflow-y: scroll; }
</style>
