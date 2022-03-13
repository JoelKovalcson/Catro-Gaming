const mongoose = require('mongoose');

const { Schema } = mongoose;

const ActiveGameSchema = new Schema({
    gameName: {
        type: String,
        required: true,
    },
    turn: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isComplete: {
        type: Boolean,
        default: false
    },
    scores: [
        {
            type: Number,
            default: 0
        }
    ],
    gameState: {
        type: String
    }
})

const ActiveGame = mongoose.model('ActiveGame', ActiveGameSchema);

module.exports = ActiveGame;