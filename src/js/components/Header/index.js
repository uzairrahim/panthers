import './styles.scss';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Logo from 'components/Logo'

class Header extends Component {	
	render() {
		return(
			<div className='header'>
				<div className='menu-icon ml5' onClick={this.props.onHeaderMenuIconClickHandler}></div>
				<ul className='menu'>
					<li className='menu-item'>
						<Link to='leaderboard' className='text secondary medium white upper'>Leaderboard</Link>
					</li>
					<li className='menu-item'>
						<Link to='pundit' className='text secondary medium white upper'>Pundit</Link>
					</li>
				</ul>
				<Logo />
			</div>
		);
	}
}

Header.propTypes = {
	onHeaderMenuIconClickHandler : PropTypes.func
}

export default Header;