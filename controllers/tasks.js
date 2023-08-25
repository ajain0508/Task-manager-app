const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')


const getAllTasks = asyncWrapper( async(req,res)=>{
        const tasks = await Task.find({})
        res.status(200).json({tasks});
        res.status(200).json({tasks,amount:tasks.length});
})

const createTask =asyncWrapper ( async (req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json({task});
    })
    

const getTask =asyncWrapper(async (req,res,next)=>{

    
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            // return is necessary here
            // it is written if there are same no of characters and all characters are not same
            // const error = new Error(`not Found`)
            // error.status = 404;
            // return next(error)
            return next(createCustomError(`NO task with id ${taskID}`,404))
            // return res.status(404).json({msg:`NO task with id ${taskID}`})
        }
        res.status(200).json({task});
})


const updateTask = asyncWrapper(async(req,res,next)=>{
   
        const{id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true, //returns always new value
            runValidators:true
            
        })
        if(!task){
            return next(createCustomError(`NO task with id ${taskID}`,404))
            // return res.status(404).json({msg:`NO task with id ${taskID}`})
        }
        res.status(200).json({task})
    
})


const deleteTask =asyncWrapper(async (req,res,next)=>{
    const{id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
        return next(createCustomError(`NO task with id ${taskID}`,404))
        // res.status(404).json({msg:`No task with id ${taskID}`})
    }
    res.status(200).json(task)
    // res.status(200).send()
    // res.status(200).json({task:null,status:'success'})
})
module.exports = {getAllTasks,createTask,updateTask,getTask,deleteTask};