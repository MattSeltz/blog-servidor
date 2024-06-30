import {Publication} from "../models/publications.models.js" 

export const getData = async (req,res) => {
  try {
    const publication = await Publication.find().populate("comments").populate("likes").populate("author")

    res.json(publication)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const getOneData = async (req,res) => {
  const {id} = req.params

  try {
    const publication = await Publication.findById(id).populate("likes").populate("author").populate({path:"comments",populate:"author"})

    res.json(publication)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const postData = async (req,res) => {
  try {
    const publication = new Publication(req.body)
    await publication.save()
    res.json(publication)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const putData = async (req,res) => {
  const {id} = req.params

  try {
    await Publication.findByIdAndUpdate(id,req.body)    
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const deleteData = async (req,res) => {
  const {id} = req.params

  try {
    await Publication.findByIdAndDelete(id)
    res.sendStatus(200)  
  } catch (error) {
    res.sendStatus(400)
  }
}