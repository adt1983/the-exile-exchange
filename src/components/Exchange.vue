<template>
  <div class="wrapper">
    <header class="grid-block shrink">
      <div class="grid-block text-center noscroll">
        <currency-item
          :input="false"
          :id="model.askId"
          class="ask-icon"
        ></currency-item>
        <currency-item
          :input="false"
          :id="model.bidId"
          class="ask-icon"
        ></currency-item>
      </div>
    </header>
    <div v-if="!hasData" class="grid-block shrink noscroll align-center preferences">
      No Data!
    </div>
    <table class="order-book">
      <thead>
      <th class="text-center">Bid</th>
      <th><div
        :show="hasData"
        v-on:click="refreshData()"
        class="svg-icon">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="27" height="32" viewBox="0 0 27 32">
          <path d="M26.982 18.857q0 0.089-0.018 0.125-1.143 4.786-4.786 7.759t-8.536 2.973q-2.607 0-5.045-0.982t-4.348-2.804l-2.304 2.304q-0.339 0.339-0.804 0.339t-0.804-0.339-0.339-0.804v-8q0-0.464 0.339-0.804t0.804-0.339h8q0.464 0 0.804 0.339t0.339 0.804-0.339 0.804l-2.446 2.446q1.268 1.179 2.875 1.821t3.339 0.643q2.393 0 4.464-1.161t3.321-3.196q0.196-0.304 0.946-2.089 0.143-0.411 0.536-0.411h3.429q0.232 0 0.402 0.17t0.17 0.402zM27.429 4.571v8q0 0.464-0.339 0.804t-0.804 0.339h-8q-0.464 0-0.804-0.339t-0.339-0.804 0.339-0.804l2.464-2.464q-2.643-2.446-6.232-2.446-2.393 0-4.464 1.161t-3.321 3.196q-0.196 0.304-0.946 2.089-0.143 0.411-0.536 0.411h-3.554q-0.232 0-0.402-0.17t-0.17-0.402v-0.125q1.161-4.786 4.821-7.759t8.571-2.973q2.607 0 5.071 0.991t4.375 2.795l2.321-2.304q0.339-0.339 0.804-0.339t0.804 0.339 0.339 0.804z"></path>
        </svg>
      </div></th>
      <th>Ask</th>
      </thead>
      <tbody>
      <tr
        :class="[{ 'has-bids': hasBids(key) }]"
        v-for="key in model.orderBy"
        :key="key"> <!-- TODO: Can 'increments' be removed? -->
        <td :class="applyColorClass(model.exchangeMap[key].bids)"
        ><a href=""
          :class="applyColorClass(model.exchangeMap[key].bids)"
          v-if="model.exchangeMap[key].bids && model.exchangeMap[key].bids.length"
          @click.prevent="showOffer(key, model.exchangeMap[key].bids, 'bid', model.leagueName)"
          >{{model.exchangeMap[key].bids.length}}</a></td>
        <td :class="{'has-account': isAccount(model.exchangeMap[key].asks) || isAccount(model.exchangeMap[key].bids)}"><span
          class="secondary-color body-font text-center">{{key}}</span></td>
        <td :class="applyColorClass(model.exchangeMap[key].asks)"
        ><a href=""
          :class="applyColorClass(model.exchangeMap[key].asks)"
          v-if="model.exchangeMap[key].asks && model.exchangeMap[key].asks.length"
          @click.prevent="showOffer(key, model.exchangeMap[key].asks, 'ask', model.leagueName)"
          >{{model.exchangeMap[key].asks.length}}</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import settings from '../settings'
  import { bus } from '../services/bus'
  import saved from '../services/selected'
  import { ExchangeModel } from '../services/exchange'

  import CurrencyItem from '../components/CurrencyItem'

  export default {
    name: 'exchange',
    props: {
      model: {
        type: ExchangeModel,
        required: true
      }
    },
    data () {
      return {
        settings,

        refreshInterval: undefined,

        filterBids: true,
        showModal: false,

        keys: settings.keys.exchange,

        accountName: '',
        accountNameSaveKey: settings.keys.exchange.user,

        title: 'The Exile Exchange'
      }
    },
    methods: {
      applyColorClass (orders) {
        let className = 'info-color'
        if (this.hasStock(orders)) {
          className = 'success-color'
        }
        if (this.isAccount(orders)) {
          className = className + ' warning-dark-bg' // highlight account name
        }
        return className
      },
      setAccountName () {
        let name = saved.get(this.accountNameSaveKey)
        if (name) {
          this.accountName = name
        }
      },
      hasStock (orders) {
        return orders.some(function (order) {
          return order.bid_stock >= order.bid_qty
        })
      },
      isAccount: function (orders) {
        const _accountName = this.accountName
        return orders.some(function (order) {
          return order.accountName === _accountName
        })
      },
      showOffer: function (key, list, type, leagueName) {
        const config = {key, list, type, leagueName}
        bus.$emit('modal.traderlist.open', config)
      },
      hasData: function () {
        const data = Object.keys(this.model.exchangeMap)
        return data && data.length
      },
      hasBids: function (key) {
        return this.model.exchangeMap[key] && this.model.exchangeMap[key].bids && this.model.exchangeMap[key].bids.length
      },
      hasAsks: function (key) {
        return this.model.exchangeMap[key] && this.model.exchangeMap[key].asks && this.model.exchangeMap[key].asks.length
      },
      showEmptyBids: function (key) {
        return this.filterBids === false || (this.model.exchangeMap[key].bids && this.model.exchangeMap[key].bids.length)
      },
      refreshData: function () {
        this.model.refresh()
      }
    },
    components: {
      CurrencyItem
    },
    created: function () {
      // selected service
      this.setAccountName()
      bus.$on('saved.accountName', this.setAccountName)
    }
  }
</script>

<style lang="scss" scoped>
  // call settings for global SCSS access
  @import '../assets/styles/settings';

  .wrapper {
    @include base-panel;
    min-width: 92px;
    margin-bottom: 0;
    padding-bottom: 0;
    header {
      padding-bottom: ($global-padding/3)*2;
    }
    overflow-y: hidden;
  }

  .small-font > {
    padding-top: 0.15rem;
    font-size: 0.7rem;
  }

  .preferences {
    background-color: $gray-dark;
    padding: $global-padding/2 0;
  }

  .order-book {
    /*
    http://stackoverflow.com/questions/23989463/how-to-set-tbody-height-with-overflow-scroll
    https://vuejs.org/v2/examples/grid-component.html
    http://stackoverflow.com/questions/29164556/absolute-div-block-with-header-and-scrollable-list-container
    */
    table {
      border: 2px solid #42b983;
      border-radius: 3px;
      background-color: #fff;
      //width: 92px;
    }

    thead, tbody tr {
      display: table;
      width: 100%;
      table-layout: fixed;
    }

    thead {
      //width: calc( 100% - 1em )/* scrollbar is average 1em/16px width, remove it from thead width */
    }

    th {
      background-color: $gray-dark;
      color: rgba(255, 255, 255, 0.66);
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      text-align: center;
    }

    tr {
      display: table;
      background-color: $dark-color;

      &:nth-child(even) {
        background-color: lighten($dark-color, 5);
      }
      &:nth-child(odd) {
        background-color: lighten($dark-color, 8);
      }

    }

    tbody {
      display: block;
      overflow-y: auto;
      max-height: calc(50vh - 112px); // TODO: Avoid magic number
    }

    td {
      text-align: center;
      a {
        padding: 2px 5px;
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        &:hover {
          background-color: $blocklist-item-background-hover;
        }
      }
    }

    th, td {
      vertical-align: center;
      min-width: 120px;
    }

    th.active {
      color: #fff;
    }

    th.active .arrow {
      opacity: 1;
    }

    .arrow {
      display: inline-block;
      vertical-align: middle;
      width: 0;
      height: 0;
      margin-left: 5px;
      opacity: 0.66;
    }
  }

  svg path,
  svg rect {
    fill: $secondary-color;
  }
</style>
