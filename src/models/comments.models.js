import {Schema,model} from "mongoose"

const commentSchema = new Schema({
  author:[{ type: Schema.Types.ObjectId, ref: "User" }],
  content:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true
  }
},{timestamps:true})

export const Comment = model("Comment", commentSchema)