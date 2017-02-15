<template>
  <div class="resume">
    <h2>{{academic}}</h2>
    <academic></academic>

    <h2>{{business}}</h2>
    <business></business>
  </div>
</template>

<script>
// import academic from 'Academic'
import academic from 'components/views/resume/Academic'
import business from 'components/views/resume/Business'

export default {
  name: 'resume',
  data () {
    return {
      academic: 'Academic',
      business: 'Business'
    }
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
    padding-top: $global-padding*2;
    padding-left: $global-padding*2;
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
