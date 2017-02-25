<template>
  <div class="offers-list grid-block vertical nowrap">
      <!-- v-on:click="toggleOfferList" -->
    <div class="grid-block"
      v-if="!showOffers">
      <div class="grid-content">
        <button type="button"
          class="button success"
          v-on:click="showOffers = true">
          <span>Offers</span> 
          <strong>{{items.length}}</strong>
          <!-- todo: make button group -->
        </button>
      </div>
    </div>
    <ul class="grid-block vertical"
      v-if="showOffers">
      <li class="grid-block offer" 
        v-for="item in items">
        <div class="grid-block">
          <div class="grid-content text-center">
            <span>{{item.lastChar}}</span>
            <small>{{ item.time | timeAgo }}</small>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { settings } from '../settings'
import { timeAgo } from '../filters'
// to be mapped to ports (external component bindings)
export default {
  name: 'offers-list',
  data () {
    return {
      showOffers: false,
      settings
    }
  },
  props: {
    items: Array
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
    timeAgo
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
