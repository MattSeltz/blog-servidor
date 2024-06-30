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
  },
  likes:[{ type: Schema.Types.ObjectId, ref: "User" }],
  publication:[{ type: Schema.Types.ObjectId, ref: "Publication" }],
},{timestamps:true})

export const Comment = model("Comment", commentSchema)