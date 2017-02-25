<template>
  <div class="footer wrap">
    <div class="grid-block small-12 medium-6 noscroll copyright"><small class="grid-content noscroll" v-html="msg"></small></div>
    <div class="grid-block small-12 medium-6 noscroll contact end medium-text-right">
      <small class="grid-content noscroll">
        <a href="mailto:travis@travismullen.com" title="mail" class="hover-shadow">travis&#64;travismullen.com<div class="svg-icon postfix">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32">
              <path d="M31.5 0.196q0.589 0.429 0.482 1.143l-4.571 27.429q-0.089 0.518-0.571 0.804-0.25 0.143-0.554 0.143-0.196 0-0.429-0.089l-8.089-3.304-4.321 5.268q-0.321 0.411-0.875 0.411-0.232 0-0.393-0.071-0.339-0.125-0.545-0.42t-0.205-0.652v-6.232l15.429-18.911-19.089 16.518-7.054-2.893q-0.661-0.25-0.714-0.982-0.036-0.714 0.571-1.054l29.714-17.143q0.268-0.161 0.571-0.161 0.357 0 0.643 0.196z"></path>
            </svg>
          </div></a>
      </small>
    </div>
  </div>
</template>

<script>

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
  data () {
    return {
      msg: 'copyright &copy; ' + toRoman(new Date().getFullYear()) + ' &bullet; TravisMullen.com'
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
  svg {
    fill: $anchor-font-color;
  }
  
  .grid-content {
    padding-left: 0;
    padding-right: 0;
  }

  // .copyright {
  //   text-align: center;
  // }
  @include breakpoint(small only) {
    .contact {
      margin-top: $global-padding/4;
    }
  }
  // @include breakpoint(medium) {
  //   .copyright {
  //     text-align: left;
  //   }
  //   .contact {
  //     text-align: right;
  //   }
  // }
}

small {
  // flex: 1 0 auto;
  // display: block;
  // filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.3));
  font-weight: normal;
  // color: $secondary-color;
  // text-align: center;
}

.hover-shadow {
  @include hovershadow;
//   filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.3));
//   &:hover {
//     filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.4));
//   }
}
</style>
