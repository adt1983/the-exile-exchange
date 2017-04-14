<template>
  <div class="currency-list">
    <ol>
      <li class="currency-item-wrapper" 
        v-for="item in currency" :key="item[keys.id]">
       <!--  <div class="grid-block">
          <div class="grid-content text-center"> -->
            <currency-item
              v-on:select="selectItem"
              :input="true"
              :id="item[keys.id]"
              ></currency-item>
          <!-- </div>
        </div> -->
      </li>
    </ol>
  </div>
</template>

<script>
// import { bus } from '../services/bus'
import settings from '../settings'
// import { timeAgo } from '../filters'
import { currency } from '../services/currency'
import CurrencyItem from './CurrencyItem'

export default {
  name: 'currency-list',
  props: {
    preselected: [Array]
  },
  data () {
    return {
      keys: settings.keys.currency,
      currency: [],
      currencyMap: {},
      selected: [],
      title: 'List'
    }
  },
  components: {
    'currency-item': CurrencyItem
  },
  methods: {
    selectItem: function (item) {
      console.log('selectItem', item)
      if (item.selected) {
        this.selected.push(item)
      } else {
        if (this.selected.indexOf(item)) {
          this.selected.splice(this.selected.indexOf(item), 1)
        }
      }
      this.$emit('selected', this.selected)
    }
    // makeSelections () {
    //   if (this.preselected && this.preselected.length) {
    //     for (let item of this.preselected) {
    //       // console.log('cur', item)
    //       // let cur = item
    //       // cur.selected = true
    //       bus.$emit('selectitem', this.currencyMap[item.id])
    //       // this.selectItem(this.currencyMap[item.id])
    //       // bus.$emit('select-preset', cur)
    //     }
    //   }
    // }
  },
  beforeCreate: function () {
    // console.log('beforeCreate getSelectedAsks', this.getSelectedAsks)
    currency
      .then((response) => {
        this.currencyMap = response.collection
        this.currency = response.items
        // this.makeSelections()
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
  // padding: 0 $global-padding*3;
  ol {
    @include base-panel;
    padding: 0;
    margin: auto;
    list-style: none;
    // display: flex;
    // flex-flow: row wrap;
  }
  .currency-item-wrapper {
    display: inline-block;
    // flex: 0 0 auto;
    padding: 0;
    margin: rem-calc(3) rem-calc(2.5);
  }
  .grid-content {
    margin: 0;
    padding: 0;
  }
}

</style>
