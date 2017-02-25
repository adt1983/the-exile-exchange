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
      user: 'name',
      ask: 'ask_qty',
      bid: 'bid_qty',
      lastSeenTime: 'lastSeenUTC',
      // prefixing with $ cause is local only
      ratio: '$ratio'
    }
  }
}
