<template>
  <transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="grid-block">
            <div class="grid-block noscroll">
              <div class="grid-content noscroll">
               <h6 class="body-font title">{{raw[keys.name]}}<br><span class="right warning-color">{{raw[keys.user]}}
              </div>
            </div>
            <div class="grid-block shrink text-right">
              <div class="grid-content">
                <button class="button tiny info  text-right" @click="closeModal()">
                  Close&nbsp;<div class="svg-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="32" viewBox="0 0 25 32">
                    <path d="M23.179 23.607q0 0.714-0.5 1.214l-2.429 2.429q-0.5 0.5-1.214 0.5t-1.214-0.5l-5.25-5.25-5.25 5.25q-0.5 0.5-1.214 0.5t-1.214-0.5l-2.429-2.429q-0.5-0.5-0.5-1.214t0.5-1.214l5.25-5.25-5.25-5.25q-0.5-0.5-0.5-1.214t0.5-1.214l2.429-2.429q0.5-0.5 1.214-0.5t1.214 0.5l5.25 5.25 5.25-5.25q0.5-0.5 1.214-0.5t1.214 0.5l2.429 2.429q0.5 0.5 0.5 1.214t-0.5 1.214l-5.25 5.25 5.25 5.25q0.5 0.5 0.5 1.214z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="modal-body">
               {{raw}}
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { bus } from '../services/bus'
import { settings } from '../settings'

export default {
  name: 'contact-info-modal',
  data () {
    return {
      settings,
      // for wrapper not content
      showModal: false,
      keys: settings.keys.exchange,
      bus,
      raw: ''
    }
  },
  // components: {
  //   OffersList
  // },
  computed: {
    showOffers: function () {
      return this.raw && this.raw.key && this.raw.list
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
    bus.$on('modal.contactinfo.open', function (data) {
      console.log('data', data)
      if (data && Object.keys(data)) {
        that.setData(data)
        // that.$options.components.OffersList.props.key = data.key
        // that.$options.components.OffersList.props.list = data.list
      }
      // that.modalView.template = data
    })
    bus.$on('modal.contactinfo.close', function (data) {
      that.closeModal()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.svg-icon {
  svg {
    fill: $white;
  }
}

</style>
