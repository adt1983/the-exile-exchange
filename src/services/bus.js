import Vue from 'vue'

// for sending/recieving global events
export const bus = new Vue()

// // in component A's method
// bus.$emit('id-selected', 1)
// // in component B's created hook
// bus.$on('id-selected', function (id) {
//   // ...
// })
