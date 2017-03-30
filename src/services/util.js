// // this is aliased in webpack config based on server/client build
import settings from 'settings'
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
// manage parameters by ID pairs
export function cleanPairs (dirty, keyChar) {
  let clean
  if (dirty.indexOf(keyChar) >= 0) {
    clean = dirty.split(keyChar)
  } else {
    clean = dirty
  }
  return clean
}

export function parseParams (ids) {
  let params = cleanPairs(ids, settings.paramSubDiv)
  let item
  let items = []
  if (params && params.forEach) {
    params.forEach(function (a) {
      let temp = {}
      item = cleanPairs(a, settings.paramDiv)
      temp.asks = item[0]
      temp.bids = item[1]
      items.push(temp)
    })
  } else {
    params = cleanPairs(params, settings.paramDiv)
    items.push({
      asks: params[0],
      bids: params[1]
    })
  }
  return items
}

export function createParams (ids, currencyMap) {
  let all = []
  ids.forEach(function (id) {
    let p = []
    let iid = id.id || id
    // ask: iid
    // bid: currencyMap[iid].$preset
    p.push(iid)
    p.push(currencyMap[iid].$preset)
    p = p.join(settings.paramDiv)
    all.push(p)
  })
  return all.join(settings.paramSubDiv)
}
