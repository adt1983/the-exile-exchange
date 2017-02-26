<!-- <!-- <template>
  <div class="grid-block vertical">
    <div class="grid-block">
      <div class="grid-block text-center">
        <div class="grid-content">
          <h3 class="inline-block">Asking</h3><h2 class="inline-block">{{currencyMap[params.alpha].name}}</h2><!-- <strong>{{currencyMap[params.alpha].id}}</strong> -->
          <img v-bind:src="currencyMap[params.alpha].icon" v-bind:alt="currencyMap[params.alpha].name">
        </div>
      </div>
      <div class="grid-block text-center shrink">
        <div class="grid-content">
          <h3>Exchange Rates</h3>
          <input type="checkbox" id="Offers" v-model="showWithOffersOnly">
          <label for="Offers">Offers Only</label>
        </div>
      </div>
      <div class="grid-block text-center">
        <div class="grid-content">
          <h3 class="inline-block">Offering</h3><h2 class="inline-block">{{currencyMap[params.beta].name}}</h2><!-- <strong>{{currencyMap[params.beta].id}}</strong> -->
          <img v-bind:src="currencyMap[params.beta].icon" v-bind:alt="currencyMap[params.beta].name">
        </div>
      </div>
    </div>
    <div class="grid-block vertical nowrap">
      <ul class="grid-block vertical">
        <li class="grid-block tier" 
          v-bind:class="{ 'has-trade': (biddingIndex[key].offers.length && biddingIndex[key].asks.length) }" 
          v-show="showWithOffersOnly === false || biddingIndex[key].offers.length" 
          v-if="biddingIndex[key].asks.length" v-for="(key, increments) in biddingIndex.orderBy" 
          v-bind:key="biddingIndex.orderBy">
          <div class="grid-block">
            <div class="grid-content text-center">
              <span>Asks</span>
              <strong class="large">{{biddingIndex[key].asks.length}}</strong>
            </div>
          </div>
          <div class="grid-block shrink">
            <div class="grid-content text-center">
              <span>Rate</span>
              <strong>{{key}}</strong>
              <span class="large">{{biddingIndex[key].$ratio_base}}</span>
            </div>
          </div>
          <div class="grid-block">
            <div class="grid-content text-center" v-show="biddingIndex[key].offers.length">
              <offers-list
                :items="biddingIndex[key].offers"></offers-list>
              <!-- <span>Offers</span>
              <strong>{{biddingIndex[key].offers.length}}</strong> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { settings } from '../settings'
import * as filters from '../filters'
import OffersList from './OffersList'
// to be mapped to ports (external component bindings)
const params = {
  alpha: 4, // ask
  beta: 6 // bid
}

const stats = {
  byExchangeRatio: {},
  setStats (items, key, askKey, bidKey) {
    let t = []
    // console.log('baseRatio items', items)
    // do all manipulation here
    // in one loop!
    t = items.map(function (item) {
      item = stats.addRatio(item, key, askKey, bidKey)
      stats.addItemToIndex(item, key, askKey, item[key + '_key'])
      return item
    })
    return t
  },
  addRatio: function (item, key, askKey, bidKey) {
    // todo: externalize these flags in settings{} ?
    item[key] = item[askKey] + ':' + item[bidKey]
    item[key + '_raw'] = (item[bidKey] / item[askKey]) * 100
    item[key + '_pair'] = item[bidKey] + ':' + item[askKey]
    item[key + '_pair' + '_raw'] = (item[askKey] / item[bidKey]) * 100
    // item[key + '_key'] = item[askKey] + ':' + item[bidKey] + ':' + item[bidKey] + ':' + item[askKey]
    item[key + '_key'] = (item[askKey] < item[bidKey]) ? item[askKey] + ':' + item[bidKey] : item[bidKey] + ':' + item[askKey]
    item[key + '_base'] = (item[askKey] < item[bidKey]) ? (item[bidKey] / item[askKey]) : (item[askKey] / item[bidKey])
    return item
  },
  addItemToIndex: function (item, key, askKey, index) {
    if (!stats.byExchangeRatio[index]) {
      stats.byExchangeRatio[index] = {
        offers: [],
        asks: []
      }
      stats.byExchangeRatio[index][key + '_base'] = item[key + '_base']
    }
    // if no asks, define them
    if (stats.byExchangeRatio[index].asks.length) {
      // assumes that the first in index is ask
      if (item[askKey] === stats.byExchangeRatio[index].asks[0][askKey]) {
        // console.log('is a ask!!', item)
        stats.byExchangeRatio[index].asks.push(item)
      } else {
        // console.log('is a offer!!', item)
        stats.byExchangeRatio[index].offers.push(item)
      }
    } else {
      stats.byExchangeRatio[index].asks.push(item)
    }
    // console.log('stats.byExchangeRatio', stats.byExchangeRatio)
  }
}

export default {
  name: 'exchangesd',
  props: {
    // currencyList: Array,
    currencyMap: Object,
    askList: Array,
    bidList: Array
  },
  data () {
    return {
      showWithOffersOnly: true,
      params,
      currency: this.currencyList,
      // collection: stats.byExchangeRatio,
      ask: this.askList,
      bid: this.bidList,
      title: 'Breach Currency Exchange'
    }
  },
  computed: {
    isCurrentAsk: function () {
      let items
      if (this.ask) {
        items = stats.setStats(this.ask, settings.keys.exchange.ratio, settings.keys.exchange.ask, settings.keys.exchange.bid)
        return filters.current(items, settings.keys.exchange.lastSeenTime, settings.refreshRate)
        // return items
      }
    },
    isCurrentBid: function () {
      let items
      if (this.bid) {
        items = stats.setStats(this.bid, settings.keys.exchange.ratio, settings.keys.exchange.ask, settings.keys.exchange.bid)
        return filters.current(items, settings.keys.exchange.lastSeenTime, settings.refreshRate)
        // return items
      }
    },
    // get only, just need a function
    // highestAsk: function () {
    //   return filters.highest(this.isCurrentAsk, settings.keys.exchange.ask)
    // },
    // highestBid: function () {
    //   return filters.highest(this.isCurrentBid, settings.keys.exchange.bid)
    // },
    biddingIndex: function () {
      let items
      // call other computers to make sure they are compiled
      this.isCurrentAsk // call ask first!
      this.isCurrentBid

      // should stats be passing in `this` values
      // instead of being writting in external funtions?
      // bad scope here?
      items = stats.byExchangeRatio

      console.log('before ordering by 1:X weight', Object.keys(stats.byExchangeRatio))
      items.orderBy = Object.keys(stats.byExchangeRatio).sort(function (a, b) {
        return stats.byExchangeRatio[b][settings.keys.exchange.ratio + '_base'] - stats.byExchangeRatio[a][settings.keys.exchange.ratio + '_base']
      })
      console.log('after ordering by weight', items.orderBy)
      return items
    }
    // currencyMap: function () {
    //   // currency hash (make this global)
    //   let items = {}
    //   this.currency.forEach(function (a) {
    //     items[a.id] = a
    //   })
    //   return items
    // }
  },
  components: {
    'offers-list': OffersList
  }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.tier {
  border-top: rem-calc(1) solid $primary-color;
  &.has-trade {
    color: $gray-light;
  }
}
.large {
  font-size: rem-calc(20)
}

</style>
 --> -->