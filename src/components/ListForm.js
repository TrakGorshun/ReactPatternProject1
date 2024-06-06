import {useState} from 'react';
import {Button} from './Button';
import './ListForm.css';

const ListForm = ({ onSubmitList }) => {
	const [formData, setFormData] = useState({ title: '', description: '', type: 'task'});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmitList(formData);
		setFormData({ title: '', description: '', type: 'task'});
	};

	return (
		<form onSubmit={handleSubmit} className="form">
				<input
					type="text"
					name="title"
					placeholder="Title"
					value={formData.title}
					onChange={handleChange}
					required
					className="form-input"
				/>
			<div className="form-row">
				<textarea
					name="description"
					placeholder="Description"
					value={formData.description}
					onChange={handleChange}
					className="form-input description-input"
				/>
			</div>
				<select name="type" value={formData.type} onChange={handleChange} className="form-input">
					<option value="task">Task</option>
					<option value="shopping">Shopping</option>
				</select>
			<Button type="submit">Create List</Button>
		</form>
	);
};


	export default ListForm;