import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName:{
    type:String,
    require: [true, 'Nhập tên bạn ui']
  },
  email:{
    type: String,
    require: [true, 'Nhập email bạn ui']
  },
  password:{
    type: String,
    require: [true, 'Nhập pasword bạn ui']
  },
  cart:{
    type: Array,
  },
  favoriteList:{
    type: Array,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
},{
  timestamps: true
})

export default mongoose.model("User", UserSchema)