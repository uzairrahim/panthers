import './styles.scss';
import React, { Component, PropTypes } from 'react';

class Result extends Component {
	render(){
		const { result } = this.props;

		if(!result.result){
			return null;
		}

		return (
			<div className='text gray small'>{result.result}</div>
		);
	}
}

Result.propTypes = {
	result : PropTypes.object
}

Result.defaultProps = {
	result : {}
}

export default Result;