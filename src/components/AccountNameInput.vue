<template>
  <div class="account-name v-align">
<!--   <div class="grid-block noscroll account-name v-align">
    <div
      class="grid-content noscroll align-center"> -->
      <button
        v-if="!editName"
        :class="{'warning': (accountName !== '')}"
        class="button success hollow align-center"
        type="button"
        @click="editName = true"><span class="svg-icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="32" viewBox="0 0 25 32"><path d="M25.143 25.089q0 2.143-1.304 3.384t-3.464 1.241h-15.607q-2.161 0-3.464-1.241t-1.304-3.384q0-0.946 0.063-1.848t0.25-1.946 0.473-1.938 0.768-1.741 1.107-1.446 1.527-0.955 1.991-0.357q0.161 0 0.75 0.384t1.33 0.857 1.929 0.857 2.384 0.384 2.384-0.384 1.929-0.857 1.33-0.857 0.75-0.384q1.089 0 1.991 0.357t1.527 0.955 1.107 1.446 0.768 1.741 0.473 1.938 0.25 1.946 0.063 1.848zM19.429 9.143q0 2.839-2.009 4.848t-4.848 2.009-4.848-2.009-2.009-4.848 2.009-4.848 4.848-2.009 4.848 2.009 2.009 4.848z"></path></svg></span>&nbsp;<strong>{{accountName || defaultMsg}}</strong>
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
              placeholder="Account Name">
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
    <!-- </div> -->
  </div>
</template>

<script>
import settings from '../settings'
import saved from '../services/selected'
import { bus } from '../services/bus'

export default {
  name: 'AccountNameInput',
  data () {
    return {
      settings,

      editName: false,
      accountNameSaveKey: settings.keys.exchange.user,
      defaultMsg: 'Add your account name.',
      accountName: ''
    }
  },
  created () {
    let name = saved.get(this.accountNameSaveKey)
    if (name) {
      this.accountName = name
    }
  },
  methods: {
    submitName (v) {
      // if (this.accountName !== '') {
      saved.set(this.accountNameSaveKey, this.accountName)
      // }

      bus.$emit('saved.accountName', this.accountName)
      this.editName = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.account-name {
  svg {
    fill: $warning-color;
  }
  .button {
    margin: 0;
  }
  // .grid-content {
  //   padding-left: 0;
  //   padding-right: 0;
  // }
}

</style>
