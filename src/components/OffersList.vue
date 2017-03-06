<template>
  <section class="bid-list">
    <!-- <header>Offers <span class="badge" :class="{'success':items.length}">{{items.length}}</span></header> -->
    <ul>
      <li class="bid"
        @click="showContactInfo(item)"
        v-for="item in items">
          <h6 class="body-font title">{{item[keys.name]}}&nbsp;&bullet;&nbsp;<span class="right warning-color">{{item[keys.user]}}<!-- </span>&nbsp;<strong>{{ratio}}</strong> --></h6>
      </li>
    </ul>
  </section>
</template>

<script>
import { bus } from '../services/bus'
import settings from '../settings'
import moment from 'moment'
// to be mapped to ports (external component bindings)
export default {
  name: 'offers-list',
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
    items: Array,
    ratio: String
  },
  methods: {
    showContactInfo: function (info) {
      bus.$emit('modal.contactinfo.open', info)
      bus.$emit('modal.offerlist.close')
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
@import './node_modules/angular-base-apps/scss/components/block-list';

.offer {
  cursor: pointer;
  @include hovershadow($secondary-color);

}
.bid-list {
  width: 100%;
  // This gets you basic styles
  @include block-list-container(
    $font-size: 1rem, // Base font size for entire list
    $full-bleed: true // If true, negative margins are added on the left and right to push the list to the edge of the container
  );

  margin-bottom: 0;
  ul {
    margin-bottom: 0;
  }

  // This adds support for text fields, dropdowns, and radio/check inputs
  // @include block-list-inputs(
  //   $color: #000, // Foreground color
  //   $background, #fff, // Background color
  //   $background-hover: #fff, // Background color of elements on hover
  //   $padding: 1rem, //
  // );

  // This adds support for icons
  // &.with-icons {
  //   @include block-list-icons(
  //     $size: 0.8, // This should be a decimal point. 0.8 makes the icon 80% the size of its parent
  //     $item-selector: 'li' // This should be whatever tag or class your block list uses for items
  //   );
  // }

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
    // &.has-asks {
    //   background-color: red;
    // }
    // Add styles for list items with chevrons
    // &.with-chevron {
    //   @include block-list-chevron(
    //     $color: #000, // Color of chevron
    //     $padding: 1rem, // Insert the same padding as the block list item here
    //     $label-class: 'block-list-label' // Insert the class you're using for labels
    //   );
    // }
  }

  // Define what tag or class your headers are with this mixin
  // header {
  //   @include block-list-header(
  //     $color: #000, // Text color
  //     $font-size: 1rem, // Font size
  //     $uppercase: true, // If true, the text becomes all-caps
  //     $offset: 1rem // Left-side offset for text
  //   );
  // }

  // Define the class for labels
  // .block-list-label {
  //   @include block-list-label(
  //     $color: #999, // Color of label
  //     $left-class: 'left', // Define a modifier class for left-aligned labels
  //     $left-padding: 1rem // Padding to add when a label is left-aligned
  //   );
  // }
  .title {
    padding: 0;
    margin: 0;
  }
}

</style>
