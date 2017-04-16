<template>
  <div class="grid-block header shrink">
    <ul class="header-nav grid-block shrink">
          <li v-for="league in leagueMap">
            <router-link
              class="alt-font"
              active-class="is-active"
              :to="{ params: { leagueid: league[keys.slug] }}"
              tag="a">{{league[keys.name]}}</router-link>
          </li>
    </ul>
    <div class="grid-block expand">

    </div>
    <ul class="header-nav grid-block shrink float-right">
      <li>
        <account-name
          class="account-name"></account-name>
      </li>
          <li>
            <router-link
              active-class="is-active"
              :to="{ name: 'currency', params: { leagueid: leagueid }}"
              tag="a" >Currencies</router-link></li>
    </ul>
    </div>
  </div>
</template>

<script>
import router from '../router'
import settings from '../settings'

import { league } from '../services/league'
import { currency } from '../services/currency'

import AccountNameInput from './AccountNameInput'

export default {
  name: 'Header',
  props: ['params', 'leagueid'],
  data () {
    return {
      settings,
      keys: settings.keys.league,

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
}
</script>

<style lang="scss" scoped>

// call settings for global SCSS access
@import '../assets/styles/settings';
@import './node_modules/angular-base-apps/scss/components/menu-bar';

.header {
  background-color: $gray;
  border-bottom: rem-calc(1) solid $black;
  // TODO: calc height so we can set exchange-panel height later on
  .inline-list {
    margin-bottom: 0;
  }
}
.header-nav {
  // This placeholder selector gets you the core structural styles for the menu
  @extend %menu-bar;
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
    text-align: center;
    a {
      font-size: $menubar-fontsize*1.2;
      padding: $menubar-item-padding*2;
    }
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
.account-name {
  // display: block;
  margin: auto $global-spacing;
}
</style>
