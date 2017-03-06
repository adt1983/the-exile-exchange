import { storageAvailable } from 'services/util'

const storageType = 'localStorage'
const storageId = 'selected'

// let collection = {}

export function setSelected (uniqueId, value) {
  if (storageAvailable(storageType)) {
    localStorage.setItem(storageId + ':' + uniqueId + ':json', JSON.stringify(value))
  }
}

export function getSelected (uniqueId) {
  let value = false
  if (storageAvailable(storageType) && localStorage[storageId + ':' + uniqueId + ':json']) {
    value = JSON.parse(localStorage[storageId + ':' + uniqueId + ':json'])
  }
  return value
}

// // function clearItems (uniqueId) {
// //   if (storageAvailable(storageType)) {
// //     localStorage.removeItem(storageId + uniqueId + ':list')
// //     localStorage.removeItem(storageId + uniqueId + ':collection')
// //   }
// // }
