<template>
  <div class="grid-block header shrink">
    <div class="nav-column">
      <div class="nav-row-1">
        <ul class="header-nav grid-block shrink float-right">
          <li>
            <router-link
              active-class="is-active"
              :to="{ name: 'currency', params: { leagueid: leagueid }}"
              tag="a">Currencies
            </router-link>
          </li>
          <li>
            <account-name
              class="account-name"></account-name>
          </li>
        </ul>
      </div>
      <div class="nav-row-2">
        <ul class="header-nav grid-block shrink">
          <li v-for="league in leagueMap">
            <router-link
              class="alt-font"
              active-class="is-active"
              :to="{ params: { leagueid: league[keys.slug] }}"
              tag="a"><span>{{league[keys.name]}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="grid-block expand">
      <!-- poe-header -->
      <ins class="adsbygoogle"
           :data-ad-client=adClient
           :data-ad-slot="4684391884"
           :style=adStyle></ins>
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
  mounted () {
    // https://github.com/darrynten/vue-adsense/blob/master/VueAdsense.vue
    (window.adsbygoogle = window.adsbygoogle || []).push({})
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
    },
    adClient () {
      return 'ca-pub-9522356965206611'
    },
    adStyle () {
      return 'display:inline-block;width:728px;height:90px'
    },
    adFormat () {
      return 'auto'
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
  height: 95px; // TODO: Unwanted y-scrollbar if less than 95px. Reduce border/margin/padding to get down to 90px?
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
    justify-content: center;
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

  // diplay: flex;
  // align-items: flex-start;
  //justify-content: center;
}

.nav-column {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100%;
}

.nav-row-1 {
  display: flex;
  align-items: flex-start;
  height: 50%;
}

.nav-row-2 {
  display: flex;
  align-items: flex-end;
  height: 50%;
  justify-content: flex-end;
}
.account-name {
  // display: block;
  margin: auto $global-spacing;
  align-items: flex-start;
}
</style>
