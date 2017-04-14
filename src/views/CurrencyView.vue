<template>
  <div class="grid-block vertical currency-view">
    <header-section
      :params="askParams()"
      :leagueid="leagueid"
      ></header-section>
    <div class="grid-content stage v-align">
      <div class="grid-container ">
        <currency-list
          v-on:selected="updateAskSelected"
          :preselected="preselected"
          class="active grid-block align-center"
          ></currency-list>

        <div class="grid-block text-center align-center">
          <div class="grid-content">
            <router-link 
              :to="{ name: 'exchange', params: { leagueid: leagueid, askids: askParams() }}"
              tag="button" 
              type="button"
              :class="{'hollow': askParams() === ''}"
              :disabled="askParams() === ''"
              class="button large expand exchange-call-to-action">Exchange&nbsp;<div class="svg-icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="32" viewBox="0 0 10 32">
<path d="M10.286 16q0 0.464-0.339 0.804l-8 8q-0.339 0.339-0.804 0.339t-0.804-0.339-0.339-0.804v-16q0-0.464 0.339-0.804t0.804-0.339 0.804 0.339l8 8q0.339 0.339 0.339 0.804z"></path>
</svg></div></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import settings from '../settings'
import { league } from '../services/league'
import { currency } from '../services/currency'
import { createParams } from '../services/util'
import Header from '../components/Header'
import CurrencyList from '../components/CurrencyList'
import CurrencyItem from '../components/CurrencyItem'

export default {
  name: 'currency-view',
  props: ['leagueid'],
  data () {
    return {
      settings,

      title: 'Currency',
      keys: settings.keys.currency,

      lastAsks: undefined,

      currencyMap: {},
      leagueMap: {},
      selected: {
        asks: [],
        offers: []
      },
      preselected: [],
      params: {
        asks: '',
        offers: ''
      }
    }
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
      console.log('selectedAsks', comp)
      return comp
    }
  },
  methods: {
    updateAskSelected: function (items) {
      console.log('items', items)
      this.params.asks = createParams(items, this.currencyMap)
      this.selected.asks = items
    },
    askParams: function () {
      return this.params.asks
    }
  },
  beforeCreate () {
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
.stage {
  min-height: 100%;
  margin-top: rem-calc(-100);
}
.exchange-call-to-action {
  margin-top: $global-padding;
}
.currency-view {
  width: 100%;
  overflow-x: hidden;
  .is-active {
    color: $white;
  }
  svg path,
  svg rect{
    fill: $white;
    .hollow & ,
    [disabled="disabled"] & {
      fill: $primary-color;
    }
  }
}


</style>
