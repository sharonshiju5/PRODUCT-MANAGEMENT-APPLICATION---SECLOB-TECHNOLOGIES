import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Better than using raw Object
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt
  }
);

// Export the model only once if already declared
export default mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);
