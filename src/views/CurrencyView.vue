<template>
  <div class="grid-block vertical currency-view">
    <div class="grid-block shrink header">
      <h1>{{title}}</h1>

      <ul class="no-bullet grid-block horizontal shrink">
        <li class="grid-content" v-for="(v,id) in selectedAsks" :key="id">
          <currency-item
            :input="false"
            :id="id" 
            class="small-icon"
            ></currency-item>
        </li>
      </ul>

    </div>
    <div class="grid-content stage">
      <div class="grid-container">

      <currency-list
        v-on:selected="updateAskSelected"
        class="active grid-block"
        ></currency-list>

      <hr>

      <!-- <currency-list
        v-on:selected="updateOfferSelected"
        ></currency-list>
 -->
        
      </div>
    </div>
  </div>
</template>

<script>
import { settings } from '../settings'
import { currency } from '../api/currency'
import router from 'vue-router'
import CurrencyList from '../components/CurrencyList'
import CurrencyItem from '../components/CurrencyItem'

function createParams (arr) {
  let clean = ''
  // let ids = this.askids.slice(0)
  if (arr.length) {
    clean = arr.join(settings.paramDiv)
  // } else if (arr.length === 1) {
  //   clean = arr.toString()
  }
  console.log('createParams', clean)
  return clean
}

// console.log(res);
export default {
  name: 'currency-view',
  props: ['askids', 'offerids'],
  data () {
    return {
      keys: settings.keys.currency,
      title: 'Currency',
      // currency: [],
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
        // this.currency = response.items
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
      // console.log('updateSelected', this.selectedAsks)
      let list = createParams(Object.keys(this.selectedAsks))
      if (list) {
        console.log('createParams(items)', list)
        router.push({to: 'currency/' + list})
      }
      this.selected.asks = items
    }
    // updateOfferSelected: function (items) {
    //   console.log('updateSelected', items)
    //   if (items) {
    //     router.push({name: 'ask', params: { offerids: createParams(items) }})
    //   }
    //   this.selected.offers = items
    // }
  }

}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.currency-view {
  .header {
    background-color: $dark-color;
    border-bottom: $secondary-color;
    .inline-list {
      margin-bottom: 0;
    }
  }
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
