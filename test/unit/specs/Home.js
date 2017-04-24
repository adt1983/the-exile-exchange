// import Vue from 'vue'
// import http from '../../../src/services'
// import moxios from 'moxios'
// import sinon from 'sinon'
// import { equal } from 'assert'
// // // import Router from 'vue-router'
// // import Home from 'src/views/Home'

// // describe('Home.vue', () => {
// //   // it('should render correct contents', () => {
// //   //   const Constructor = Vue.extend(Home)
// //   //   const vm = new Constructor().$mount()
// //   //   expect(vm.$el.querySelector('h1').textContent)
// //   //     .to.equal('Select League.')
// //   // })
// //   it('should make the request and update the results variable', (done) => {
// //    moxios.stubRequest('./static/data.json', {
// //      status: 200,
// //      responseText: {
// //        data: [
// //          { id: 1, name: 'Mexican keyboard cat' },
// //          { id: 2, name: 'Will it blend?' }
// //        ]
// //      }
// //    })

// //    const VM = new Vue(App)
// //    expect(VM.$data.results).to.be.null

// //    VM.getData().then(() => {
// //      expect(VM.$data.results).to.be.an('array')
// //      expect(VM.$data.results).to.have.length(2)
// //    }).then(done, done)
// //  })
// // })

// describe('mocking axios requests', function () {

//   describe('across entire suite', function () {

//     beforeEach(function () {
//       // import and pass your custom axios instance to this method
//       moxios.install()
//     })

//     afterEach(function () {
//       // import and pass your custom axios instance to this method
//       moxios.uninstall()
//     })

//     it('specify response for a specific request', function (done) {
//       let input = document.querySelector('.UserList__Filter__Input')
//       let button = document.querySelector('.UserList__Filter__Button')

//       input.value = 'flintstone'
//       button.click()

//       // Elsewhere in your code axios.get('/users/search', { params: { q: 'flintstone' } }) is called

//       moxios.wait(function () {
//         let request = moxios.requests.mostRecent()
//         request.respondWith({
//           status: 200,
//           response: [
//             { id: 1, firstName: 'Fred', lastName: 'Flintstone' },
//             { id: 2, firstName: 'Wilma', lastName: 'Flintstone' }
//           ]
//         }).then(function () {
//           let list = document.querySelector('.UserList__Data')
//           equal(list.rows.length, 2)
//           equal(list.rows[0].cells[0].innerHTML, 'Fred')
//           equal(list.rows[1].cells[0].innerHTML, 'Wilma')
//           done()
//         })
//       })
//     })

//     it('stub response for any matching request URL', function (done) {
//       // Match against an exact URL value
//       moxios.stubRequest('/say/hello', {
//         status: 200,
//         responseText: 'hello'
//       })

//       // Alternatively URL can be a RegExp
//       moxios.stubRequest(/say.*/, {/* ... */})

//       let onFulfilled = sinon.spy()
//       axios.get('/say/hello').then(onFulfilled)

//       moxios.wait(function () {
//         equal(onFulfilled.getCall(0).args[0].data, 'hello')
//         done()
//       })
//     })

//   })

//   it('just for a single spec', function (done) {
//     moxios.withMock(function () {
//       let onFulfilled = sinon.spy()
//       axios.get('/users/12345').then(onFulfilled)

//       moxios.wait(function () {
//         let request = moxios.requests.mostRecent()
//         request.respondWith({
//           status: 200,
//           response: {
//             id: 12345, firstName: 'Fred', lastName: 'Flintstone'
//           }
//         }).then(function () {
//           equal(onFulfilled.called, true)
//           done()
//         })
//       })
//     })
//   })

// })
