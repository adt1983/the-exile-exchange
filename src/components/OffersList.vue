<template>
  <div class="grid-content">
<!--     <div class="grid-block"
      v-if="!showOffers">
      <div class="grid-content">
        <button type="button"
          class="button success"
          v-on:click="showOffers = true">
          <span>Offers</span> 
          <strong>{{items.length}}</strong>
        </button>
      </div>
    </div> -->
<!--     <section class="block-list">
      <header>Offers <span class="badge" :class="{'success':items.length}">{{items.length}}</span></header>
      <ul>
        <li class="with-chevron"
          v-for="item in items">
        </li>
      </ul>
    </section> -->
    <ul class="inline-list text-center">
      <li v-for="item in items">
        <!-- <div class="grid-block horizontal">
          <div class="grid-content text-center"> -->
            <button type="button"
              class="button tiny">
              <h5 class="body-font">{{item[keys.name]}}</h5>
              <strong>{{ratio}}</strong>&nbsp;&bullet;&nbsp;<small>{{item[keys.time] | lastSeen}}</small>
            </button>
          <!-- </div>
        </div> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { settings } from '../settings'
import moment from 'moment'
// to be mapped to ports (external component bindings)
export default {
  name: 'offers-list',
  data () {
    return {
      settings,
      keys: settings.keys.exchange,
      showOffers: false
      // time: 1000 * 60 * 10
    }
  },
  props: {
    items: Array,
    ratio: String
  },
  method: {
    toggleList: function () {
      this.showOfferInfo = !this.showOfferInfo
    }
    // showOfferInfo: function (offer) {
    //   console.log('showOfferInfo', offer)
    //   alert(JSON.strigify(offer))
    // }
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

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

// .offers-list {
  .offerer {
    border-top: rem-calc(1) solid $secondary-color;
  }
  // &.has-trade {
  //   background-color: $primary-color;
  // }
// }

</style>
