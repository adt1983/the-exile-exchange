<template>
  <div class="exchange-view">
    <!-- {{currencyMap}} -->
    <div class="asks-panel">
      <h2 class="alt-font text-center">Asks</h2>
      <div v-for="askid in getSelectedAsks">
        <currency-item
          :input="false"
          :id="askid" 
          ></currency-item>
      </div>
    </div>
    <div class="offers-panel">
      <h2 class="alt-font text-center">Offers</h2>
      <div v-for="offerid in getSelectedOffers">
        <currency-item
          :input="false"
          :id="offerid" 
          ></currency-item>
      </div>
    </div>
 <!--    <exchange 
      :currency-list="currency"
      :ask-list="asks"
      :bid-list="bids"></exchange> -->
  </div>
</template>

<script>
import { settings } from '../settings'
// import { currency } from '../services/currency'
// import asks from '../../static/breach.4.6.json'
// import bids from '../../static/breach.6.4.json'
import Exchange from '../components/Exchange'
import CurrencyItem from '../components/CurrencyItem'

function cleanParams (dirty) {
  let clean
  // let ids = this.askids.slice(0)
  if (dirty.indexOf(settings.paramDiv) >= 0) {
    clean = dirty.split(settings.paramDiv)
  } else {
    clean = dirty
  }
  return clean
}

export default {
  name: 'exchange-view-poc',
  props: ['askids', 'offerids'],
  data () {
    return {
      keys: settings.keys.exchange,
      currencyKeys: settings.keys.currency,
      // currency: [],
      // currencyMap: {},
      asks: [],
      bids: []

    }
  },
  computed: {
    getSelectedAsks: function () {
      return cleanParams(this.askids)
    },
    getSelectedOffers: function () {
      return cleanParams(this.offerids)
    }
  },
  components: {
    Exchange,
    CurrencyItem
  }
  // beforeCreate: function () {
  //   console.log('beforeCreate getSelectedAsks', this.getSelectedAsks)
  //   currency
  //     .then((response) => {
  //       this.currencyMap = response.collection
  //       this.currency = response.items
  //     })
  // }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.exchange-view {
  width: 100%;
  overflow-y: scroll;
// 	display: flex;
//   flex-direction: row nowrap;
//   justify-content: flex-start;
//   align-content: flex-start;
//   align-items: flex-start;
//   @include breakpoint(medium) {
//     align-items: center;
//   }
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
// .button {
//   // white-space: nowrap;
//   margin: $global-padding*3;
//   filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.3));
//   &:hover {
//     filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.4));
//   }
//   svg {
//     fill: #fff;
//   }
// }

</style>
