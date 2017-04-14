<template>
  <section class="bid-list">
    <ul>
      <li class="bid"
        @click="showContactInfo(order)"
        v-for="order in orders">
          <h6 class="body-font title">{{order[keys.name]}}&nbsp;&bullet;&nbsp;<span class="right warning-color">{{order[keys.user]}}</span><!-- &nbsp;<strong>{{ratio}}</strong> --></h6>
      </li>
    </ul>
  </section>
</template>

<script>
import { bus } from '../services/bus'
import settings from '../settings'
// to be mapped to ports (external component bindings)
export default {
  name: 'bids-list',
  data () {
    return {
      settings,
      showModal: false,
      keys: settings.keys.exchange,
      showOffers: false
      // time: 1000 * 60 * 10
    }
  },
  props: {
    orders: Array,
    ratio: String
  },
  methods: {
    showContactInfo: function (order) {
      bus.$emit('modal.contactinfo.open', order)
      // bus.$emit('modal.traderlist.close')
    },
    toggleList: function () {
      this.showOfferInfo = !this.showOfferInfo
    },
    itemId: function (item) {
      return item[this.keys.user]
    }
    // showOfferInfo: function (offer) {
    //   console.log('showOfferInfo', offer)
    //   alert(JSON.strigify(offer))
    // }
  }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';
@import './node_modules/angular-base-apps/scss/components/block-list';

.offer {
  cursor: pointer;
  @include hovershadow($secondary-color);

}
.bid-list {
  width: 100%;
  @include block-list-container(
    $font-size: 1rem, // Base font size for entire list
    $full-bleed: true // If true, negative margins are added on the left and right to push the list to the edge of the container
  );

  margin-bottom: 0;
  ul {
    margin-bottom: 0;
  }
  // Define what tag or class your list items are with this mixin
  li {
    /* property name | duration | timing function | delay */
    margin: 0;
    padding: rem-calc(10);
    @include block-list-item(
      // $color: #000, // Color of items
      // $color-hover, // Color of items on hover
      // $color-disabled, // Color of items when disabled
      // $background: transparent, // Background color
      // $background-hover: #ccc, // Background color on hover
      // $border: 1px solid #ccc, // Top and bottom border of items
      // $padding: 1rem
    );
    cursor: pointer;
    background-color: $dark-color;
    &:hover {
      background-color: $blocklist-item-background-hover;
    }
  }
  .title {
    padding: 0;
    margin: 0;
  }
}

</style>
