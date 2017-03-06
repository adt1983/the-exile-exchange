import { storageAvailable } from 'services/util'

const storageType = 'localStorage'
const storageId = 'selected'

// let collection = {}

function setSelected (uniqueId, value) {
  if (storageAvailable(storageType)) {
    localStorage.setItem(storageId + ':' + uniqueId + ':json', JSON.stringify(value))
  }
}

function getSelected (uniqueId) {
  let value = false
  if (storageAvailable(storageType) && localStorage[storageId + ':' + uniqueId + ':json']) {
    value = JSON.parse(localStorage[storageId + ':' + uniqueId + ':json'])
  }
  return value
}

function removeSelected (uniqueId) {
  if (storageAvailable(storageType)) {
    localStorage.removeItem(storageId + ':' + uniqueId + ':json')
  }
}

export default {
  get: getSelected,
  set: setSelected,
  remove: removeSelected
}
