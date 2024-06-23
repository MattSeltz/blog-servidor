import {Like} from "../models/likes.models.js" 

export const getData = async (req,res) => {
  try {
    const like = await Like.find()

    res.json(like)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const getOneData = async (req,res) => {
  const {id} = req.params

  try {
    const like = await Like.findById(id)

    res.json(like)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const postData = async (req,res) => {
  try {
    const like = new Like(req.body)
    await like.save()
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const putData = async (req,res) => {
  const {id} = req.params

  try {
    await Like.findByIdAndUpdate(id,req.body)    
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const deleteData = async (req,res) => {
  const {id} = req.params

  try {
    await Like.findByIdAndDelete(id)
    res.sendStatus(200)  
  } catch (error) {
    res.sendStatus(400)
  }
}