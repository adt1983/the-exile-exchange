<template>
  <transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              {{raw}}
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="closeModal()">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { bus } from '../services/bus'
import settings from '../settings'

// const evt = {
//   namespace: 'modal',
//   // id: 'bids-list',
//   close: 'close',
//   opem: 'open'
// }

export default {
  name: 'Modal',
  data () {
    return {
      settings,
      showModal: true,
      bus,
      raw: ''
    }
  },
  // computed: {
  //   parseData: function (data) {
  //     console.log('keys', Object.keys(data))
  //     console.log('good data', data)
  //   }
  // },
  methods: {
    setData: function (data) {
      this.showModal = true
      this.raw = data
    },
    closeModal: function () {
      bus.$emit('modal.close')
    }
  },
  created: function () {
    const that = this
    bus.$on('modal.open', function (data) {
      console.log('data', data)
      if (data && Object.keys(data)) {
        that.setData(data)
        // that.$options.components.BidsList.props.key = data.key
        // that.$options.components.BidsList.props.list = data.list
      }
      // that.modalView.template = data
    })
    bus.$on('modal.close', function (data) {
      that.showModal = false
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

// .modal-mask {
//   position: fixed;
//   z-index: 9998;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, .5);
//   display: table;
//   transition: opacity $default-animation-speed ease;
// }

// .modal-wrapper {
//   display: table-cell;
//   vertical-align: middle;
// }

// .modal-container {
//   width: rem-calc(300);
//   @include breakpoint(small only) {
//     width: 98%;
//   }
//   margin: 0 auto;
//   padding: rem-calc(20) rem-calc(30);
//   background-color: $dark-color;
//   border-radius: rem-calc(2);
//   box-shadow: 0 rem-calc(2) 8px rgba(0, 0, 0, .33);
//   transition: all $default-animation-speed ease;
// }

// .modal-header h3 {
//   margin-top: 0;
//   // color: #42b983;
// }

// .modal-body {
//   margin: rem-calc(20) 0;
// }

// .modal-default-button {
//   float: right;
// }

// /*
//  * The following styles are auto-applied to elements with
//  * transition="modal" when their visibility is toggled
//  * by Vue.js.
//  *
//  * You can easily play with the modal transition by editing
//  * these styles.
//  */

// .modal-enter {
//   opacity: 0;
// }

// .modal-leave-active {
//   opacity: 0;
// }

// .modal-enter .modal-container,
// .modal-leave-active .modal-container {
//   // -webkit-transform: scale(1.1);
//   transform: scale(1.1);
// }

</style>
