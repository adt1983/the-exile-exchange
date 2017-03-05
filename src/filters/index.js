export function lowest (items, key) {
  return items.sort(function (a, b) {
    return a[key] - b[key]
  })
}

export function highest (items, key) {
  return items.sort(function (a, b) {
    return b[key] - a[key]
  })
}

export function current (items, key, age) {
  const date = ((new Date()) - age)
  items.filter(function (a) {
    return a[key] > date
  })
  // console.log('after', items.length)
  return items
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
