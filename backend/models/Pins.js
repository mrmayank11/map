import mongoose from 'mongoose';

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    long: {
        type: Number,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },

},
    { timestamps: true }

);

export default mongoose.model("Pin", PinSchema);