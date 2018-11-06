export {arrayify, unwrap, urlsAreEqual}

function arrayify(thing) {
  return Array.isArray(thing) ? thing : [thing]
}

function unwrap(thing) {
  if (thing.length > 1) {
    return thing
  }
  return thing[0]
}

function urlsAreEqual(url1, url2) {
  const isUrl1Array = Array.isArray(url1)
  const isUrl2Array = Array.isArray(url2)
  return (
    isUrl1Array === isUrl2Array &&
    ((!isUrl1Array && url1 === url2) ||
      (isUrl1Array && url1.every((u1, i) => u1 === url2[i])))
  )
}
