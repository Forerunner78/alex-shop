import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
	},
	{ timestamps: true }
);

const productSchema = mongoose.Schema(
	{
		id: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		image: { type: String, required: true },
		longDescription: { type: String, required: true },
		shortDescription: { type: String, required: true },
		category: { type: Array, required: true },
		price: { type: Number, required: true, default: 0 },
		countInStock: { type: Number, required: true, default: 0 },
		rating: { type: Number, required: true, default: 0 },
		numReviews: { type: Number, required: true, default: 0 },
		reviews: [reviewSchema],
	},
	{ timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
