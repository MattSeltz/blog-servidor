import {Comment} from "../models/comments.models.js" 

export const getData = async (req,res) => {
  try {
    const comment = await Comment.find().populate(["author","likes"])

    res.json(comment)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const getOneData = async (req,res) => {
  const {id} = req.params

  try {
    const comment = await Comment.findById(id).populate(["author","likes"])

    res.json(comment)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const postData = async (req,res) => {
  try {
    const comment = new Comment(req.body)
    await comment.save()
    await comment.populate(["author","likes"])
    res.json(comment)
  } catch (error) {
    res.status(400).send("Falla al crear comentario")
  }
}

export const putData = async (req,res) => {
  const {id} = req.params

  try {
    const comment = await Comment.findByIdAndUpdate(id,req.body)    
    res.json(comment)
  } catch (error) {
    res.status(400).send("Falla al actualizar comentario")
  }
}

export const deleteData = async (req,res) => {
  const {id} = req.params

  try {
    const comment = await Comment.findByIdAndDelete(id)
    res.json(comment)  
  } catch (error) {
    res.status(400).send("Falla al eliminar comentario")
  }
}