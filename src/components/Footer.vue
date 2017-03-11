<template>
  <div class="footer wrap">
    <div class="grid-block small-12 medium-6 noscroll contact">
      <div
        class="grid-content noscroll">
        <button
          v-if="!editName"
          :class="{'info': (accountName !== '')}"
          class="tiny button"
          type="button"
          @click="editName = true">
          {{accountName || defaultMsg}}
        </button>
        <small 
          v-if="editName"
          class="grid-content noscroll">
          <label>
            <span class="inline-label small">
              <input 
                @keyup.enter="submitName" 
                v-model="accountName" 
                type="search" 
                placeholder="Account Name">
              <a href="#"
                v-if="accountName !== ''"
                @click.stop.prevent="submitName"
                class="button">Save</a>
              <a href="#"
                v-if="accountName === ''"
                @click.stop.prevent="submitName"
                class="button alert">Close</a>
            </span>
          </label>
        </small>
      </div>
    </div>
    <div class="grid-block small-12 medium-6 noscroll copyright medium-text-right end"><small class="grid-content noscroll" v-html="msg"></small></div>
  </div>
</template>

<script>
import settings from '../settings'
import saved from '../services/selected'

function toRoman (num) {
  let result = ''
  const decimal = [
    1000,
    900,
    500,
    400,
    100,
    90,
    50,
    40,
    10,
    9,
    5,
    4,
    1
  ]

  const roman = [
    'M',
    'CM',
    'D',
    'CD',
    'C',
    'XC',
    'L',
    'XL',
    'X',
    'IX',
    'V',
    'IV',
    'I'
  ]

  for (let i = 0; i <= decimal.length; i++) {
  // looping over every element of our arrays
    while (num % decimal[i] < num) {
    // keep trying the same number until it won't fit anymore
      result += roman[i]
      // add the matching roman number to our result string
      num -= decimal[i]
      // remove the decimal value of the roman number from our number
    }
  }
  return result
}

export default {
  name: 'pageFooter',
  props: ['league'],
  data () {
    return {
      settings,
      editName: false,
      nameId: settings.keys.exchange.user,
      defaultMsg: 'Add your account name.',
      accountName: '',
      msg: 'copyright &copy; ' + toRoman(new Date().getFullYear()) + ' &bullet; Angelo'
    }
  },
  computed: {
    // setAccount: function () {
    //   this.selected.accountName = this.accountName
    // },
  },
  beforeCreate () {
    let name = saved.get(this.nameId)
    if (name) {
      this.accountName = name
    }
  },
  methods: {
    submitName (v) {
      // if (this.accountName !== '') {
      saved.set(this.nameId, this.accountName)
      // }
      this.editName = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// call settings for global SCSS access
@import '../assets/styles/settings';

.footer {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  align-items: center;
  padding: $global-padding/2 $global-padding;
  border-top: rem-calc(1) solid $body-font-color;
  background-color: $gray-dark;
  svg {
    fill: $anchor-font-color;
  }
  .grid-content {
    padding-left: 0;
    padding-right: 0;
  }
  @include breakpoint(small only) {
    .contact {
      margin-top: $global-padding/4;
    }
  }
}
.button {
  margin: 0;
}
small {
  font-weight: normal;
}

.hover-shadow {
  @include hovershadow;
}
</style>
