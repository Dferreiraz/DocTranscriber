const utf8Middleware = (req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
        req.setEncoding('utf8')
    }
    next()
}

module.exports = utf8Middleware