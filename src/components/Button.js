import React, { useState } from 'react';
import './Button.css';

// Dekorator pattern
const Button = ({background, color, onClick, classes, children }) => {
	return (
		<button className={`button ${classes}`} style={{ background: background, color: color }} onClick={onClick}>
			{children}
		</button>
	);
};

Button.defaultProps = {
	background: '#4CAF50',
	color: 'white'
};

const WithHoverAnimation = (WrappedComponent) => {
	const EnhancedComponent = ({children, ...props}) => {
		const [isHovered, setHovered] = useState(false);

		const handleMouseEnter = () => {
			setHovered(true);
		};

		const handleMouseLeave = () => {
			setHovered(false);
		};

		return (
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={isHovered ? 'hovered' : ''}
			>
				<WrappedComponent {...props}>
					{children}
					</WrappedComponent>
			</div>
		);
	};

	return EnhancedComponent;
};

const ButtonWithHoverAnimation = ({ children, ...props }) => {
	const EnhancedButton = WithHoverAnimation(Button);
	return (<EnhancedButton {...props}>{children}</EnhancedButton>);
};

export {Button, ButtonWithHoverAnimation};