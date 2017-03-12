import { http } from 'services'
import { storageAvailable, setItemMap } from 'services/util'
import settings from 'settings'

const keys = settings.keys.exchange
const mapId = keys.id

const storageType = 'localStorage'
const storageId = 'breachCurrency'
// const 'data' = 'global'

let items = []
// let collection = {}

// function setItems (value) {
//   collection = setItemMap(value, mapId)
//   items = value
//   if (storageAvailable(storageType)) {
//     localStorage.setItem(storageId + ':list', JSON.stringify(value))
//     // localStorage.setItem(storageId + ':collection', JSON.stringify(collection))
//   }
//   return items
// }

// function getItems (uniqueId) {
//   if (storageAvailable(storageType) && localStorage[storageId + ':list']) {
//     items = JSON.parse(localStorage[storageId + ':list'])
//     // collection = JSON.parse(localStorage[storageId + ':collection'])
//   }
//   return items
// }

// function clearItems (uniqueId) {
//   if (storageAvailable(storageType)) {
//     localStorage.removeItem(storageId + uniqueId + ':list')
//     localStorage.removeItem(storageId + uniqueId + ':collection')
//   }
// }

export const exchange = new Promise(function (resolve, reject) {
  // let items = getItems()
  // if (items && items.length) {
  //   console.log('items from browser MEMORY', items)
  //   resolve({
  //     items,
  //     collection
  //   })
  // } else {
    http
      .get('/CurrencyOrder'
      .then((response) => {
        console.log('items fresh from API!', response.data)
        items = setItems(response.data)
        items.push({
          "accountName": "Travis", 
          "ask_id": items[0].ask_id, 
          "ask_qty": 1, 
          "bid_id": items[0].bid_id, 
          "bid_qty": 1, 
          "lastChar": "Cheeseman", 
          "lastSeenUTC": +(new Date()), 
          "league": items[0].league
        })
        resolve({
          // collection,
          items
        })
      })
  // }
})

// soft clear storage
// makes new external request to override data
// export function refresh () {
//   return new Promise(function (resolve, reject) {
//     http
//       .get('/Currency',
//       {
//         transformResponse
//       })
//       .then((response) => {
//         console.log('SOFT REFRESH items fresh from API!', response.data)
//         items = setItems('data', response.data)
//         resolve({
//           items,
//           collection
//         })
//       })
//   })
// }

// hard clear storage
// removes old data
// then makes new external request to override data
// export function reset () {
//   return new Promise(function (resolve, reject) {
//     clearItems('data')
//     http
//       .get('/Currency',
//       {
//         transformResponse
//       })
//       .then((response) => {
//         console.log('HARD REFRESH items fresh from API!', response.data)
//         items = setItems('data', response.data)
//         resolve({
//           items,
//           collection
//         })
//       })
//   })
// }
