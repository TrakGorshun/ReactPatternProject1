import React, { useState, useEffect } from 'react';
import NavigationPanel from './components/Navigation';
import Catalogue from './components/Catalogue';
import categoryObserver from './classes/CategoryObserver';
import TodoList from './components/TodoList';
import eventBus from './classes/EventBus';
import Category from './classes/Category';
import './App.css';

const App = () => {
	const [categories, setCategories] = useState([]);
	const [id, setId] = useState(0);
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);

	useEffect(() => {
		const observer = {
			update: (category) => {
				setCategories(prevCategories => [...prevCategories, category]);
			}
		};
		categoryObserver.subscribe(observer);
		return () => {
			categoryObserver.unsubscribe(observer);
		};
	}, []);

	const handleCreateCategory = () => {
		const categoryName = prompt('Write title of category:');
		if (categoryName) {
			const newCategory = new Category(id, categoryName);
			categoryObserver.notify(newCategory);
			setId(id + 1);
		}
	};

	const handleCategorySelect = (categoryId) => {
		setSelectedCategoryId(categoryId);
	};

	const handleCreateList = (chosenCategoryId, listData, existId = null) => {
		setCategories(prevCategories => {
			const newCategories = [...prevCategories];

			const categoryToUpdate = newCategories.find(category => category._id === selectedCategoryId);

			if (categoryToUpdate) {
				if (existId !== null) {
					categoryToUpdate._lists = categoryToUpdate._lists.map((list) => {
						if (list.listId === existId) {
							return { listId: list.listId, id: chosenCategoryId, data: listData };
						}
						return list;
					});
				} else {
					categoryToUpdate._lists.push({
						listId: categoryToUpdate._lists.length,
						id: chosenCategoryId,
						data: listData
					});
				}
			}
			return newCategories;
		  });
	};

	const handleReturnToCatalogue = () => {
		setSelectedCategoryId(null);
	};

	useEffect(() => {
		eventBus.subscribe('returnToCatalogue', handleReturnToCatalogue);
		return () => {
			eventBus.unsubscribe('returnToCatalogue', handleReturnToCatalogue);
		};
	}, []);

	return (
		<>
			<h1>Todo List</h1>
			<div style={{ display: 'flex'}}>
				<NavigationPanel categories={categories} onCategorySelect={handleCategorySelect} selectedCategoryId={selectedCategoryId}/>
				<div style={{ marginLeft: '5vh' }}>
					{selectedCategoryId !== null ? (
						<TodoList selectedCategory={categories.find(category => category._id === selectedCategoryId)} onCreateList={handleCreateList}/>
					) : (
						<Catalogue categories={categories} onCreateCategory={handleCreateCategory}/>
					)}
				</div>
			</div>
		</>
	);
};

export default App;
