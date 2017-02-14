import './styles.scss';
import React, { Component, PropTypes } from 'react';
import Moment from 'moment';
import { getTeamID, getTeamNameByID, getGroundNameByID } from 'utils';

class Fixture extends Component {
	render(){
		const { fixture, grounds } = this.props;
		const d = new Date(fixture.date).toUTCString();
		return (
			<div className='fixture-row text gray small'>
				<span>
					{this.getOpponentTeamName()}
				</span>
				<span className='text tiny'>
					{Moment(Date.parse(d)).format('ddd, MM/DD')} @ {getGroundNameByID(grounds, fixture.ground_id)}
				</span> 
			</div>
		);
	}

	getOpponentTeamName() {
		const { fixture, teams } = this.props;
		if(teams.json && teams.json.length){
			return fixture.home_team == getTeamID() ? getTeamNameByID(teams, fixture.away_team) : getTeamNameByID(teams, fixture.home_team);
		}
	}
}

Fixture.propTypes = {
	fixture : PropTypes.object,
	grounds : PropTypes.object,
	teams : PropTypes.object
}

Fixture.defaultProps = {
	fixture : {},
	grounds : {},
	teams : {}
}

export default Fixture;