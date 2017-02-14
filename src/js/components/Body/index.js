import './styles.scss';
import React, { Component, PropTypes } from 'react';

class Body extends Component {	
	render() {
		const { children } = this.props;
		return(
			<div className='body'>
				{children}
			</div>
		);
	}
}

Body.propTypes = {
	children : PropTypes.object
}

export default Body;