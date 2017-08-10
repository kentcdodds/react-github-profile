export {arrayify, getData, getError, urlsAreEqual}

function arrayify(thing) {
  return Array.isArray(thing) ? thing : [thing]
}

function getData(responses) {
  if (responses.length > 1) {
    return responses.map(r => r.data)
  }
  return responses[0].data
}

function getError({response, config}) {
  const {url, method} = config
  const {data} = response
  return {url, method, data}
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
