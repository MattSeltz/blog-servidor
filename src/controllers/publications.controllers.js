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
    const publication = await Publication.findById(id).populate("likes").populate("author").populate({path:"comments",populate:["author","likes"]})

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
    res.status(400).send("Falla al crear propiedad")
  }
}

export const putData = async (req,res) => {
  const {id} = req.params

  try {
    const publication = await Publication.findByIdAndUpdate(id,req.body,{new:true}).populate({
      path:"comments",
      populate:"author"
    })    
    res.json(publication)
  } catch (error) {
    res.status(400).send("Falla al actualizar propiedad")
  }
}

export const deleteData = async (req,res) => {
  const {id} = req.params

  try {
    const publication = await Publication.findByIdAndDelete(id)
    res.json(publication)  
  } catch (error) {
    res.status(400).send("Falla al eliminar propiedad")
  }
}