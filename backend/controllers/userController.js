//exports
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const ExamList = require('../models/examList');
const QuizPool = require('../models/quizPool');
const { ENCRYPTION_KEY } = require('../config/server');
const { paramsPerser } = require('../utils/parser');

const addExamToNewUser = (userId) => {
	ExamList.find()
		.exec()
		.then((e) => {
			e.forEach((element) => {
				User.updateOne({ _id: mongoose.Types.ObjectId(userId) }, { $push: { incompleteExam: [{ exam: mongoose.Types.ObjectId(element._id), title: element.title }] } })
					.exec()
					.then((data) => {
						console.log(data);
					})
					.catch((err) => {
						console.log(err);
					});
			});
		})
		.catch((err) => console.log(err));
};

/**
 *
 * @param {*} email
 * @param {*} examId
 * @param {*} examTitle
 */
const updateUserExamList = (email, examId, examTitle) => {
	User.updateOne({ email }, { $pull: { incompleteExam: { exam: mongoose.Types.ObjectId(examId) } } })
		.exec()
		.then((e) =>
			User.updateOne({ email }, { $push: { completedExam: [{ exam: mongoose.Types.ObjectId(examId), title: examTitle }] } })
				.exec()
				.then((data) => {
					console.log(data);
				})
				.catch((err) => {
					console.log(err);
				})
		)
		.catch((err) => console.log(err));
};

/**
 *
 * login user
 * required params => email, password
 * metohd POST
 *
 */
const login = (req, res) => {
	// check required params misiing or not
	if (!req.query.email || req.query.email.trim() == '' || !req.query.password || req.query.password.trim() == '') {
		return res.status(401).json({
			error: 'parameters missing',
		});
	}

	// find and verify user
	User.findOne({ email: req.query.email })
		.exec()
		.then((e) => {
			if (!e) {
				return res.status(401).json({
					massage: 'Invalid userId or password',
				});
			} else if (e.password == req.query.password) {
				const user = { id: req.query.email, password: e.password };
				const token = jwt.sign({ user }, ENCRYPTION_KEY);
				return res.status(200).json({
					massage: 'login successful',
					token,
				});
			} else {
				return res.status(401).json({
					massage: 'Invalid userId or password',
				});
			}
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
};

/**
 *
 * create new  user
 * required params => email, name, password, contactNo
 * metohd POST
 *
 */
const signUp = (req, res) => {
	// create user model
	const results = paramsPerser(req.query, true, ['name', 'email', 'password', 'rollNo', 'dept']);
	let user;

	// check required params misiing or not
	if (!results[0]) {
		user = new User(results[1]);
	} else {
		return res.status(401).json({
			error: 'parameters missing',
			requirdParams: results[1],
		});
	}

	// save user
	user.save()
		.then((data) => {
			console.log(data);
			addExamToNewUser(data._id);
			res.status(200).json({
				massage: 'Account created',
				id: data._id,
			});
		})
		.catch((err) => {
			res.status(401).json({ error: err });
		});
};

const getCompletedExamList = (req, res) => {
	jwt.verify(req.token, ENCRYPTION_KEY, (err, data) => {
		if (err) {
			res.status(401).json({ massage: 'invalid token' });
		} else {
			const email = data.user.id;
			console.log(email);
			//get quix list and send
			User.findOne({ email }, { completedExam: 1, _id: 0 })
				.exec()
				.then((e) => {
					console.log(e);
					return res.status(200).json({
						examIDs: e,
					});
				})
				.catch((err) => {
					return res.status(500).json(err);
				});
		}
	});
};

const getCompletedExamById = (req, res) => {
	//verify user
	jwt.verify(req.token, ENCRYPTION_KEY, (err, data) => {
		if (err) {
			res.status(401).json({ massage: 'invalid token' });
		} else {
			const email = data.user.id;

			//get quix list and send
			User.findOne({ email, 'completedExam.exam': mongoose.Types.ObjectId(req.query.id) })
				.exec()
				.then((user) => {
					if (!user) {
						res.status(401).json({ massage: 'You are not authorized to see this exam' });
					} else {
						ExamList.findOne({ _id: mongoose.Types.ObjectId(req.query.id) }, { quizes: 1, _id: 0 })
							.exec()
							.then((e) => {
								console.log(req.query.id);
								Promise.all(
									e.quizes.map((id) => {
										return QuizPool.findOne({ _id: mongoose.Types.ObjectId(id) }).exec();
									})
								).then((result) => {
									return res.status(200).json({
										quizs: result,
									});
								});
							})
							.catch((err) => {
								return res.status(500).json(err);
							});
					}
				});
		}
	});
};

const getIncompleteExamList = (req, res) => {
	//verify user
	jwt.verify(req.token, ENCRYPTION_KEY, (err, data) => {
		if (err) {
			res.status(401).json({ massage: 'invalid token' });
		} else {
			//get quix list and send
			const email = data.user.id;
			User.findOne({ email }, { incompleteExam: 1, _id: 0 })
				.exec()
				.then((e) => {
					return res.status(200).json({
						examIDs: e,
					});
				})
				.catch((err) => {
					return res.status(500).json(err);
				});
		}
	});
};

const getIncompleteExamById = (req, res) => {
	//verify user
	jwt.verify(req.token, ENCRYPTION_KEY, (err, data) => {
		if (err) {
			res.status(401).json({ massage: 'invalid token' });
		} else {
			const email = data.user.id;

			//get quix list and send
			User.findOne({ email, 'incompleteExam.exam': mongoose.Types.ObjectId(req.query.examId) })
				.exec()
				.then((user) => {
					if (!user) {
						res.status(401).json({ massage: 'Look like you already participate in the exam' });
					} else {
						//get quix list and send
						ExamList.findOne({ _id: mongoose.Types.ObjectId(req.query.examId) }, { quizes: 1, _id: 0 })
							.exec()
							.then((e) => {
								Promise.all(
									e.quizes.map((id) => {
										return QuizPool.findOne({ _id: mongoose.Types.ObjectId(id) }, { answer: 0 }).exec();
									})
								).then((result) => {
									return res.status(200).json({
										quizs: result,
									});
								});
							})
							.catch((err) => {
								return res.status(500).json(err);
							});
					}
				});
		}
	});
};

const getProfileDetails = (req, res) => {
	jwt.verify(req.token, ENCRYPTION_KEY, (err, data) => {
		if (err) {
			res.status(401).json({ massage: 'invalid token' });
		} else {
			const email = data.user.id;
			const password = data.user.password;
			User.findOne({ email, password }, { _id: 0, name: 1, rollNo: 1, dept: 1, email: 1, completedExam: 1, incompleteExam: 1, scores: 1 })
				.exec()
				.then((e) => {
					res.status(200).json(e);
				})
				.catch((err) => {
					res.status(400).json(err);
				});
		}
	});
};

const getScore = (req, res) => {
	jwt.verify(req.token, ENCRYPTION_KEY, (err, data) => {
		if (err) {
			res.status(401).json({ massage: 'invalid token' });
		} else {
			const email = data.user.id;
			User.findOne({ email, 'scores.exam': mongoose.Types.ObjectId(req.query.examId) }, { _id: 0, scores: 1 })
				.exec()
				.then((e) => {
					res.status(200).json(e);
				})
				.catch((err) => {
					res.status(400).json(err);
				});
		}
	});
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @req examId
 * @req answerSheet
 *
 */
const checkAnswer = (req, res) => {
	jwt.verify(req.token, ENCRYPTION_KEY, (err, data) => {
		if (err) {
			res.status(401).json({ massage: 'invalid token' });
		} else {
			const email = data.user.id;
			ExamList.findOne({ _id: mongoose.Types.ObjectId(req.query.examId) }, { quizes: 1, title: 1, _id: 0 })
				.exec()
				.then((e) => {
					totalQuestions = e.quizes.length;
					Promise.all(
						e.quizes.map((id) => {
							return QuizPool.findOne({ _id: mongoose.Types.ObjectId(id) }, { answer: 1 }).exec();
						})
					)
						.then((result) => {
							try {
								const arr = JSON.parse(req.query.answerSheet);
								let totalScore = 0;
								for (let i = 0; i < arr.length; i++) {
									let element = arr[i];
									for (let index = 0; index < result.length; index++) {
										if (result[index]._id == element._id && result[index].answer == element.answer) {
											totalScore++;
											break;
										}
									}
								}
								// console.log('score=>', totalScore, ' full=>', totalQuestions);
								const score = { exam: mongoose.Types.ObjectId(req.query.examId), score: totalScore, fullMask: totalQuestions, title: e.title };
								updateUserExamList(email, req.query.examId, e.title);
								return User.updateOne({ email }, { $push: { scores: score } }).exec();
							} catch (error) {
								return res.status(400).json({ massage: 'something went wrong', error });
							}
						})
						.then((e) => {
							return res.status(200).json(e);
						})
						.catch((err) => res.status(401).json({ err }));
				})
				.catch((err) => {
					console.log('err=>', err);
					return res.status(400).json(err);
				});
		}
	});
};

module.exports = {
	login,
	signUp,
	getProfileDetails,
	getCompletedExamList,
	getCompletedExamById,
	getIncompleteExamList,
	getIncompleteExamById,
	getScore,
	checkAnswer,
};
