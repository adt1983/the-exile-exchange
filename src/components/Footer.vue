<template>
  <small>copyright&nbsp;&copy;&nbsp;{{ msg }} | <a href="mailto:travis&#64;travismullen.com" title="mail">travis&#64;travismullen.com</a></small>
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
      msg: toRoman(new Date().getFullYear()) + ' TravisMullen.com. all rights reserved.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// call settings for global SCSS access
@import '../styles/settings';

small {
  border-top: rem-calc(1) solid $body-font-color;
  // filter: drop-shadow(rem-calc(1) rem-calc(2) rem-calc(2) rgba(0, 0, 0, 0.3));
  padding-top: $global-padding;
  font-weight: normal;
  font-color: $secondary-color;
  padding-bottom: $global-padding;
}
</style>
