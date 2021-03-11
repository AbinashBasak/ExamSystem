const User = require('../models/quizPool');
const Users = require('../models/user');
const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/server');
const ExamList = require('../models/examList');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log('bd connect')).on('error', (err) => console.log(err));

const save = (obj) => {
	const user = new Users(obj);
	user.save()
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};
const update = () => {
	Users.updateOne({ email: 'subho@email.com' }, { $set: { completedExam: [{ exam: mongoose.Types.ObjectId('60472cd030ce7a10666c1a6c'), title: 'OS' }] } })
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
};

ExamList.find()
	.exec()
	.then((e) => console.log(e));
// save({
// 	question: 'Which module gives control of the CPU to the process selected by the short-term scheduler?',
// 	answer: 'a',
// 	options: [{ a: ' dispatcher', b: 'interrupt', c: 'scheduler', d: 'none of the mentioned' }],
// });
// save({
// 	question: 'The processes that are residing in main memory and are ready and waiting to execute are kept on a list called: ',
// 	answer: 'b',
// 	options: [{ a: '  job queue', b: 'ready queue', c: 'execution queue', d: ' process queue' }],
// });
// save({
// 	question: 'Which scheduling algorithm allocates the CPU first to the process that requests the CPU first?',
// 	answer: 'a',
// 	options: [{ a: ' first-come, first-served scheduling', b: 'shortest job scheduling', c: ' priority scheduling', d: 'none of the mentioned' }],
// });
// save({
// 	question: 'In priority scheduling algorithm',
// 	answer: 'a',
// 	options: [
// 		{
// 			a: ' CPU is allocated to the process with highest priority',
// 			b: 'CPU is allocated to the process with lowest priority',
// 			c: 'Equal priority processes can not be scheduled',
// 			d: 'none of the mentioned',
// 		},
// 	],
// });
// save({
// 	question: ' In priority scheduling algorithm, when a process arrives at the ready queue, its priority is compared with the priority of',
// 	answer: 'b',
// 	options: [{ a: ' all process', b: 'currently running process', c: 'parent process', d: 'init process' }],
// });
// save({
// 	question: ' Which algorithm is defined in Time quantum?',
// 	answer: 'b',
// 	options: [{ a: ' shortest job scheduling algorithm', b: 'round robin scheduling algorithm', c: 'priority scheduling algorithm', d: 'multilevel queue scheduling algorithm' }],
// });
// save({
// 	title: 'Operating System',
// 	quizes: [
// 		mongoose.Types.ObjectId('60472b04c762741030727708'),
// 		mongoose.Types.ObjectId('60472b04c762741030727707'),
// 		mongoose.Types.ObjectId('60472b04c762741030727706'),
// 		mongoose.Types.ObjectId('60472b04c762741030727705'),
// 		mongoose.Types.ObjectId('60472b04c762741030727704'),
// 		mongoose.Types.ObjectId('60472b04c762741030727703'),
// 	],
// });
