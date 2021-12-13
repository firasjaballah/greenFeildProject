const mongoose = require("mongoose");

const renterPostSchema = mongoose.Schema(
    {
        content: {
            type: String,
            default: "Not Specified",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        comments: [],
        state: {
            type: String,
        },
        city: {
            type: String,
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
        },
        updatedAt: {
            type: Date,
            default: () => Date.now(),
        },
    },
    { versionKey: false } // to not save the __v attribute ... // Source: https://mongoosejs.com/docs/guide.html#versionKey
);

module.exports = mongoose.model("RenterPost", renterPostSchema);
