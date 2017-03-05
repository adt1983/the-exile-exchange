// import { storageAvailable } from 'services/util'
// import { settings } from 'settings'

// const keys = settings.keys.selected
// // using slug instead of ID cause its a clean route
// // id is used for API route
// const mapId = keys.slug

// const storageType = 'localStorage'
// const storageId = 'selected'
// // const 'data' = 'global'

// let collection = {}

// function setItems (value) {
//   collection = setItemMap(items, mapId)
//   if (storageAvailable(storageType)) {
//     localStorage.setItem(storageId + ':list', JSON.stringify(items))
//     localStorage.setItem(storageId + ':collection', JSON.stringify(collection))
//   }
//   return items
// }

// function getItems () {
//   if (storageAvailable(storageType) && localStorage[storageId + ':list']) {
//     collection = JSON.parse(localStorage[storageId + ':collection'])
//   }
//   return items
// }

// // function clearItems (uniqueId) {
// //   if (storageAvailable(storageType)) {
// //     localStorage.removeItem(storageId + uniqueId + ':list')
// //     localStorage.removeItem(storageId + uniqueId + ':collection')
// //   }
// // }

// export const selected = function () {
//   return getItems();
// }
