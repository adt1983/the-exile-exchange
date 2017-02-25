<template>
  <div class="glrid-block shell">
    <div v-if="preloader === false">
      Loading...
    </div>
    <figure v-if="input && preloader"
      class="currency-item grid-block vertical nowrap is-input"
      v-bind:class="{ 'is-selected': selected, 'is-active': activeSelection }"
      v-on:mouseleave="activeSelection = false"
      v-on:click="selectItem">
       <img 
        class="show-for-medium"
        :src="imgUrl" :alt="name"
        v-tooltip.top-center="ttmsg">
       <img 
        class="show-for-small-only"
        :src="imgUrl" :alt="name">
      <small class="show-for-small-only grid-block currency-name" v-html="ttmsg"></small>
    </figure>
    <figure 
      v-if="!input && preloader"
      class="currency-item grid-block vertical nowrap">
       <img :src="imgUrl" :alt="name"
        v-tooltip.top-center="ttmsg">
    </figure>
  </div>
</template>

<script>
import { settings } from '../settings'
import { currency } from '../api/currency'

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
        msg = this.name + '<em>checked</em>'
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
.shell {
  width: rem-calc(78);
  // height: rem-calc(78);
}
// figcaption,
// figure {
//   display: block;
// }
.currency-item {
  transition: border-color $default-animation-speed;
  background-color: $dark-color;
  border: solid 1px $gray-dark;
  // margin: rem-calc(2);
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
  width: 100%;
  height: 100%;
  // width: rem-calc(78);
  // height: rem-calc(78);
  line-height: 1;
  text-align: center;
  // float: left;
  // margin-right: .2em;
  // margin-bottom: .2em;
  img {
    width: rem-calc(78);
    height: rem-calc(78);
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}
.currency-name {
  margin: $global-padding/4 auto $global-padding;

  @include breakpoint(small only) {
    display: block;
  }
}
</style>
