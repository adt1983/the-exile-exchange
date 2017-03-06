<template>
  <transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="grid-block">
            <div class="grid-block">
              <div class="grid-content">
                <h4 class="body-font float-left"><strong class="success">{{bidLabel}}</strong> at <strong>{{raw.key}}</strong></h4>
              </div>
            </div>
            <div class="grid-block shrink">
              <div class="grid-content">
                <button class="button tiny hollow info  text-right" @click="closeModal()">
                  <div class="svg-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="32" viewBox="0 0 25 32">
                    <path d="M23.179 23.607q0 0.714-0.5 1.214l-2.429 2.429q-0.5 0.5-1.214 0.5t-1.214-0.5l-5.25-5.25-5.25 5.25q-0.5 0.5-1.214 0.5t-1.214-0.5l-2.429-2.429q-0.5-0.5-0.5-1.214t0.5-1.214l5.25-5.25-5.25-5.25q-0.5-0.5-0.5-1.214t0.5-1.214l2.429-2.429q0.5-0.5 1.214-0.5t1.214 0.5l5.25 5.25 5.25-5.25q0.5-0.5 1.214-0.5t1.214 0.5l2.429 2.429q0.5 0.5 0.5 1.214t-0.5 1.214l-5.25 5.25 5.25 5.25q0.5 0.5 0.5 1.214z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="modal-body grid-block">
            <offers-list
               v-if="showOffers"
              :ratio="raw.key"
              :items="raw.list"></offers-list> 
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { bus } from '../services/bus'
import { pluralize } from '../filters'
import settings from '../settings'

import OffersList from '../components/OffersList'

export default {
  name: 'offers-list-modal',
  data () {
    return {
      settings,
      // for wrapper not content
      showModal: false,
      bus,
      raw: ''
    }
  },
  components: {
    OffersList
  },
  computed: {
    showOffers: function () {
      return this.raw && this.raw.key && this.raw.list
    },
    bidLabel () {
      if (this.raw.list) {
        return pluralize(this.raw.list.length, ' bid')
      }
    }
  },
  methods: {
    setData: function (data) {
      this.showModal = true
      this.raw = data
    },
    closeModal: function () {
      this.showModal = false
    }
  },
  created: function () {
    const that = this
    bus.$on('modal.offerlist.open', function (data) {
      console.log('data', data)
      if (data && Object.keys(data)) {
        that.setData(data)
        // that.$options.components.OffersList.props.key = data.key
        // that.$options.components.OffersList.props.list = data.list
      }
      // that.modalView.template = data
    })
    bus.$on('modal.offerlist.close', function (data) {
      that.closeModal()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

// https://vuejs.org/v2/examples/modal.html
// https://jsfiddle.net/yyx990803/mwLbw11k/?utm_source=website&utm_medium=embed&utm_campaign=mwLbw11k

.svg-icon {
  svg {
    fill: $white;
  }
}


</style>
