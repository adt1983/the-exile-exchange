// // this is aliased in webpack config based on server/client build
// import api from 'create-api'
export function storageAvailable (type) {
  try {
    const storage = window[type]
    const x = '__storage_test__'

    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}

export function setItemMap (arr, key) {
  let obj = {}
  arr.forEach(function (a) {
    obj[a[key]] = a
  })
  console.log('setItemMap', obj)
  return obj
}

export function buildSlug (name) {
  let key = ''
  if (name !== undefined) {
    key = name
    key = key.replace(/ /g, '-') // purge spaces
    key = key.replace(/&/g, 'and') // clean ampersand
    key = key.replace(/[^a-zA-Z0-9-]/g, '') // remove all non-alphas and non-number and non-dashes
    key = key.toLowerCase()
  }
  return key
}

export function buildKey (name) {
  let key = ''
  if (name !== undefined) {
    key = name
    key = key.replace(/ /g, '') // purge spaces
  }
  return key
}

export function selectText () {};
// // warm the front page cache every 15 min
// // make sure to do this only once across all requests
// if (api.onServer && !api.warmCacheStarted) {
//   api.warmCacheStarted = true
//   warmCache()
// }

// function warmCache () {
//   fetchItems((api.cachedIds.top || []).slice(0, 30))
//   setTimeout(warmCache, 1000 * 60 * 15)
// }

// function fetch (child) {
//   const cache = api.cachedItems
//   if (cache && cache.has(child)) {
//     return Promise.resolve(cache.get(child))
//   } else {
//     return new Promise((resolve, reject) => {
//       api.child(child).once('value', snapshot => {
//         const val = snapshot.val()
//         // mark the timestamp when this item is cached
//         if (val) val.__lastUpdated = Date.now()
//         cache && cache.set(child, val)
//         resolve(val)
//       }, reject)
//     })
//   }
// }

// export function fetchIdsByType (type) {
//   return api.cachedIds && api.cachedIds[type]
//     ? Promise.resolve(api.cachedIds[type])
//     : fetch(`${type}stories`)
// }

// export function fetchItem (id) {
//   return fetch(`item/${id}`)
// }

// export function fetchItems (ids) {
//   return Promise.all(ids.map(id => fetchItem(id)))
// }

// export function fetchUser (id) {
//   return fetch(`user/${id}`)
// }

// export function watchList (type, cb) {
//   let first = true
//   const ref = api.child(`${type}stories`)
//   const handler = snapshot => {
//     if (first) {
//       first = false
//     } else {
//       cb(snapshot.val())
//     }
//   }
//   ref.on('value', handler)
//   return () => {
//     ref.off('value', handler)
//   }
// }
