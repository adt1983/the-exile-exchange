<template>
  <div class="home">
    <div class="header">
      <h1>{{msg}}</h1>
    </div>
    <ul class="grid shrink no-bullet">
      <li>
        <loader v-if="loading"></loader>
      </li>
      <li v-for="leag in league">
        <router-link 
          :to="{ name: 'currency', params: { leagueid: leag.$slug }}" 
          tag="button" 
          type="button" 
          class="button large"><h3>{{leag.name}}</h3></router-link>
      </li>
    </ul>

    <!-- <router-link to="/exchange" class="button">exchange</router-link> -->
  </div>
</template>

<script>
import { league } from '../api/league'
import Loader from '../components/Loader'

export default {
  name: 'home',
  data () {
    return {
      league,
      loading: true,
      msg: 'Select League.'
    }
  },
  mounted: function () {
    league
      .then((response) => {
        this.league = response.items
        this.loading = false
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
  width: 100%;
  margin: auto;
  // overflow-y: scroll;
  text-align: center;
  .header {
    padding-bottom: $global-padding*3;
  }
}


</style>
