const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserShema = new Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true, maxlength: 20 },
	password: { type: String, required: true, maxlength: 20 },
	rollNo: { type: Number },
	dept: { type: String },
	completedExam: { type: [Schema.Types.ObjectId] },
	userType: { type: String, default: 'Student' },
	incompleteExam: { type: [Schema.Types.ObjectId] },
});

module.exports = mongoose.model('User', UserShema);
