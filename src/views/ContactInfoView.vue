<template>
  <div class="contact-info-view">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            {{exchange}}
            <div class="modal-header">
              <slot name="header">
                Buying {{exchange.ask_id}} for {{exchange.bid_id}} at {{exchange.ask_qty}}:{{exchange.bid_qty}}
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                {{exchange.lastChar}}
                todo // text input with mulyiplyer
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                Hi, I'd like to by {{exchange.ask_qty}} for {{exchange.bid_qty}}. 
                <button class="modal-default-button" @click="$emit('close')">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { settings } from '../settings'
import { currency } from '../services/currency'

// function cleanParams (dirty) {
//   let clean
//   // let ids = this.askids.slice(0)
//   if (dirty.indexOf(settings.paramDiv) >= 0) {
//     clean = dirty.split(settings.paramDiv)
//   } else {
//     clean = dirty
//   }
//   return clean
// }

export default {
  name: 'contact-info-view',
  props: {
    exchange: Object
  },
  data () {
    return {
      settings,
      showModal: false
    }
  },
  // computed: {
    // getSelectedAsks: function () {
    //   return cleanParams(this.askids)
    // },
    // getSelectedOffers: function () {
    //   return cleanParams(this.offerids)
    // }
  // },
  // components: {
  //   Exchange
  // },
  beforeCreate: function () {
    currency
      .then((response) => {
        this.currencyMap = response.collection
        // this.currency = response.items
      })
  }
  // created: function () {
  //   // console.log('beforeCreate getSelectedAsks', this.getSelectedAsks)
  //   console.log('created')
  //   console.log(this.askids)
  //   console.log(this.offerids)
  //   const askReq = '/CurrencyOrder' + '/Breach/' + this.askids + '/' + this.offerids
  //   const bidReq = '/CurrencyOrder' + '/Breach/' + this.offerids + '/' + this.askids
  //   const that = this
  //   http
  //     .get(askReq)
  //     .then((response) => {
  //       console.log('items fresh from API!', response.data)
  //       that.asks = response.data
  //     })
  //   http
  //     .get(bidReq)
  //     .then((response) => {
  //       console.log('items fresh from API!', response.data)
  //       that.bids = response.data
  //     })
  // }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.contact-info-view {
  width: 100%;
  overflow-y: scroll;
  .currency-item {
    display: flex-list;
    flex-direction: row wrap;
  }
}
.asks-panel,
.offers-panel {
  border: 1px solid $gray;
  margin: rem-calc(10) auto;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity $default-animation-speed ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: rem-calc(300);
  @include breakpoint(small only) {
    width: 98%;
  }
  margin: 0 auto;
  padding: rem-calc(20) rem-calc(30);
  background-color: $dark-color;
  border-radius: rem-calc(2);
  box-shadow: 0 rem-calc(2) 8px rgba(0, 0, 0, .33);
  transition: all $default-animation-speed ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  // color: #42b983;
}

.modal-body {
  margin: rem-calc(20) 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  // -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
