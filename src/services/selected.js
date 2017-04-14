import { storageAvailable } from 'services/util'

const storageType = 'localStorage'
const storageId = 'poe-selected'

function setSelected (uniqueId, value) {
  let data = value
  if (storageAvailable(storageType)) {
    if (typeof (value) !== 'string') {
      data = JSON.stringify(value)
    }
    localStorage.setItem(storageId + ':' + uniqueId + ':json', data)
  }
}
function getSelected (uniqueId) {
  const name = storageId + ':' + uniqueId + ':json'
  let value = false
  if (localStorage[name]) {
    const data = localStorage[name]
    if (data.match(/\{.*\}/g) || data.match(/\[.*\]/g)) {
      value = JSON.parse(data)
    } else {
      value = data
    }
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
