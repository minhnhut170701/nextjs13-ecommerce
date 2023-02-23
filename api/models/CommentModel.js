import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    userImg: {
      type: String,
    },
    rate: {
      type: Number,
    },
    commentText: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
