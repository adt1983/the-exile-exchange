import { storageAvailable } from 'services/util'

const storageType = 'localStorage'
const storageId = 'selected'

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
// class Saved {
//   constructor() {
//     this.uniqueId = ''
//   }

//   get lyrics() {
//     return this._lyrics
//   }

//   set lyrics(str) {
//     this._lyrics = str
//   }
// }
export default {
  get: getSelected,
  set: setSelected,
  remove: removeSelected
}
