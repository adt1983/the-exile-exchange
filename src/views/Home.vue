<template>
  <div class="home">
    <header>
      <h1>{{title}}</h1>
    </header>
    <ul class="grid shrink no-bullet">
      <li v-if="!this.league.length">
        <loader></loader>
      </li>
      <div class="grid-block">
        <div class="grid-content">
          <ul class="button-group segmented call-to-action">
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
    <div class="grid-block noscroll contact">
      <div
        class="grid-content noscroll">
        <button
          v-if="!editName"
          :class="{'warning': (accountName === '')}"
          class="button success hollow"
          type="button"
          @click="editName = true">
          {{accountName || defaultMsg}}
        </button>
        <small 
          v-if="editName"
          class="grid-content noscroll">
          <label>
            <span class="inline-label small">
              <input 
                @keyup.enter="submitName" 
                v-model="accountName" 
                type="search" 
                placeholder="Set Account Name">
              <a href="#"
                v-if="accountName !== ''"
                @click.stop.prevent="submitName"
                class="button">Save</a>
              <a href="#"
                v-if="accountName === ''"
                @click.stop.prevent="submitName"
                class="button alert">Close</a>
            </span>
          </label>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import settings from '../settings'
import saved from '../services/selected'
import { league } from '../services/league'
import Loader from '../components/Loader'

export default {
  name: 'home',
  data () {
    return {
      settings,

      editName: false,
      accountNameSaveKey: settings.keys.exchange.user,
      defaultMsg: 'Add your account name.',
      accountName: '',

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
    Loader
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
  header {
    padding: $global-padding*3 0;
  }
}


</style>
