const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
	title: { type: String, required: true, maxlength: 50 },
	date: { type: Date, default: Date.now },
	quizes: [Schema.Types.ObjectId],
});

module.exports = mongoose.model('examlists', examSchema);
