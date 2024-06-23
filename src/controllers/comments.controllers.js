import {Comment} from "../models/comments.models.js" 

export const getData = async (req,res) => {
  try {
    const comment = await Comment.find()

    res.json(comment)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const getOneData = async (req,res) => {
  const {id} = req.params

  try {
    const comment = await Comment.findById(id)

    res.json(comment)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const postData = async (req,res) => {
  try {
    const comment = new Comment(req.body)
    await comment.save()
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const putData = async (req,res) => {
  const {id} = req.params

  try {
    await Comment.findByIdAndUpdate(id,req.body)    
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const deleteData = async (req,res) => {
  const {id} = req.params

  try {
    await Comment.findByIdAndDelete(id)
    res.sendStatus(200)  
  } catch (error) {
    res.sendStatus(400)
  }
}