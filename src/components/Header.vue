<template>
  <div class="grid-block header shrink">
    <!-- <div class="grid-block"> -->
      <!-- <div class="grid-content text-center"> -->
        <!-- todo // convert asks to string -->
        <!-- <router-link 
          :to="{ name: 'home'}" 
          tag="button" 
          type="button" 
          class="button call-to-action"><div class="svg-icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="32" viewBox="0 0 12 32">
            <path d="M11.196 9.714q0 0.232-0.179 0.411l-7.018 7.018 7.018 7.018q0.179 0.179 0.179 0.411t-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-8.321-8.321q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l0.893 0.893q0.179 0.179 0.179 0.411z"></path>
            </svg></div></router-link> -->
      <!-- </div> -->
    <!-- </div> -->
    <div class="grid-block shrink v-align">
      <div class="grid-content align-center">
        <h1>{{leagueName}}</h1>
      </div>
    </div>
    <div class="grid-block v-align noscroll">
      <div class="grid-content align-center noscroll">
        <account-name></account-name>
        <!-- <strong class="body-font label warning-dark-bg">{{accountName}}</strong> -->
      </div>
    </div>
<!--     <div class="grid-block shrink hide-for-small-only">
      <div class="grid-content">
        <ul class="button-group segmented call-to-action">
          leagueMap{{leagueMap}}
          <li v-for="league in leagueMap">
            league{{league}}
            <router-link 
              active-class="is-active"
              :to="{ params: { leagueid: league[settings.keys.league.slug] }}" 
              tag="a">{{league[settings.keys.league.name]}}</router-link>
          </li>
        </ul>
      </div>
    </div> -->

    <!-- SHOW SELECTED -->
    <!-- <ul class="no-bullet grid-block horizontal shrink">
      <li class="grid-content" v-for="(v,id) in selectedAsks" :key="id">
        <currency-item
          :input="false"
          :id="id" 
          class="small-icon ask-icon"
          ></currency-item>
        <currency-item
          :input="false"
          :id="v.$preset" 
          class="small-icon bid-icon"
          ></currency-item>
      </li>
    </ul> -->

    <div class="grid-block v-align noscroll">
      <div class="grid-content align-center text-right noscroll">
        <!-- todo // convert asks to string -->
        <router-link 
          v-show="params.asks !== ''"
          :to="{ name: 'exchange', params: { leagueid: leagueid, askids: askParams() }}"
          tag="button" 
          type="button" 
          class="button">{{searchText}}</router-link>
        <button class="button" 
          v-show="params.asks === ''"
          disabled="disabled">
          {{searchText}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import router from 'vue-router'
import settings from '../settings'
// import saved from '../services/selected'

import { league } from '../services/league'
import { currency } from '../services/currency'

import AccountNameInput from './AccountNameInput'

export default {
  name: 'Header',
  props: ['params', 'leagueid'],
  data () {
    return {
      settings,

      // accountName: '',
      // accountNameSaveKey: settings.keys.exchange.user,

      search: 'Search',

      currencyMap: {},
      leagueMap: {}
    }
  },
  components: {
    'account-name': AccountNameInput
  },
  computed: {
    leagueName: function () {
      const nameKey = settings.keys.league.name
      if (Object.keys(this.leagueMap).length && this.leagueid) {
        return this.leagueMap[this.leagueid][nameKey]
      }
    },
    searchText: function () {
      return this.search + ' ' + this.leagueName
    }
  },
  methods: {
    askParams: function () {
      return this.params
    }
  },
  beforeCreate: function () {
    // other services
    currency
      .then((response) => {
        this.currencyMap = response.collection
      })
    league
      .then((response) => {
        this.leagueMap = response.collection
      })
  }
  // created () {
  //   // selected service
  //   let name = saved.get(this.accountNameSaveKey)
  //   if (name) {
  //     this.accountName = name
  //   }
  // }
}
</script>

<style lang="scss" scoped>

// call settings for global SCSS access
@import '../assets/styles/settings';

.header {
  background-color: $dark-color;
  border-bottom: rem-calc(3) solid $body-font-color;
  .inline-list {
    margin-bottom: 0;
  }
}

</style>
