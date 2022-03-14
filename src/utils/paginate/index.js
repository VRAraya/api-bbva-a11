function paginate(req, data, currentPage, limit) {

    currentPage = currentPage ? parseInt(req.query.page) : 1
    limit = limit ? parseInt(req.query.limit) : 10

    const maxLimit = 50
    limit = (limit > maxLimit) ? maxLimit : limit
    
    const dataLength = data.length
    const lastPage = Math.ceil(dataLength/limit)
    
    currentPage = (currentPage <= 0) ? 1 : currentPage
    currentPage = (currentPage > lastPage) ? lastPage : currentPage
    
    const startIndex = (currentPage - 1) * limit
    const endIndex = currentPage * limit
    const from = startIndex + 1
    const to = (endIndex > data.length) ? data.length : endIndex
    const nextPage = (currentPage >= lastPage) ? null : currentPage + 1
    const prevPage = (currentPage <= 1) ? null : currentPage - 1
    
    const pathUrl = `${req.protocol}` + '://' + `${req.headers.host}` + `${req.baseUrl}` + `${req._parsedUrl.pathname}`
    const firstPageUrl = pathUrl + `?page=1`
    const lastPageUrl = pathUrl + `?page=${lastPage}`
    const nextPageUrl = (nextPage) ? pathUrl + `?page=${nextPage}` : null
    const prevPageUrl = (prevPage) ? pathUrl + `?page=${nextPage}` : null 
    
    data = data.slice(startIndex, endIndex)

    const result = {
      "current_page": currentPage,
      "data": data,
      "first_page_url": firstPageUrl,
      "from": from,
      "last_page": lastPage,
      "last_page_url": lastPageUrl,
      "next_page_url": nextPageUrl,
      "path": pathUrl,
      "per_page": limit,
      "prev_page_url": prevPageUrl,
      "to": to,
      "total": dataLength
    }

    return result
}

module.exports = {paginate}