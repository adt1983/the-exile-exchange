import { http } from 'services'
import { storageAvailable, setItemMap, buildSlug, buildKey } from 'services/util'
import settings from 'settings'

const keys = settings.keys.league
// using slug instead of ID cause its a clean route
// id is used for API route
const mapId = keys.slug

const storageType = 'localStorage'
const storageId = 'league'
// const 'data' = 'global'

let items = []
let collection = {}

function transform (data) {
  data.forEach(function (a) {
    if (a && a[keys.name]) {
      a[keys.slug] = buildSlug(a[keys.name])
      a[keys.id] = buildKey(a[keys.name])
    }
  })
  return data
}

const transformResponse = [transform]

function setItems (value) {
  items = transform(value)
  collection = setItemMap(items, mapId)
  if (storageAvailable(storageType)) {
    localStorage.setItem(storageId + ':list', JSON.stringify(items))
    localStorage.setItem(storageId + ':collection', JSON.stringify(collection))
  }
  return items
}

function getItems (uniqueId) {
  if (storageAvailable(storageType) && localStorage[storageId + ':list']) {
    items = JSON.parse(localStorage[storageId + ':list'])
    collection = JSON.parse(localStorage[storageId + ':collection'])
  }
  return items
}

// function clearItems (uniqueId) {
//   if (storageAvailable(storageType)) {
//     localStorage.removeItem(storageId + uniqueId + ':list')
//     localStorage.removeItem(storageId + uniqueId + ':collection')
//   }
// }

export const league = new Promise(function (resolve, reject) {
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
      .get('/League',
      {
        transformResponse
      })
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
