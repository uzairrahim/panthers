import './styles.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from 'actions/team';
import Standing from './standing';
import { getTeamID } from 'utils';

class Standings extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { actions, team } = this.props;

		if(!team.standings.json){
			actions.getStandings();
		}
	}

	render(){
		return (
			<div>
				{this.renderStandingsList()}
				{this.renderMoreLink()}
			</div>
		);
	}

	renderStandingsList() {
		const { team } = this.props;

		if(!team.standings.json || !team.standings.json.length){
			return <div className='text light tiny'>Standings not available</div>;
		}

		return(
			team.standings.json.map(function(standing){
				return(
					standing.map(function(s, i){
						if(s.team_id === getTeamID()){
							s.position = i + 1;
							return <Standing standing={s} key={'standing-' + i} />
						}
					})
				)
			})
		);
	}

	renderMoreLink() {
		const { team } = this.props;

		if(team.standings.json && team.standings.json.length){
			return(
				<div>
					<br/>
					<a href='http://www.centraltxcricket.org/ladder.php' target='_blank'>
						<div className='text green tiny right'>more</div>
					</a>
				</div>
			)
		}
	}
}

Standings.propTypes = {
	actions : PropTypes.object,
	team : PropTypes.object
}

Standings.defaultProps = {
	team : {}
}

function mapStateToProps(state) {
    return {
        team : state.team
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Standings);