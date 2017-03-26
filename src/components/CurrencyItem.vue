<template>
  <!-- <div class="shell"> -->
    <transition name="fade-in">
<!--       <div v-if="preloader === false" class="currency-item vertical nowrap align-center justify-center">
        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="78px" height="78px" viewBox="0 0 78 78" enable-background="new 0 0 78 78" xml:space="preserve">
        <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
          s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
          c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
          C22.32,8.481,24.301,9.057,26.013,10.047z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 34 34"
            to="360 34 34"
            dur="0.5s"
            repeatCount="indefinite"/>
          </path>
        </svg>
      </div> -->
      <figure v-if="input && preloader"
        class="currency-item is-input"
        v-bind:class="{ 'is-selected': selected, 'is-active': activeSelection, 'is-disabled': isDisabled }"
        v-on:mouseleave="activeSelection = false"
        v-on:click="selectItem">
         <img 

          :src="imgUrl" :alt="name"
          v-tooltip.top-center="ttmsg">
<!--          <img 
          class="show-for-small-only"
          :src="imgUrl" :alt="name">
        <small class="show-for-small-only currency-name" v-html="ttmsg"></small> -->
      </figure>
      <div
        v-if="!input && preloader"
        class="currency-item text-center is-display">
         <!-- <figure class="grid-content noscroll"> -->
          <img :src="imgUrl" :alt="name"
            v-tooltip.top-center="ttmsg">
          <!-- <h6 class="show-for-small-only currency-name text-center" v-html="ttmsg"></h6> -->
         <!-- </figure> -->
      </div>
    </transition>
  <!-- </div> -->
</template>

<script>
import settings from '../settings'
import { currency } from '../services/currency'

export default {
  name: 'currency-item',
  data () {
    return {
      keys: settings.keys.currency,
      // currency: [],
      currencyMap: {},
      settings,
      selected: false,
      activeSelection: false
    }
  },
  props: {
    input: {
      type: Boolean,
      default: false
    },
    // make these option
    // name: String,
    // imgUrl: String,
    // value: Number,

    id: [String, Number]
  },
  computed: {
    isDisabled: function () {
      return this.settings.defaults.disabledCurrencyIndexes.indexOf(this.id) > -1
    },
    preloader: function () {
      if (Object.keys(this.currencyMap).length && this.id) {
        return this.currencyMap[this.id]
      } else {
        return false
      }
    },
    name: function () {
      let item = this.preloader
      if (item) {
        return item[this.keys.name]
      } else {
        return item
      }
    },
    imgUrl: function () {
      let item = this.preloader
      if (item) {
        return item[this.keys.imgUrl]
      } else {
        return item
      }
    },
    value: function () {
      let item = this.preloader
      if (item) {
        return item[this.keys.value]
      } else {
        return item
      }
    },
    ttmsg: function () {
      let msg = ''
      if (this.selected) {
        // todo // add better styles
        // create checkbox component
        msg = '<strong>' + this.name + '</strong>'
      } else {
        msg = this.name
      }
      return msg
    }
  },
  methods: {
    // Instead of updating the value directly, this
    // method is used to format and place constraints
    // on the input's value
    selectItem: function () {
      if (this.isDisabled) {
        return
      }
      this.selected = !this.selected
      this.activeSelection = this.selected
      this.$emit('select', { id: this.id, selected: this.selected })
    }
  },
  beforeCreate: function () {
    // console.log('beforeCreate getSelectedAsks', this.getSelectedAsks)
    currency
      .then((response) => {
        this.currencyMap = response.collection
        // this.currency = response.items
      })
  }
  // filters: {
  //   timeAgo
  // }
}
</script>

<style lang="scss">
// call settings for global SCSS access
@import '../assets/styles/settings';
@import '../assets/styles/tooltip';

$icon-size: rem-calc(46) !default;

// .shell {
//   display: block;
//   padding: rem-calc(3);
// }
.fade-in-enter-active, 
.fade-in-leave-active {
  transition: opacity $default-animation-speed*2;
}
.fade-in-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
.currency-item {
  display: block;
  margin: auto ;
  padding: 0;
  transition: border-color $default-animation-speed;
  background-color: $dark-color;
  border: solid 1px $gray-dark;
  // padding: rem-calc(2);
  &.is-input {
    cursor: pointer;
    &:hover {
      border-color: $gray;
      cursor: pointer;
    }
  }
  &.is-selected {
    border-color: $success-color;
    background-color: $gray-dark;
    &:hover {
      border-color: $warning-color;
    }
  }
  &.is-active {
    border-color: $success-color;
    &:hover {
      border-color: $success-color;
    }
  }
  // active styles
  // width: 100%;
  // height: 100%;
  // width: rem-calc(78);
  // height: rem-calc(78);
  // line-height: 1;
  text-align: center;
  // float: left;
  // margin-right: .2em;
  // margin-bottom: .2em;
  &.is-display {
    border: none;
    background-color: transparent;
    // margin: auto;
    // filter: drop-shadow(rem-calc(-1) rem-calc(2) rem-calc(1) rgba($primary-color, 0.6));
  }
  img {
    margin: 0;
    padding: rem-calc(1);
    width: $icon-size;
    height: $icon-size;
    // width: rem-calc(78);
    // height: rem-calc(78);
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    .small-icon & {
      width: $icon-size/2;
      height: $icon-size/2;
    }
  }
  &.is-disabled {
    // cursor: not-allowed !important;
    cursor: no-drop !important;
    // border-color: $gray;
    &:hover {
      border-color: $gray-dark;
    }
    // img {
    //   filter: grayscale(100%);
    // }
  }
  // svg path,
  // svg rect {
  //   margin: auto;
  //   width: rem-calc(78);
  //   height: rem-calc(78);
  //   fill: $primary-color;
  //   .small-icon & {

  //   }
  // }
  
}
.currency-name {
  margin: $global-padding/4 auto $global-padding;

  @include breakpoint(small only) {
    display: block;
  }
}
</style>
