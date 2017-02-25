<template>
  <div class="currency-list">
    <ol class="grid-block wrap">
      <li class="grid-block shrink" 
        v-for="item in items">
        <div class="grid-block">
          <div class="grid-content text-center">
            <currency-item
              v-on:select="selectItem"
              :input="true"
              :id="item[keys.id]" 
              :name="item[keys.name]" 
              :imgUrl="item[keys.imgUrl]"
              :value="item[keys.value]"
              ></currency-item>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import { settings } from '../settings'
// import { timeAgo } from '../filters'
import { currency } from '../api/currency'
import CurrencyItem from './CurrencyItem'

export default {
  name: 'currency-list',
  data () {
    return {
      keys: settings.keys.currency,
      currency: [],
      selected: [],
      title: 'List'
    }
  },
  props: {
    items: Array
  },
  components: {
    'currency-item': CurrencyItem
  },
  methods: {
    selectItem: function (item) {
      if (item.selected) {
        this.selected.push(item)
      } else {
        if (this.selected.indexOf(item)) {
          this.selected.splice(this.selected.indexOf(item), 1)
        }
      }
      this.$emit('selected', this.selected)
    }
  },
  beforeCreate: function () {
    // console.log('beforeCreate getSelectedAsks', this.getSelectedAsks)
    currency
      .then((response) => {
        // this.currencyMap = response.collection
        this.currency = response.items
      })
  }
  // filters: {
  //   timeAgo
  // }
}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.currency-list {
  ol {
    list-style: none;
  }
}

</style>
