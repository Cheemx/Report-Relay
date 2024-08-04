const asyncHandler = (requestHandler) => {
    (err, req, res, next) => {
        Promise
        .resolve(requestHandler(err, req, res, next))
        .reject((err) => next(err))
    }
}

export {asyncHandler}