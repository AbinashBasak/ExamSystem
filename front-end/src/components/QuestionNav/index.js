import React from 'react';
import { Button } from 'react-bootstrap';
import './style.css';

const QuestionNav = (props) => {
	const navigate_to = (index) => {
		if (props.seenStatus[index] !== 2) {
			props.setSeenStatus(
				props.seenStatus
					.slice(0, index)
					.concat([1])
					.concat(props.seenStatus.slice(index + 1))
			);
		}
		props.setCurrentQuestion(index);
		console.log('Seen : ' + props.seenStatus);
		console.log('Answers : ' + props.answers);
	};

	const cards = props.all_question.map((data, index) => {
		if (props.seenStatus[index] === 0) {
			return (
				<Button onClick={() => navigate_to(index)} className='question-card bg-light text-dark'>
					{index + 1}
				</Button>
			);
		} else if (props.seenStatus[index] === 1) {
			return (
				<Button onClick={() => navigate_to(index)} className='question-card bg-warning text-dark'>
					{index + 1}
				</Button>
			);
		} else {
			return (
				<Button onClick={() => navigate_to(index)} className='question-card bg-success text-dark'>
					{index + 1}
				</Button>
			);
		}
	});

	return (
		<div style={{ height: '100vh' }}>
			<div className='question-nav'>{cards}</div>
			<div>
				<ul>
					<li>
						<div className='bg-success' style={{ width: 24, height: 24 }}></div> Answered
					</li>
					<li>
						<div className='bg-warning' style={{ width: 24, height: 24 }}></div> Seen
					</li>
					<li>
						<div className='bg-light' style={{ width: 24, height: 24 }}></div> Not Seen
					</li>
				</ul>
			</div>
			<h3 className='w-100 text-center text-warning mt-5'>
				{Number.parseInt(props.time / 60)}Min {props.time % 60} Sec left
			</h3>
		</div>
	);
};

export default QuestionNav;
