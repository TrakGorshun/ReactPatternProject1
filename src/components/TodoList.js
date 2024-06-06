import {useState} from "react";
import ListForm from "./ListForm";
import ListCard from "./ListCard";
import listFactory from '../classes/ListFactory';
import eventBus from "../classes/EventBus";
import {Button, ButtonWithHoverAnimation} from "./Button";
import './TodoList.css';

const TodoList = ({ selectedCategory, onCreateList}) => {
	const [showModal, setShowModal] = useState(false);
	const [sortStrategy, setSortStrategy] = useState('byTitle');
	const [memento, setMemento] = useState(null);

	const sortStrategies = {
		byTitle: (tasks) => tasks.slice().sort((a, b) => a.data.title.localeCompare(b.data.title)),
		byPriority: (tasks) => tasks.slice().sort((a, b) => a.priority - b.priority)
	};

	const handleSortChange = (strategy) => {
		setSortStrategy(strategy);
	};

	const applySortStrategy = (tasks) => {
		return sortStrategies[sortStrategy](tasks);
	};

	const handleReturnClick = () => {
		eventBus.emit('returnToCatalogue');
	};

	const handleOpenModal = () => {
			setShowModal(true);
	};

	const handleCloseModal = () => {
			setShowModal(false);
	};

	const handleSubmit = (formData) => {
			const { id, title, description, type, rows} = formData;
			let newList;
			if (type === 'task') {
				newList = listFactory.createTaskList(title, description, type);
			} else if (type === 'shopping') {
				newList = listFactory.createShoppingList(title, description, type);
			}
			newList.rows = rows ? rows : [];
			onCreateList(selectedCategory._id, newList, id);
			handleCloseModal();
		};

	const saveState = () => {
		setMemento(prevMemento => selectedCategory.createMemento());
	};

	const restoreState = () => {
		if (memento) {
			selectedCategory.restoreFromMemento(memento);
			setMemento(null);
		}
	};

	return (
		<div>
			<h2>{selectedCategory.name}</h2>
			<div>
			<div className="memento-buttons">
				<Button onClick={saveState}>Save state</Button>
				<Button onClick={restoreState}>Undo state</Button>
			</div>
			<label>Sort by:</label>
			<select value={sortStrategy} onChange={(e) => handleSortChange(e.target.value)}>
				<option value="byTitle">Title</option>
				<option value="byPriority">Priority</option>
			</select>
		</div>
			<Button background='ffffff' color='333333' onClick={handleOpenModal}>Create new List</Button>
			<p>Category Lists:</p>
			<div  className="list-cards-container">
				{applySortStrategy(selectedCategory._lists).map((list) => (
					<div className="list-card-item">
						<ListCard list={{id: list.listId, schedule: list}} onUpdateList={handleSubmit}/>
					</div>
				)
				)}
			</div>
			{showModal && (
			<div className="modal">
				<div className="modal-content">
					<span className="close" onClick={handleCloseModal}>Close</span>
					<h2 style={{color: '#333333'}}>Create new List</h2>
					<ListForm onSubmitList={handleSubmit}/>
				</div>
			</div>
		)}
			<ButtonWithHoverAnimation onClick={handleReturnClick}>Back to Catalogue</ButtonWithHoverAnimation>
		</div>
	);
};

export default TodoList;