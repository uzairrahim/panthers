import './styles';
import React, { Component, PropTypes} from 'react';
import MenuItem from './MenuItem';

class Menu extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { onMenuItemClickHandler } = this.props;
		return (
			<div className={'side-menu transition ' + this.getMenuState()}>
				<div className='flex vertical'>
					<MenuItem
						to='leaderboard'
						label='leaderboard'
						classnames='mt20'
						onMenuItemClickHandler={onMenuItemClickHandler}
					/>
					<MenuItem
						to='pundit'
						label='pundit'
						onMenuItemClickHandler={onMenuItemClickHandler}
					/>
				</div>
			</div>
		);
	}

	getMenuState() {
		if(this.props.show) return 'show';
		return '';
	}
}

Menu.propTypes = {
	classnames : PropTypes.string,
	show : PropTypes.bool,
	onMenuItemClickHandler : PropTypes.func
};

Menu.defaultProps = {
	show : false
};

export default Menu;