<template>
  <div class="grid-block">
    <div class="grid-block shrink">
      <h1>{{title}}</h1>
    </div>
    <div class="grid-block">
      <div class="currency-view grid-container">

      <currency-list
        v-on:selected="updateAskSelected"
        class="active grid-block"
        :items="currency"
        ></currency-list>

      <hr>

      <currency-list
        v-on:selected="updateOfferSelected"
        :items="currency"
        ></currency-list>

      <div class="grid-content">
        <ul class="no-bullet">
          <li v-for="(v,id) in selectedAsks" :key="id">
            <currency-item
              :input="false"
              :id="id" 
              :name="currencyMap[id][keys.name]" 
              :imgUrl="currencyMap[id][keys.imgUrl]"
              :value="currencyMap[id][keys.value]"
              ></currency-item>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { settings } from '../settings'
import { currency } from '../api/currency'
import CurrencyList from '../components/CurrencyList'
import CurrencyItem from '../components/CurrencyItem'

// console.log(res);
export default {
  name: 'currency-view',
  // props: ['askids','offerids'],
  data () {
    return {
      keys: settings.keys.currency,
      title: 'Currency',
      currency: [],
      currencyMap: [],
      selected: {
        asks: [],
        offers: []
      }
    }
  },
  beforeCreate: function () {
    currency
      .then((response) => {
        this.currencyMap = response.collection
        this.currency = response.items
      })
  },
  components: {
    'currency-list': CurrencyList,
    'currency-item': CurrencyItem
  },
  computed: {
    selectedAsks: function () {
      const that = this
      let comp = {}
      this.selected.asks.forEach(function (a) {
        comp[a[that.keys.id]] = true
      })
      console.log(comp)
      return comp
    },
    selectedOffers: function () {
      const that = this
      let comp = {}
      this.selected.offers.forEach(function (a) {
        // console.log('a[that.keys.id]', a[that.keys.id])
        comp[a[that.keys.id]] = true
      })
      console.log(comp)
      return comp
    }
  },
  methods: {
    // updateSelected: function (items) {
    //   console.log('updateSelected', items)
    //   this.selected = items
    // },
    updateAskSelected: function (items) {
      console.log('updateSelected', items)
      this.selected.asks = items
    },
    updateOfferSelected: function (items) {
      console.log('updateSelected', items)
      this.selected.offers = items
    }
  }

}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.currency-view {
  width: 100%;
  // overflow-y: scroll;
  overflow-x: hidden;
// 	display: flex;
//   flex-direction: row nowrap;
//   justify-content: flex-start;
//   align-content: flex-start;
//   align-items: flex-start;
//   @include breakpoint(medium) {
//     align-items: center;
//   }
}


</style>
