const User = require('../models/quiz');
const Users = require('../models/user');
const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/server');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log('bd connect')).on('error', (err) => console.log(err));

const save = (obj) => {
	const user = new User(obj);
	user.save()
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};
const update = () => {
	Users.updateOne({ email: 'abinashbasak129@gmail.com' }, { $set: { completedExam: [{ id: mongoose.Types.ObjectId('6046df79808ebe4b501b9b91'), title: 'JavaScript' }] } })
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};
const get = () => {
	Users.find()
		.then((data) => {
			console.log(data);
			Users.find()
				.exec()
				.then((e) => console.log(e));
		})
		.catch((err) => {
			console.log(err);
		});
};
save({
	title: 'JS',
	quizes: [
		mongoose.Types.ObjectId('604685a28051ad1ce41963ab'),
		mongoose.Types.ObjectId('604685a28051ad1ce41963a8'),
		mongoose.Types.ObjectId('604685a28051ad1ce41963a9'),
		mongoose.Types.ObjectId('604685a28051ad1ce41963aa'),
	],
});
update();
get();
