<template>
  <transition name="modal" v-if="showModal">
    <!-- <div class="modal-mask"> -->
      <!-- <div class="modal-wrapper"> -->
        <div class="modal-container right">
          
          <div class="grid-block">
            <div class="grid-block noscroll">
              <div class="grid-content noscroll">
               <h6 class="body-font title">{{raw[keys.name]}}<br>
                <span class="warning-color">{{raw[keys.user]}}</span></h6>
              </div>
            </div>
            <div class="grid-block shrink text-right">
              <div class="grid-content">
                <button class="button hollow info text-right" 
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

          <div class="grid-block">
            <div class="modal-body grid-content text-center">
              <h2 class="body-font">
                <strong>Buying</strong><br>
                <strong class="alt-font success-color">{{bidName}}</strong> for<br>
                <strong class="alt-font success-color">{{askName}}</strong> at</h2>
              <h1 class="body-font">{{raw[keys.ask] * correctedMultiplier}}:{{raw[keys.bid] * correctedMultiplier}}</h1>

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
          </div>
          <div class="grid-block v-align noscroll">
            <section class="small-12 medium-6 grid-content noscroll align-top">
              <label for="multi">
                <span class="inline-label">
                  <span class="form-label">Multiplier</span>
                    <input 
                      id="multi"
                      name="multi"
                      v-model.number="selectedMultiplier" 
                      type="number" 
                      min="1">
                  </span>
                </span>
              </label>
            </section>
            <section class="small-12 medium-6 grid-content noscroll align-top text-center">
              <small class="age"><em>Last seen</em> {{raw[keys.lastSeenTime] | lastSeen }}</small>
            </section>
          </div>
        </div>
      <!-- </div> -->
    <!-- </div> -->
  </transition>
</template>

<script>
import moment from 'moment'
import { bus } from '../services/bus'
import settings from '../settings'

import { currency } from '../services/currency'
import CurrencyItem from '../components/CurrencyItem'

export default {
  name: 'contact-info-modal',
  // props: ['currencyMap'],
  data () {
    return {
      settings,
      // for wrapper not content
      currencyMap: {},
      isCopied: false,
      showModal: false,
      selectedMultiplier: 1,
      keys: settings.keys.exchange,
      currencyKeys: settings.keys.currency,
      bus,
      raw: ''
    }
  },
  components: {
    CurrencyItem
  },
  beforeCreate: function () {
    const that = this
    currency
      .then((response) => {
        that.currencyMap = response.collection
      })
  },
  computed: {
    message: function () {
      return 'Hi ' + this.raw[this.keys.name] + ', I\'d like to buy ' + (this.raw[this.keys.bid] * this.correctedMultiplier) +
        ' ' + this.bidName +
        ' for ' + (this.raw[this.keys.ask] * this.correctedMultiplier) +
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
    },
    correctedMultiplier () {
      if (typeof (this.selectedMultiplier) === 'number') {
        return this.selectedMultiplier
      } else {
        return 1
      }
    }
    // multiples () {
    //   let mult = []
    //   for (let i = this.multiply; i >= 1; i--) {
    //     mult.unshift({
    //       id: 'multiplier-' + i,
    //       multiplier: i,
    //       ask: (this.raw[this.keys.bid] * i),
    //       bid: (this.raw[this.keys.ask] * i)
    //     })
    //   }
    //   if (!this.selectedMultiplier) {
    //     this.selectedMultiplier = mult[0].id
    //   }
    //   return mult
    // }
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
    // isSelected (val) {
    //   return this.selectedMultiplier === val.multiplier
    // },
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
        // that.$options.components.BidsList.props.key = data.key
        // that.$options.components.BidsList.props.list = data.list
      }
      // that.modalView.template = data
    })
    bus.$on('modal.contactinfo.close', function (data) {
      that.closeModal()
    })
    // this.$refs.trade.focus()
  },
  filters: {
    lastSeen: function (value) {
      if (value) {
        // return moment(String(value)).format('MM/DD/YYYY hh:mm')
        return moment(value).fromNow()
      }
    }
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
.age {
  margin-top: $global-padding/2;
}
.trade-text {
  cursor: copy;
  width: 100%;
  height: rem-calc(100);
  background-color: $gray-dark;
  margin: $global-padding 0;
  padding: $global-padding/2 $global-padding;
  line-height: 2;
  border-radius: $global-radius;
}

// .multiplier-list {
//   ol {
//     list-style: none;
//     li {
//       display: inline-block;
//       // padding: rem-calc(2) rem-calc(1);
//       // border: rem-calc(1) solid $gray;
//       input,
//       label {
//         display: inline-block;
//         cursor: pointer;
//       }
//       // label {
//       //   width: 100%;
//       // }
//     } 
//   }
// }
</style>
