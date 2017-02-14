import './styles.scss';
import React, { Component, PropTypes } from 'react';

class Image extends Component {	
	render() {
		const { src } = this.props;

		return(
			<div className='image'>
				{src !== '' ? <img src={src} /> : null}
			</div>
		);
	}
}

Image.propTypes = {
	src : PropTypes.string
}

Image.defaultProps = {
	src : ''
}

export default Image;