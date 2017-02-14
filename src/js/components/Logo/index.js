import './styles.scss';
import React, { Component } from 'react';

class Logo extends Component {
	render(){
		return (
			<div className='logo-container'>
				<div >
					<div className='text bold small white upper right'>Austin Panthers</div>
					<div className='text tiny right'>Round Rock Cricket Club</div>
				</div>
				<img className='logo' src='img/logo.png'/>
			</div>
		);
	}
}

export default Logo;