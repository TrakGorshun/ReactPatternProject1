import React, {useEffect, useState } from 'react';
import './ListCard.css';
import { Button } from './Button';

const ListCard = ({list, onUpdateList }) => {
	const [editing, setEditing] = useState(false);
	const [formData, setFormData] = useState({
		id: list.id,
		title: list.schedule.data.title,
		description: list.schedule.data.description,
		type: list.schedule.data.priority || list.schedule.data.plan,
		rows: list.schedule.data.rows || [],
	});

	useEffect(() => {
		setFormData({
			id: list.id,
			title: list.schedule.data.title,
			description: list.schedule.data.description,
			type: list.schedule.data.priority || list.schedule.data.plan,
			rows: list.schedule.data.rows || [],
		});
	}, [list]);

	const handleEditClick = () => {
		setEditing(true);
	};

	const handleSaveClick = () => {
		onUpdateList(formData);
		setEditing(false);
	};

	const handleCancelClick = () => {
		setFormData(prevData => ({
			...prevData,
			title: list.schedule.data.title,
			description: list.schedule.data.description,
			type: list.schedule.data.plan || list.schedule.data.priority || '',
			rows: list.schedule.data.rows || []
		}));
		setEditing(false);
	};

	const handleChange = (e, index) => {
		const { name, value } = e.target;
		if (name === 'item') {
			const updatedRows = [...formData.rows];
			updatedRows[index][name] = value;
			setFormData(prevData => ({
				...prevData,
				rows: updatedRows
			}));
		}
		else {
			setFormData(prevData => ({
				...prevData,
				[name]: value
			}));
		}
	};

	const handleRow = (type, index = null) => {
		if (type === 'add') {
			setFormData(prevData => ({
				...prevData,
				rows: [...prevData.rows, { item: '', quantity: '' }]
			}));
		}
		else {
			const updatedRows = [...formData.rows];
			updatedRows.splice(index, 1);
			setFormData(prevData => ({
				...prevData,
				rows: updatedRows
			}));
		}
	};

	return (
		<div>
			<div>
				<h3>{list.schedule.data.title}</h3>
				<p>{list.schedule.data.description}</p>
				<Button background="white" color="black" classes="modify-button" onClick={handleEditClick}>Modify</Button>
			</div>
			{editing && (
				<div className='list-card-form'>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
					{formData.rows.map((row, index) => (
						<div key={index}>
							<input
								type="text"
								name="item"
								value={row.item}
								onChange={(e) => handleChange(e, index)}
							/>
							{formData.type === 'shopping' && (<input
								type="text"
								name="quantity"
								value={row.quantity}
								onChange={(e) => handleChange(e, index)}
							/>)}
							<Button background='blue' color='white' onClick={() => handleRow('remove', index)}>Delete row</Button>
						</div>
					))}
					<Button  background='#c65757' color='white' onClick={() => handleRow('add')}>Add row</Button>
					<Button  background='#c65757' color='white' onClick={handleSaveClick}>Save</Button>
					<Button  background='#c65757' color='white' onClick={handleCancelClick}>Cancel</Button>
				</div>
				)
			}
		</div>
	);
};

export default ListCard;