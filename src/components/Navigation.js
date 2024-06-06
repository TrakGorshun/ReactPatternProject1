import {useEffect} from 'react';

import './Navigation.css';

const NavigationPanel = ({ categories, onCategorySelect, selectedCategoryId}) => {

	return (
		<div className="navigation-panel">
			<h2>Categories</h2>
			<ul>
				{categories && categories.map(category => (
					<li key={category._id} onClick={() => onCategorySelect(category._id)} className={selectedCategoryId === category._id ? 'active' : ''}>
						{category._name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default NavigationPanel;