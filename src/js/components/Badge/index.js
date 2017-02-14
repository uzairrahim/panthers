import './styles.scss';
import React, { Component, PropTypes } from 'react';
import Classnames from 'classnames';

class Badge extends Component {
	
	render(){
		const { children, color, classnames, size } = this.props;
		return(
			<div className={Classnames('badge', color, size, classnames)}>
				{children}
			</div>
		);
	}

}

Badge.propTypes = {
	children : PropTypes.any,
	color : PropTypes.string,
	size : PropTypes.string,
	classnames : PropTypes.string
};

Badge.defaultProp = {
	color : '',
	size : 'small'
};

export default Badge;