const mongoose = require('mongoose');

const { Schema } = mongoose;


const MessageSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  sender_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
	recipient_id: [
		{
			type: Schema.Types.ObjectId,
			ref: "User"
		}
	],
	read :{
		type: Boolean,
		require: true,
		default: false
	},
	// room value is generated depending on which two users are chatting and will look like 1x5 if user ID 1 messages user ID 5, with the lower value always appearing to the left of the x
	room: {
		type: String,
		required: true
	}
},
{
	toJson: {
		virtuals: true
	}
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;