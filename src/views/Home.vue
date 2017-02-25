<template>
  <div class="home">
<!--     <ul class="grid shrink no-bullets">
      <li v-for="item in currency">
        <img :src="item.icon" :alt="item.name">
        <strong>{{item.name}}</strong>
      </li>
    </ul> -->
  <!-- {{currency}} -->
    <!-- <exchange currency="currency"></exchange> -->
    <router-link to="/exchange" class="button">exchange</router-link>
  </div>
</template>

<script>
import currency from '../../static/currency.json'
import Exchange from '../components/Exchange'
export default {
  name: 'home',
  data () {
    return {
      currency,
      msg: 'Welcome'
    }
  },
  components: {
    // pageHeader,
    Exchange
  }

}
</script>

<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.home {
  width: 100%;
  overflow-y: scroll;
// 	display: flex;
//   flex-direction: row nowrap;
//   justify-content: flex-start;
//   align-content: flex-start;
//   align-items: flex-start;
//   @include breakpoint(medium) {
//     align-items: center;
//   }
}
// .button {
//   // white-space: nowrap;
//   margin: $global-padding*3;
//   filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.3));
//   &:hover {
//     filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.4));
//   }
//   svg {
//     fill: #fff;
//   }
// }

</style>
