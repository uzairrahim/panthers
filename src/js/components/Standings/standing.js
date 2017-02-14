import './styles.scss';
import React, { Component, PropTypes } from 'react';
import { getOrdinal } from 'utils';

class Standing extends Component {
	render(){
		const { standing } = this.props;

		return (
			<div className='text gray small'>{getOrdinal(standing.position)}&nbsp;&nbsp;<span className='text bullet'>{standing.league_name}</span></div>
		);
	}
}

Standing.propTypes = {
	standing : PropTypes.object
}

Standing.defaultProps = {
	standing : {}
}

export default Standing;