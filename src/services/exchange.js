import { http } from 'services'
import { storageAvailable, setItemMap } from 'services/util'
import settings from 'settings'

const keys = settings.keys.exchange
const mapId = keys.id

const storageType = 'localStorage'
const storageId = 'breachCurrency'
let items = []

export const exchange = new Promise(function (resolve, reject) {
    http
      .get('/CurrencyOrder'
      .then((response) => {
        console.log('items fresh from API!', response.data)
        items = response.data
        // items.push({
        //   "accountName": "Travis", 
        //   "ask_id": items[0].ask_id, 
        //   "ask_qty": 1, 
        //   "bid_id": items[0].bid_id, 
        //   "bid_qty": 1, 
        //   "lastChar": "Cheeseman", 
        //   "lastSeenUTC": +(new Date()), 
        //   "league": items[0].league
        // })
        resolve({
          items
        })
      })
  // }
})