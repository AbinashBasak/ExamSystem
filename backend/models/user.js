const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserShema = new Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true, maxlength: 20 },
	password: { type: String, required: true, maxlength: 20 },
	rollNo: { type: Number },
	dept: { type: String },
	completedExam: { type: [{ examId: Schema.Types.ObjectId, title: String }] },
	userType: { type: String, default: 'Student' },
	incompleteExam: { type: [{ examId: Schema.Types.ObjectId, title: String }] },
});

module.exports = mongoose.model('User', UserShema);
