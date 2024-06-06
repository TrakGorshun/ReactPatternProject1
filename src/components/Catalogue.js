import {useState} from 'react';
import './Catalogue.css';
import { Button } from './Button';

export default function Catalogue({onCreateCategory}) {

	return (
		<div className="initial-screen">
			<h2>Welcome!</h2>
			<p>Start by creating a category to add tasks or to-do lists.</p>
			<Button onClick={onCreateCategory}>Create category</Button>
		</div>
	);
};