const {Schema, model} = require("mongoose");


const categorySchema = Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            unique: true
        },
        state: {
            type: Boolean,
            default: true,
            required: [true, "state is required"]
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "user is required"]
        }
    }
);

categorySchema.methods.toJSON = function() {
    const {__v, state, ...category} = this.toObject();
    return category;
}


module.exports = model("Category", categorySchema);
