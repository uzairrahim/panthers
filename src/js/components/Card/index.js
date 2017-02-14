import './styles.scss';
import React, { Component, PropTypes } from 'react';
import Classnames from 'classnames';

class Card extends Component {	
	render() {
		const { children, classnames, heading } = this.props;
		return(
			<div className={Classnames('card', classnames)}>
				<div className='text primary small upper bold'>{heading}</div>
				<hr/>
				{children}
			</div>
		);
	}
}

Card.propTypes = {
	children : PropTypes.any,
	classnames : PropTypes.string,
	heading : PropTypes.string
}

Card.defaultProps = {
	children : null,
	classnames : '',
	heading : ''
}

export default Card;