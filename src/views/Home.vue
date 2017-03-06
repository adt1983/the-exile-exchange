<template>
  <div class="home">
    <header>
      <h1>{{msg}}</h1>
    </header>
    <ul class="grid shrink no-bullet">
      <li v-if="!this.league.length">
        <loader></loader>
      </li>
      <li v-for="leag in league">
        <router-link 
          :to="{ name: 'currency', params: { leagueid: leag.$slug }}" 
          tag="button" 
          type="button" 
          class="button large"><h1>{{leag.name}}</h1></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { league } from '../services/league'
import Loader from '../components/Loader'

export default {
  name: 'home',
  data () {
    return {
      league,
      msg: 'Select League.'
    }
  },
  mounted: function () {
    league
      .then((response) => {
        this.league = response.items
      })
  },
  components: {
    Loader
  }

}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.home {
  @include base-panel;
  padding: 0 $global-padding*3;
  // width: 100%;
  margin: auto;
  // overflow-y: scroll;
  text-align: center;
  header {
    padding: $global-padding*3 0;
  }
}


</style>
