import {Schema,model} from "mongoose"

const likeSchema = new Schema({
  author:{
    type:String,
    required:true
  },
},{timestamps:true})

export const Like = model("Like", likeSchema)