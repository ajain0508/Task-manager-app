const notFound = (req,res)=>{
    res.status(404).send("Route does not exist")
}

module.exports=notFound;
// this is for any random route which does not exist
// EX : {{url}}/tasks/64c0b6eb133e114a84224bab/oishgeri