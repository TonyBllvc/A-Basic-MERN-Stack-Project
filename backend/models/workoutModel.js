const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema and model
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true,
    },
    
    // for the user access
    user_id: {
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model('black', workoutSchema);