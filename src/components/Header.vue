<template>
  <div class="grid-block header shrink">
    <ul class="header-nav grid-block shrink">
          <li v-for="league in leagueMap">
            <router-link 
              class="alt-font"
              active-class="is-active"
              :to="{ params: { leagueid: league[settings.keys.league.slug] }}" 
              tag="a">{{league[settings.keys.league.name]}}</router-link>
          </li>
    </ul>
    <div class="grid-block expand">
      
    </div>
    <ul class="header-nav grid-block shrink float-right">
      <li>
        <account-name></account-name>
      </li>
          <li>  
            <router-link 
              active-class="is-active"
              :to="{ name: 'currency', params: { leagueid: leagueid }}"
              tag="a" >Currency</router-link></li>
    </ul>
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
<!--     <div class="grid-block v-align noscroll">
      <div class="grid-content align-center noscroll">
        <account-name></account-name>
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
    <!-- <div class="grid-block v-align noscroll">
      <div class="grid-content align-center text-right noscroll"> --> 
        <!-- todo // convert asks to string -->
      
     <!--    <router-link 
          v-show="askParams() !== '' && params.length"
          :to="{ name: 'exchange', params: { leagueid: leagueid, askids: askParams() }}"
          tag="button" 
          type="button" 
          class="button">{{searchText}}</router-link>
        <button class="button" 
          v-show="askParams() === '' && params.length"
          disabled="disabled">
          {{searchText}}
        </button> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import router from '../router'
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
      router,
      search: 'Search',

      currencyMap: {},
      leagueMap: {}
    }
  },
  components: {
    'account-name': AccountNameInput
  },
  computed: {
    routerinfo () {
      console.log('this.router', this.router)
    },
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
@import './node_modules/angular-base-apps/scss/components/menu-bar';

.header {
  background-color: $gray;
  border-bottom: rem-calc(1) solid $black;
  .inline-list {
    margin-bottom: 0;
  }
}
.header-nav {
  // This placeholder selector gets you the core structural styles for the menu
  @extend %menu-bar;
  text-align: center;
  // Set the orientation and sizing of the menu bar
  @include menu-bar-layout(
    $orientation: horizontal, // Can be horizontal or vertical
    $stretch: false // Set to false for a condensed menu
  );

  // Add styles for the menu bar items and text
  @include menu-bar-style(
    $background: transparent, // Background color of items
    $background-hover: $primary-color // Background color of item on hover
    // $background-active: #666, // Background color of an active item
    // $color: #fff, // Text color of items
    // $color-hover, // Text color of item on hover
    // $color-active, // Text color of item when active
    // $autocolor: false // When true, all the above colors will be derived from $background
  );
  li {
    white-space: nowrap;
  }
  .title {
    flex-flow: column nowrap;
    flex: 1 0 0;
    display: flex;
    align-items: center;
    padding: 1rem;
    font-size: 1rem;
    line-height: 1;
  }
 .is-active {
    background-color: $dark-color;
    cursor: default;
    &:hover {
      background-color: $dark-color;
    }
  }
  .float-right {
    align-self: flex-end;
  }
}
</style>
