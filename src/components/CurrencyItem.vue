<template>
  <transition name="fade-in">
    <figure v-if="input && preloader"
      class="currency-item is-input"
      v-bind:class="{ 'is-selected': selected, 'is-active': activeSelection, 'is-disabled': isDisabled }"
      v-on:mouseleave="activeSelection = false"
      v-on:click="selectItem">
       <img 
        :src="imgUrl" :alt="name"
        v-tooltip.top-center="ttmsg">
    </figure>
    <div
      v-if="!input && preloader"
      class="currency-item text-center is-display">
        <img :src="imgUrl" :alt="name"
          v-tooltip.top-center="ttmsg">
    </div>
  </transition>
</template>

<script>
import settings from '../settings'
import saved from '../services/selected'
import { currency } from '../services/currency'

export default {
  name: 'currency-item',
  data () {
    return {
      keys: settings.keys.currency,
      currencyMap: {},
      settings,
      selected: false,
      activeSelection: false,
      animate: null
    }
  },
  props: {
    input: {
      type: Boolean,
      default: false
    },

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
    selectItemUI: function (isClick) {
      if (this.isDisabled) {
        return
      }
      this.selected = !this.selected
      if (isClick) {
        this.activeSelection = this.selected
      }
    },
    selectItem: function (isClick) {
      this.selectItemUI(isClick)
      this.$emit('select', { id: this.id, selected: this.selected })
    }
  },
  beforeCreate: function () {
    currency
      .then((response) => {
        this.currencyMap = response.collection
      })
  },
  created: function () {
    const currencies = saved.get(this.keys.saveAs)
    const id = typeof (this.id) === 'string' ? this.id : this.id.toString()
    let index = currencies.indexOf(id)
    if (index !== -1) {
      let dis = this
      this.animate = setTimeout(function () {
        dis.selectItem()
      }, 180 * index)
    }
  },
  beforeDestory () {
    clearTimeout(this.animate)
  }
}
</script>

<style lang="scss">
// call settings for global SCSS access
@import '../assets/styles/settings';
@import '../assets/styles/tooltip';

$icon-size: rem-calc(46) !default;
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
  text-align: center;
  &.is-display {
    border: none;
    background-color: transparent;
  }
  img {
    margin: 0;
    padding: rem-calc(1);
    width: $icon-size;
    height: $icon-size;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    .small-icon & {
      width: $icon-size/2;
      height: $icon-size/2;
    }
  }
  &.is-disabled {
    cursor: no-drop !important;
    &:hover {
      border-color: $gray-dark;
    }
  }
  
}
.currency-name {
  margin: $global-padding/4 auto $global-padding;

  @include breakpoint(small only) {
    display: block;
  }
}
</style>
