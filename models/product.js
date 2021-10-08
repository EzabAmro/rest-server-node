const {Schema, model} = require("mongoose");

const productSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            unique: true
        },
        state: {
            type: Boolean,
            default: true,
            required: true
        },
        user: {
            type: Schema.ObjectId,
            ref: "User",
            required: [true, "User reference is required"]
        },
        price: {
            type: Number,
            default: 0
        },
        category: {
            type: Schema.ObjectId,
            ref: "Category",
            required: [true, "Category reference is required"]
        },
        description:{
            type: String,
        },
        available: {
            type: Boolean,
            default: true
        }
    }
);


productSchema.methods.toJSON = function() {
    const {__v, state, ...product} = this.toObject();
    return product;
}



module.exports = model("Product", productSchema)