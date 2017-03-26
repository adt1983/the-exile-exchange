<template>
  <section class="exchange-wrapper grid-block noscroll vertical">
<!--     <header-section
        :leagueid="leagueid"
        ></header-section> -->
    <div class="home">
    selectedLeague: {{selectedLeague}}
    currencies: {{lastAsks}}
  <!--     <exhange-view
        ></exhange-view> -->

      <header>
        <h1>{{title}}</h1>
      </header>
      <ul class="grid-block shrink no-bullet">
        <li v-if="!this.league.length">
          <loader></loader>
        </li>
        <div class="grid-block v-align">
          <div class="grid-content align-center">
            <ul class="button-group segmented">
              <li v-for="leag in league">

                <router-link 
                  :to="{ name: 'exchange', params: { leagueid: leag.$slug, askids: selected() }}" 
                  tag="button" 
                  type="button" 
                  class="button"><h1>{{leag.name}}</h1></router-link>
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
import saved from '../services/selected'
import { league } from '../services/league'
import { currency } from '../services/currency'
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

      editName: false,
      accountNameSaveKey: settings.keys.exchange.user,
      defaultMsg: 'Add your account name.',
      accountName: '',

      currencyMap: {},

      currencySaveKey: settings.keys.currency.type,
      lastAsks: undefined,

      league,
      title: 'Select League.',
      leagueSaveKey: settings.keys.league.type,
      selectedLeague: undefined
    }
  },
  computed: {
    accountButton: function () {
      'Name: <strong>' + this.accountName + '</strong>'
    }
  },
  methods: {
    createParams: function (ids) {
      let all = []
      for (let i = 0; i < ids.length; i++) {
        let p = []
        p.push(this.currencyMap[ids[i]].$preset)
        p.push(ids[i])
        p = p.join(this.settings.paramDiv)
        all.push(p)
      }
      return all.join(this.settings.paramSubDiv)
    },
    selected () {
      let currency
      if (this.lastAsks && this.lastAsks.length) {
        currency = this.lastAsks
      } else {
        currency = this.createParams(this.settings.defaults.currencyIndexes)
      }
      console.log('currency', currency)
      return currency
    },
    // isEdit () {
    //   return !editName || accountName !== ''
    // },
    submitName (v) {
      saved.set(this.accountNameSaveKey, this.accountName)
      this.editName = false
    },
    submitLeague (v) {
      saved.set(this.accountNameSaveKey, this.selectedLeague)
    },
    isLoaded () {
      return Object.keys(this.currencyMap) && Object.keys(this.currencyMap).length
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
            askids: this.selected()
          }
        })
      }
    }
  },
  beforeCreate: function () {
    const that = this
    currency
      .then((response) => {
        that.currencyMap = response.collection
        // this.currency = response.items
      })
  },
  created () {
    let name = saved.get(this.accountNameSaveKey)
    if (name) {
      this.accountName = name
    }
    let currencies = saved.get(this.currencySaveKey)
    if (currencies) {
      this.lastAsks = currencies
    }
    let league = saved.get(this.leagueSaveKey)
    if (league) {
      this.selectedLeague = league
    }
  },
  mounted: function () {
    league
      .then((response) => {
        this.league = response.items
        this.gotoExchange()
      })
  },
  // beforeDestroy: function () {
  //   const id = this.title
  //   const value = this.askParams()
  //   saved.set(id, value)
  // },
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
