<template>
  <div class="grid-block vertical currency-view">
    <header-section
      :params="askParams()"
      :leagueid="leagueid"
      ></header-section>
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
import Header from '../components/Header'
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

export default {
  name: 'currency-view',
  props: ['leagueid'],
  data () {
    return {
      settings,

      title: 'Currency',
      keys: settings.keys.currency,

      leagueSaveKey: settings.keys.league.type,
      currencySaveKey: settings.keys.currency.type,

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
    // get data from services
    currency
      .then((response) => {
        this.currencyMap = response.collection
      })
    league
      .then((response) => {
        this.leagueMap = response.collection
      })
  },
  created: function () {
    // save league param from last page
    const id = this.leagueSaveKey
    const value = this.leagueid
    saved.set(id, value)
    // get ask currency params
    // let name = saved.get(this.currencySaveKey)
    // if (name) {
    //   this.accountName = name
    // }
  },
  beforeDestroy: function () {
    // save ask currency params
    const id = this.currencySaveKey
    const value = this.askParams()
    saved.set(id, value)
  },
  components: {
    'currency-list': CurrencyList,
    'currency-item': CurrencyItem,
    'header-section': Header
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
    // leagueId () {
    //   return this.leagueid
    // }
  }

}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.currency-view {
  // @include base-panel;
  // padding: 0 $global-padding*3;
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
