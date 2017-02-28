// app settings
export const settings = {
  refreshRate: 1000 * 60 * 15, // 15 min
  paramDiv: ':',
  paramSubDiv: '~',
  keys: {
    currency: {
      id: 'id', // since values are unique they will be our ID
      name: 'name',
      value: 'id',
      imgUrl: 'icon',
      // prefixing with $ cause is local only
      slug: '$slug',
      preset: '$preset'
    },
    // bids: asks and offers
    exchange: {
      id: 'lastChar', // since values are unique they will be our ID
      user: 'accountName',
      name: 'lastChar',
      ask: 'ask_qty',
      bid: 'bid_qty',
      askId: 'ask_id',
      bidId: 'bid_id',
      lastSeenTime: 'lastSeenUTC',
      time: 'lastSeenUTC',
      // prefixing with $ cause is local only
      ratio: '$ratio'
      // to be prefixed by `ratio`
      // pair: '__pair',
      // key: '__key'
    },
    league: {
      name: 'name',
      slug: '$slug',
      id: '$id'
    }
  },
  presets: {
    currencyIndexes: [
      1, 2, 3, 4, 7, 8, 9, 10, 11, 13, 16, 26
    ],
    currencySearch: {
      // '6': '4',
      '24': '6',
      '25': '6',
      '4': '6',
      'default': '4'
    },
    getSearch: function (id) {
      let preset = settings.presets.currencySearch['default']
      if (settings.presets.currencySearch[ id ]) {
        preset = settings.presets.currencySearch[ id ]
      }
      return preset
    }
  }
}
