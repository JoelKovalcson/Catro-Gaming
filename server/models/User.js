const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const gameDictionary = require('../config/gameModels');

function generateGameSchemas() {
	// Storage for each game schema
	let gameSchemas = {};
	// For each game in the dictionary
	for(let game in gameDictionary) {
		// Make a new schema
		let newSchema = new Schema({
			// Give it all the stat trackers for that game
			...gameDictionary[game]
		});
		gameSchemas[game] = {
			type: newSchema,
			default: () => ({})
		};
	}
	return gameSchemas;
}

const ScoreSchema = new Schema({
	// Holds total number of all games played
	totalGames: {
		type: Number,
		required: true,
		default: 0
	},
	// Setup fields for each game with their associated schema
	...generateGameSchemas()
});

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5 // for now 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
        
    ],
    activeGames: [
        {
            type: Schema.Types.ObjectId,
        	  ref: 'ActiveGame'
        }
    ],
		scores: {
			type: ScoreSchema,
			default: () => ({})
		}
},
{
    toJSON: {
        virtuals: true
    }
})

// set up pre-save middleware to hash password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

// compare incoming pass with hashed
userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;