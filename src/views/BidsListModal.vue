<template>
  <transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div
          :class="side"
          class="modal-container"
          id="contact-seller-container">

          <div class="grid-block">
            <div class="grid-block">
              <div class="grid-content">
                <h4 class="body-font float-left"><strong class="success">Contact Seller</strong></h4>
              </div>
            </div>
            <div class="grid-block shrink">
              <div class="grid-content text-right">
                <button class="button hollow info" @click="closeModal()">
                  <div class="svg-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="32"
                         viewBox="0 0 25 32">
                      <path
                        d="M23.179 23.607q0 0.714-0.5 1.214l-2.429 2.429q-0.5 0.5-1.214 0.5t-1.214-0.5l-5.25-5.25-5.25 5.25q-0.5 0.5-1.214 0.5t-1.214-0.5l-2.429-2.429q-0.5-0.5-0.5-1.214t0.5-1.214l5.25-5.25-5.25-5.25q-0.5-0.5-0.5-1.214t0.5-1.214l2.429-2.429q0.5-0.5 1.214-0.5t1.214 0.5l5.25 5.25 5.25-5.25q0.5-0.5 1.214-0.5t1.214 0.5l2.429 2.429q0.5 0.5 0.5 1.214t-0.5 1.214l-5.25 5.25 5.25 5.25q0.5 0.5 0.5 1.214z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="grid-block"> <!-- TODO: Justify left -->
            <div class="grid-content">
              <h2 class="body-font"><strong>Buy {{this.getBuyQty()}}</strong>
              </h2>
            </div>
            <div class="grid-content">
              <currency-item
                :input="false"
                :id=activeOrder.bid_id
                class="ask-icon"
              ></currency-item>
            </div>
            <div class="grid-content">
              <h2 class="body-font"><strong> for {{this.getPayQty()}}</strong>
              </h2>
            </div>
            <div class="grid-content">
              <currency-item
                :input="false"
                :id=activeOrder.ask_id
                class="ask-icon"
              ></currency-item>
            </div>
          </div>

          <div class="grid-block v-align noscroll">
            <section class="small-12 medium-6 grid-content noscroll align-top">
              <label for="multi">
                <span class="inline-label">
                  <span class="form-label">Multiplier</span>
                    <input
                      id="multi"
                      name="multi"
                      v-model.number="selectedMultiplier"
                      type="number"
                      min="1">
                </span>
              </label>
            </section>
          </div>

          <textarea
            onclick="this.focus();this.select()"
            readonly
            @keyup.meta.67="isCopied = true"
            class="trade-text"
            v-model="message"></textarea>

          <table class="seller-list">
            <thead>
            <th>Seller</th>
            <th class="text-right">Stock</th>
            <th class="text-right">Last Seen</th>
            </thead>
            <tbody>
            <tr v-for="order in raw.list" @click="setActiveOrder(order)">
              <td>{{order.lastChar}}</td>
              <td class="text-right">{{order.bid_stock}}</td>
              <td class="text-right">{{order.lastSeenUTC | fromNowFilter}}</td>
            </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import moment from 'moment'
  import { bus } from '../services/bus'
  import { pluralize } from '../filters'
  import settings from '../settings'
  import { league } from '../services/league'
  import { currency } from '../services/currency'

  import CurrencyItem from '../components/CurrencyItem'

  export default {
    name: 'bids-list-modal',
    data () {
      return {
        settings,
        // for wrapper not content
        currencyMap: {},
        leagueMap: {},
        showModal: false,
        selectedMultiplier: 1,
        side: 'center',
        keys: settings.keys.exchange,
        bus,
        raw: '',
        activeOrder: '',
        leagueName: ''
      }
    },
    beforeCreate: function () {
      const that = this
      currency
        .then((response) => {
          that.currencyMap = response.collection
        })
      league
        .then((response) => {
          that.leagueMap = response.collection
        })
    },
    components: {
      CurrencyItem
    },
    computed: {
      message: function () {
        const ao = this.activeOrder
        return '@' + ao.lastChar + ' Hi, I\'d like to buy your ' + this.getBuyQty() +
          ' ' + this.getCurrencyName(ao.bid_id) +
          ' for my ' + this.getPayQty() +
          ' ' + this.getCurrencyName(ao.ask_id) +
          ' in ' + this.leagueName + '.'
      },
      showOffers: function () {
        return this.raw && this.raw.key && this.raw.list
      },
      bidLabel () {
        if (this.raw.list) {
          return pluralize(this.raw.list.length, ' ' + this.raw.type)
        }
      }
    },
    methods: {
      setData: function (data) {
        this.showModal = true
        this.raw = data
        this.setActiveOrder(this.raw.list[0])
        this.leagueName = this.raw.leagueName
      },
      closeModal: function () {
        this.showModal = false
      },
      correctedMultiplier: function () {
        if (typeof (this.selectedMultiplier) === 'number') {
          return this.selectedMultiplier
        } else {
          return 1
        }
      },
      setActiveOrder: function (order) {
        this.activeOrder = order
      },
      getBuyQty: function () {
        return this.activeOrder.bid_qty * this.correctedMultiplier()
      },
      getPayQty: function () {
        return this.activeOrder.ask_qty * this.correctedMultiplier()
      },
      getCurrencyName (id) {
        return this.currencyMap[id].name
      }
    },
    created: function () {
      const that = this
      bus.$on('modal.traderlist.open', function (data) {
        if (data && Object.keys(data)) {
          that.selectedMultiplier = 1
          that.setData(data)
        }
      })
      bus.$on('modal.traderlist.close', function (data) {
        that.closeModal()
      })
    },
    filters: {
      fromNowFilter: function (value) {
        if (value) {
          moment.locale('en', {
            relativeTime: {
              future: 'in %s',
              past: '%s ago',
              s: '1s',
              ss: '%ss',
              m: '1m',
              mm: '%dm',
              h: 'an hour',
              hh: '%dh',
              d: 'a day',
              dd: '%dd',
              M: 'a month',
              MM: '%dM',
              y: 'a year',
              yy: '%dY'
            }
          })
          return moment(value).fromNow()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  // call settings for global SCSS access
  @import '../assets/styles/settings';
  @import './node_modules/angular-base-apps/scss/components/block-list';

  // https://vuejs.org/v2/examples/modal.html
  // https://jsfiddle.net/yyx990803/mwLbw11k/?utm_source=website&utm_medium=embed&utm_campaign=mwLbw11k
  #contact-seller-container {
    width: 33rem;
  }

  .svg-icon {
    svg {
      fill: $white;
    }
  }

  .offer {
    cursor: pointer;
    @include hovershadow($secondary-color);

  }

  .seller-list {
    /*
    http://stackoverflow.com/questions/23989463/how-to-set-tbody-height-with-overflow-scroll
    https://vuejs.org/v2/examples/grid-component.html
    http://stackoverflow.com/questions/29164556/absolute-div-block-with-header-and-scrollable-list-container
    */
    table {
      border: 2px solid #42b983;
      border-radius: 3px;
      background-color: #fff;
      width: 33rem;
    }

    thead, tbody tr {
      display: table;
      width: 100%;
      table-layout: fixed;
    }

    th {
      background-color: $gray-dark;
      color: rgba(255, 255, 255, 0.66);
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    tr {
      display: table;
      cursor: pointer;
      background-color: $dark-color;

      &:nth-child(even) {
        background-color: lighten($dark-color, 5);
      }
      &:nth-child(odd) {
        background-color: lighten($dark-color, 8);
      }
      &:hover {
        background-color: $blocklist-item-background-hover;
      }
    }

    tbody {
      display: block;
      max-height: 33rem;
      overflow-y: auto;
    }

    td {

    }

    th, td {
      min-width: 120px;
      padding: 10px 20px;
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

  .age {
    margin-top: $global-padding/2;
  }

  .trade-text {
    cursor: copy;
    width: 100%;
    height: rem-calc(100);
    background-color: $gray-dark;
    margin: $global-padding 0;
    padding: $global-padding/2 $global-padding;
    line-height: 2;
    border-radius: $global-radius;
  }
</style>
