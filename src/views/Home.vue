<template>
  <section class="exchange-wrapper grid-block noscroll vertical">
    <div class="home">
      <header>
        <h1 v-once>{{title}}</h1>
      </header>
      <ul class="grid-block shrink no-bullet">
        <li v-if="!this.league.length">
          <loader></loader>
        </li>
        <div class="grid-block v-align">
          <div class="grid-content align-center">
            <ul class="button-group segmented">
              <li v-for="leag in league">
                <button
                  @click="setLeague(leag.$slug)"
                  type="button" 
                  class="button"><h1>{{leag.name}}</h1></button>
              </li>
            </ul>
          </div>
        </div>
      </ul>
      <div class="grid-block v-align">
        <div class="grid-content align-center text-center">
          <account-name class="call-to-action"></account-name>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import settings from '../settings'
import selected from '../services/selected'
import { league } from '../services/league'
import { currency } from '../services/currency'
import { createParams } from '../services/util'
import router from '../router'

import Loader from '../components/Loader'
import Header from '../components/Header'
import AccountNameInput from '../components/AccountNameInput'
import ExchangeView from 'views/ExchangeView'

export default {
  name: 'home',
  data () {
    return {
      settings,
      currencySaveKey: settings.keys.currency.saveAs,
      accountNameSaveKey: settings.keys.exchange.saveAs,
      leagueSaveKey: settings.keys.league.saveAs,

      editName: false,

      currencyMap: {},

      lastAsks: undefined,

      league,
      title: 'Select League.',
      selectedLeague: undefined
    }
  },
  computed: {
    accountButton: function () {
      'Name: <strong>' + this.accountName + '</strong>'
    }
  },
  methods: {
    selectedCurrencies () {
      let currency
      if (this.lastAsks && this.lastAsks.length) {
        currency = createParams(this.lastAsks, this.currencyMap)
      } else {
        currency = createParams(this.settings.defaults.currencyIndexes, this.currencyMap)
      }
      return currency
    },
    isLoaded () {
      return Object.keys(this.currencyMap) && Object.keys(this.currencyMap).length
    },
    setLeague (leagueid) {
      this.selectedLeague = leagueid
      selected.set(this.leagueSaveKey, this.selectedLeague)
      this.gotoExchange()
    },
    isSet () {
      return this.selectedLeague
    },
    gotoExchange () {
      if (this.isSet) {
        router.push({
          name: 'exchange',
          params: {
            leagueid: this.selectedLeague,
            askids: this.selectedCurrencies()
          }
        })
      }
    }
  },
  created () {
    const that = this
    currency
      .then((response) => {
        that.currencyMap = response.collection
        this.gotoExchange()
      })
    let name = selected.get(this.accountNameSaveKey)
    if (name) {
      this.accountName = name
    }
    let currencies = selected.get(this.currencySaveKey)
    if (currencies) {
      this.lastAsks = currencies
    }
    let league = selected.get(this.leagueSaveKey)
    if (league) {
      this.selectedLeague = league
    }
  },
  mounted: function () {
    league
      .then((response) => {
        this.league = response.items
        console.log('this.league', this.league)
      })
  },
  components: {
    Loader,
    'header-section': Header,
    ExchangeView,
    'account-name': AccountNameInput
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
  header,
  .call-to-action {
    padding: $global-padding*3 0;
    margin: 0 auto;
  }
}


</style>
