<template>
  <div class="home">
<!--   selectedLeague: {{selectedLeague}}
  currencies: {{lastAsks}} -->
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
                :to="{ name: 'currency', params: { leagueid: leag.$slug }}" 
                tag="button" 
                type="button" 
                class="button"><h1>{{leag.name}}</h1></router-link>
            </li>
          </ul>
        </div>
      </div>
    </ul>
    <div class="grid-block v-align">
      <div class="grid-content align-center">
        <account-name class="call-to-action"></account-name>
      </div>
    </div>
  </div>
</template>

<script>
import settings from '../settings'
import saved from '../services/selected'
import { league } from '../services/league'

import Loader from '../components/Loader'
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

      currencySaveKey: settings.keys.currency.type,
      lastAsks: undefined,

      league,
      title: 'Select League.',
      leagueSaveKey: settings.keys.league.type
    }
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
  computed: {
    accountButton: function () {
      'Name: <strong>' + this.accountName + '</strong>'
    }
  },
  methods: {
    // isEdit () {
    //   return !editName || accountName !== ''
    // },
    submitName (v) {
      saved.set(this.accountNameSaveKey, this.accountName)
      this.editName = false
    },
    submitLeague (v) {
      saved.set(this.accountNameSaveKey, this.selectedLeague)
    }
  },
  mounted: function () {
    league
      .then((response) => {
        this.league = response.items
      })
  },
  // beforeDestroy: function () {
  //   const id = this.title
  //   const value = this.askParams()
  //   saved.set(id, value)
  // },
  components: {
    Loader,
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
  }
}


</style>
