const asyncWrapper = (fn)=>{
    return async (req,res,next)=>{
        try {
            await fn(req,res,next)
        } catch (error) {
            next(error)  // pointing to the error middleware
        }
    }
}

module.exports = asyncWrapper
