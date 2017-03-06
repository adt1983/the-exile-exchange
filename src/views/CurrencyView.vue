<template>
  <div class="grid-block vertical currency-view">
    <div class="grid-block shrink header">
      <div class="grid-block shrink show-for-small-only">
        <div class="grid-content text-center">
          <!-- todo // convert asks to string -->
          <router-link 
            :to="{ name: 'home'}" 
            tag="button" 
            type="button" 
            class="button call-to-action"><div class="svg-icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="32" viewBox="0 0 12 32">
              <path d="M11.196 9.714q0 0.232-0.179 0.411l-7.018 7.018 7.018 7.018q0.179 0.179 0.179 0.411t-0.179 0.411l-0.893 0.893q-0.179 0.179-0.411 0.179t-0.411-0.179l-8.321-8.321q-0.179-0.179-0.179-0.411t0.179-0.411l8.321-8.321q0.179-0.179 0.411-0.179t0.411 0.179l0.893 0.893q0.179 0.179 0.179 0.411z"></path>
              </svg></div></router-link>
        </div>
      </div>
      <div class="grid-block expand">
        <div class="grid-content">
          <h1>{{leagueName}}</h1>
        </div>
      </div>

      
      <div class="grid-block shrink hide-for-small-only">
        <div class="grid-content">
          <ul class="button-group segmented call-to-action">
            <li v-for="league in leagueMap">
              <router-link 
                active-class="is-active"
                :to="{ params: { leagueid: league[settings.keys.league.slug] }}" 
                tag="a">{{league[settings.keys.league.name]}}</router-link>
            </li>
          </ul>
        </div>
      </div>

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

      <div class="grid-block shrink">
        <div class="grid-content text-center">
          <!-- todo // convert asks to string -->
          <router-link 
            v-show="params.asks !== ''"
            :to="{ name: 'exchange', params: { leagueid: leagueid, askids: askParams() }}"
            tag="button" 
            type="button" 
            class="button call-to-action">{{searchText}}</router-link>
          <button class="button call-to-action" 
            v-show="params.asks === ''"
            disabled="disabled">
            {{searchText}}
          </button>
        </div>
      </div>

    </div>
    <div class="grid-content stage">
      <div class="grid-container">

      <currency-list
        v-on:selected="updateAskSelected"
        class="active grid-block"
        ></currency-list>
        
      </div>
    </div>
  </div>
</template>

<script>
import settings from '../settings'
import { league } from '../services/league'
import { currency } from '../services/currency'
import saved from '../services/selected'
// import router from 'vue-router'
import CurrencyList from '../components/CurrencyList'
import CurrencyItem from '../components/CurrencyItem'

// function createParams (id, map) {
//   let clean = ''
  // console.log('createParams', arr)
//   // let ids = this.askids.slice(0)
//   if (arr.length) {
//     clean = arr.join(settings.paramDiv)
//   // } else if (arr.length === 1) {
//   //   clean = arr.toString()
//   }
  // console.log('createParams', clean)
//   return clean
// }

// console.log(res);
export default {
  name: 'currency-view',
  props: ['leagueid'],
  data () {
    return {
      settings,
      // leagKeys: settings.keys.league,
      keys: settings.keys.currency,
      title: 'Currency',
      search: 'Search',
      // currency: [],
      currencyMap: {},
      leagueMap: {},
      selected: {
        asks: [],
        offers: []
      },
      params: {
        asks: '',
        offers: ''
      }
    }
  },
  beforeCreate: function () {
    currency
      .then((response) => {
        this.currencyMap = response.collection
      })
    league
      .then((response) => {
        this.leagueMap = response.collection
      })
    // getSelected(id, value)
  },
  beforeDestroy: function () {
    const id = this.title
    const value = this.askParams()
    saved.set(id, value)
  },
  components: {
    'currency-list': CurrencyList,
    'currency-item': CurrencyItem
  },
  computed: {
    selectedAsks: function () {
      const that = this
      let comp = {}
      this.selected.asks.forEach(function (a) {
        comp[a[that.keys.id]] = true
        comp.bid = a
      })
      return comp
    },
    selectedOffers: function () {
      const that = this
      let comp = {}
      this.selected.offers.forEach(function (a) {
        comp[a[that.keys.id]] = true
      })
      return comp
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
    createParams: function (ids) {
      const that = this
      let all = []
      ids.forEach(function (id) {
        let p = []
        p.push(id.id)
        p.push(that.currencyMap[id.id].$preset)
        p = p.join(that.settings.paramDiv)
        all.push(p)
      })
      return all.join(this.settings.paramSubDiv)
    },
    updateAskSelected: function (items) {
      this.params.asks = this.createParams(items)
      this.selected.asks = items
    },
    askParams: function () {
      return this.params.asks
    }
  }

}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.currency-view {
  // @include base-panel;
  // padding: 0 $global-padding*3;
  .header {
    background-color: $dark-color;
    border-bottom: rem-calc(1) solid $body-font-color;
    .inline-list {
      margin-bottom: 0;
    }
  }
  .call-to-action {
    margin-top: $global-spacing;
  }
  width: 100%;
  // overflow-y: scroll;
  overflow-x: hidden;
// 	display: flex;
//   flex-direction: row nowrap;
//   justify-content: flex-start;
//   align-content: flex-start;
//   align-items: flex-start;
//   @include breakpoint(medium) {
//     align-items: center;
//   }
  .is-active {
    color: $white;
  }
  svg path,
  svg rect{
    fill: $secondary-color;
  }
}


</style>
