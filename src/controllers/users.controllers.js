import {User} from "../models/users.models.js"

export const getData = async (req,res) => {
  try {
    const user = await User.find()
    res.json(user)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const getOneData = async (req,res) => {
  const {id} = req.params

  try {
    const user = await User.findById(id).populate({
      path:"publications",
      populate:["likes","author"],
    }).populate({
      path:"commentLikes",
      populate:"publication"
    }).populate({
      path:"comments",
      populate:"publication"
    }).populate({
      path:"likes",
      populate:"author"
    })

    res.json(user)
  } catch (error) {
    res.sendStatus(400)
  }
}

export const putData = async (req,res) => {
  const {id} = req.params

  try {
    const user = await User.findByIdAndUpdate(id,req.body,{new:true})

    res.json(user)
  } catch (error) {
    res.status(400).send("Falla al actualizar usuario")
  }
}

export const deleteData = async (req,res) => {
  const {id} = req.params

  try {
    const user = await User.findByIdAndDelete(id)

    res.clearCookie("token")
    res.json(user)
  } catch (error) {
    res.status(400).send("Falla al eliminar usuario")
  }
}