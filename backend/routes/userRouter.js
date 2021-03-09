// exports
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const ensureToken = (req, res, next) => {
	const header = req.headers['authorization'];
	if (typeof header !== 'undefined') {
		req.token = header;
		next();
	} else {
		res.sendStatus(403);
	}
};

router.post('/login', userController.login);
router.post('/sign-up', userController.signUp);
router.get('/completed/exams', ensureToken, userController.getCompletedExamList);
router.get('/completed/exam', ensureToken, userController.getCompletedExamById);
router.get('/incomplete/exams', ensureToken, ensureToken, userController.getIncompleteExamList);
router.get('/incomplete/exam', ensureToken, userController.getIncompleteExamById);

module.exports = router;
