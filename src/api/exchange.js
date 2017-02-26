import { http } from 'api'
import { settings } from 'settings'

const keys = settings.keys.exchange
const mapId = keys.id

const storageType = 'localStorage'
const storageId = 'breachCurrency'
// const 'data' = 'global'

let items = []
let collection = {}

// function transform (data) {
//   // const k = keys
//   // add `$slug` so `name` can be `id`
//   console.log('data[keys]', keys)
//   if (data && data[keys]) {
//     data[keys.slug] = buildKey(data[keys])
//   }
//   // if (data.name) {
//   //   data.$slug = buildKey(data.name)
//   // }
//   console.log(transformResponse, data)
//   return data
// }

// const transformResponse = [transform]

// function buildKey (name) {
//   let key = ''
//   if (name !== undefined) {
//     key = name
//     key = key.replace(/ /g, '-') // purge spaces
//     key = key.replace(/&/g, 'and') // clean ampersand
//     key = key.replace(/[^a-zA-Z0-9-]/g, '') // remove all non-alphas and non-number and non-dashes
//     key = key.toLowerCase()
//   }
//   return key
// }

// function storageAvailable (type) {
//   try {
//     const storage = window[type]
//     const x = '__storage_test__'

//     storage.setItem(x, x)
//     storage.removeItem(x)
//     return true
//   } catch (e) {
//     return false
//   }
// }

function setItemMap (arr, key) {
  let obj = {}
  arr.forEach(function (a) {
    obj[a[key]] = a
  })
  console.log(obj)
  return obj
}

function setItems (value) {
  collection = setItemMap(value, mapId)
  items = value
  if (storageAvailable(storageType)) {
    localStorage.setItem(storageId + ':list', JSON.stringify(value))
    // localStorage.setItem(storageId + ':collection', JSON.stringify(collection))
  }
  return items
}

function getItems (uniqueId) {
  if (storageAvailable(storageType) && localStorage[storageId + ':list']) {
    items = JSON.parse(localStorage[storageId + ':list'])
    // collection = JSON.parse(localStorage[storageId + ':collection'])
  }
  return items
}

// function clearItems (uniqueId) {
//   if (storageAvailable(storageType)) {
//     localStorage.removeItem(storageId + uniqueId + ':list')
//     localStorage.removeItem(storageId + uniqueId + ':collection')
//   }
// }

export const exchange = new Promise(function (resolve, reject) {
  let items = getItems()
  // console.log(''data'', items)
  console.log('items.length', items.length)
  if (items && items.length) {
    console.log('items from browser MEMORY', items)
    resolve({
      items,
      collection
    })
  } else {
    http
      .get('/Currency'
      .then((response) => {
        console.log('items fresh from API!', response.data)
        items = setItems(response.data)
        resolve({
          items,
          collection
        })
      })
  }
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
