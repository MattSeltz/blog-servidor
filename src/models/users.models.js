import { Schema,model } from "mongoose";

const userSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  icon:{
    type:String,
    required:true
  },
  publications:[{ type: Schema.Types.ObjectId, ref: "Publication" }],
  comments:[{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes:[{ type: Schema.Types.ObjectId, ref: "Publication" }],
  commentLikes:[{ type: Schema.Types.ObjectId, ref: "Comment" }],
},{timestamps:true})

export const User = model("User",userSchema)