const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
	question: { type: String, required: true, maxlength: 200 },
	answer: { type: String, required: true },
	options: { type: [], required: true },
});

module.exports = mongoose.model('QuizPool', quizSchema);
