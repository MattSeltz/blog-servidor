import {Schema,model} from "mongoose"

const publicationSchema = new Schema({
  author:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  likes:[{ type: Schema.Types.ObjectId, ref: "User" }],
  comments:[{ type: Schema.Types.ObjectId, ref: "Comment" }]
},{timestamps:true})

export const Publication = model("Publication", publicationSchema)