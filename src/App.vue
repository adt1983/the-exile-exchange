<!-- App view -->
<template lang="pug">
  #app.grid-frame.vertical
    .grid-block
      transition(name="route-transition")
        router-view
</template>

<!-- App Ctrl -->
<script>
export default {
  name: 'app'
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
    $body-background,
    $body-background rem-calc(10),
    lighten($body-background, 4) rem-calc(10),
    lighten($body-background, 4) rem-calc(20)
  );
}

#app {
  border-top: rem-calc(3) solid $primary-color;
}

// /* Enter and leave animations can use different */
/* durations and timing functions.              */
.route-transition-enter-active {
  transition: transform $default-animation-speed*2 linear $default-animation-speed*3;
}
.route-transition-leave-active {
  transition: transform $default-animation-speed*2 linear;
}
.route-transition-enter
/* .route-transition-leave-active for <2.1.8 */ {
  transform: translateY(100%);
}
.route-transition-leave-to {
  opacity: 0;
  overflow: hidden;

  transform: translateY(-80%);
}
</style>
