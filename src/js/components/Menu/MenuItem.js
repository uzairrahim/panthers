import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class MenuItem extends Component {
	render() {
		const { to, classnames, label, onMenuItemClickHandler } = this.props;
		return(
			<Link
				to={to}
				className={'text upper blue ml20 mb20 ' + classnames}
				onClick={onMenuItemClickHandler}
			>
				{label}
			</Link>
		);
	}
}

MenuItem.propTypes = {
	classnames : PropTypes.string,
	to : PropTypes.string,
	label : PropTypes.string,
	onMenuItemClickHandler : PropTypes.func
};

export default MenuItem;