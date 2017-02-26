export const settings = {
  refreshRate: 1000 * 60 * 15, // 15 min
  paramDiv: ':',
  keys: {
    currency: {
      id: 'id', // since values are unique they will be our ID
      name: 'name',
      value: 'id',
      imgUrl: 'icon',
      // prefixing with $ cause is local only
      slug: '$slug'
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
      ratio: '$ratio',
      // to be prefixed by `ratio`
      pair: '__pair',
      key: '__key'
    }
  }
}
