<template>
  <transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="grid-block">
            <div class="grid-block noscroll">
              <div class="grid-content noscroll">
               <h6 class="body-font title">{{raw[keys.name]}}<br><span class="right warning-color">{{raw[keys.user]}}
              </div>
            </div>
            <div class="grid-block shrink text-right">
              <div class="grid-content">
                <button class="button tiny hollow info text-right" 
                  @click="closeModal()">
                  <div class="svg-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="32" viewBox="0 0 25 32">
                    <path d="M23.179 23.607q0 0.714-0.5 1.214l-2.429 2.429q-0.5 0.5-1.214 0.5t-1.214-0.5l-5.25-5.25-5.25 5.25q-0.5 0.5-1.214 0.5t-1.214-0.5l-2.429-2.429q-0.5-0.5-0.5-1.214t0.5-1.214l5.25-5.25-5.25-5.25q-0.5-0.5-0.5-1.214t0.5-1.214l2.429-2.429q0.5-0.5 1.214-0.5t1.214 0.5l5.25 5.25 5.25-5.25q0.5-0.5 1.214-0.5t1.214 0.5l2.429 2.429q0.5 0.5 0.5 1.214t-0.5 1.214l-5.25 5.25 5.25 5.25q0.5 0.5 0.5 1.214z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="modal-body">
            <h2 class="body-font">Buying <strong class="alt-font success">{{bidName}}</strong> for <strong class="alt-font success">{{askName}}</strong> at {{raw[keys.ask]}}:{{raw[keys.bid]}}</h2>

            <!-- {{raw.lastChar}} -->
            <!-- todo // text input with mulyiplyer -->
            <span 
              v-if="isCopied"
              class="label success">Message Copied!</span>
            <textarea 
              onclick="this.focus();this.select()"
              readonly
              @keyup.meta.67="isCopied = true"
              class="trade-text" 
              v-model="message"></textarea>
          </div>
         <!--  <h1>Buying</h1> {{bidName}}
            <currency-item
            :input="false"
            :id="raw[keys.bidId]" 
            class="small-icon bid-icon"
            ></currency-item>
            for {{askName}} <currency-item
            :input="false"
            :id="raw[keys.askId]" 
            class="small-icon ask-icon"
            ></currency-item>.  -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { bus } from '../services/bus'
import settings from '../settings'

import CurrencyItem from '../components/CurrencyItem'

export default {
  name: 'contact-info-modal',
  props: ['currencyMap'],
  data () {
    return {
      settings,
      // for wrapper not content
      isCopied: false,
      showModal: false,
      keys: settings.keys.exchange,
      currencyKeys: settings.keys.currency,
      bus,
      raw: ''
    }
  },
  components: {
    CurrencyItem
  },
  computed: {
    showOffers: function () {
      return this.raw && this.raw.key && this.raw.list
    },
    message: function () {
      return 'Hi ' + this.raw[this.keys.name] + ', I\'d like to buy ' + this.raw[this.keys.bid] +
        ' ' + this.askName +
        ' for ' + this.raw[this.keys.ask] +
        ' ' + this.askName +
        '.'
    },
    askName () {
      const id = this.keys.askId
      return this.getName(this.raw[ id ])
    },
    bidName () {
      const id = this.keys.bidId
      return this.getName(this.raw[ id ])
    }
  },
  methods: {
    setData: function (data) {
      this.showModal = true
      this.raw = data
    },
    closeModal: function () {
      this.showModal = false
    },
    getName (id) {
      return this.currencyMap[id][this.currencyKeys.name]
    }
  },
  // filters: {
  //   name: function (id) {
  //     if (!this.currencyMap) { return }
  //     return this.currencyMap[id][this.currencyKeys.name]
  //   }
  // },
  created () {
    const that = this
    bus.$on('modal.contactinfo.open', function (data) {
      console.log('data', data)
      if (data && Object.keys(data)) {
        that.setData(data)
        // that.$options.components.OffersList.props.key = data.key
        // that.$options.components.OffersList.props.list = data.list
      }
      // that.modalView.template = data
    })
    bus.$on('modal.contactinfo.close', function (data) {
      that.closeModal()
    })
    // this.$refs.trade.focus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.svg-icon {
  svg {
    fill: $white;
  }
}
.trade-text {
  cursor: copy;
  width: 100%;
  height: rem-calc(100);
  background-color: $gray-dark;
  margin: $global-padding 0;
  padding: $global-padding/2 $global-padding;
  line-height: 2
}

</style>
