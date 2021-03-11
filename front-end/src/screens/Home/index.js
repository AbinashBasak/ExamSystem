import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './style.css';

// components
import Profile from '../../components/Profile';
import Container from '../../components/Container';
import ExamCard from '../../components/ExamCard';
import ReportCard from '../../components/ReportCard';

const Home = () => {
	// TODO, use api to get available exams
	const available_exams = [<ExamCard exam_id='1' exam_name='Exam name A' full_marks='10' time='15min' />, <ExamCard exam_id='2' exam_name='Exam name B' full_marks='20' time='35min' />];

	const results = [
		<Row>
			<Col lg='3' md='3' sm='0'></Col>
			<Col lg='3' md='3' sm='0'>
				Correct
			</Col>
			<Col lg='3' md='3' sm='0'>
				Wrong
			</Col>
			<Col lg='3' md='3' sm='0'>
				Marks Obtain
			</Col>
		</Row>,
		<ReportCard exam_name='Exam name A' correct='7' wrong='3' obtain='7' />,
		<ReportCard exam_name='Exam name B' correct='7' wrong='3' obtain='7' />,
		<ReportCard exam_name='Exam name C' correct='7' wrong='3' obtain='7' />,
	];

	return (
		<div style={{ width: '98%' }}>
			<Row>
				<Col lg='3' md='4' sm='12'>
					{/* TODO, use api */}
					<Profile name='Student name' roll='ROLL0001' email='student@email.com' department='CSE' />
				</Col>
				<Col className='dashboard' lg='9' md='8' sm='12'>
					<Container header='Available Exams' body={available_exams} />
					<Container header='Results' body={results} />
				</Col>
			</Row>
		</div>
	);
};

export default Home;
