import './styles.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from 'actions/team';
import Card from 'components/Card';
import Fixtures from 'components/Fixtures';
import Results from 'components/Results';
import Standings from 'components/Standings';
import Table from 'components/Table';
import Select from 'components/Select';
import { getBattingTableHeadColumns, getBowlingTableHeadColumns, getSeasonsList, getSeasonID } from 'utils';


class Players extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { actions, team, params } = this.props;
		const current = params.season == 'current';

		this.onSelectSeasonHandler = this.onSelectSeasonHandler.bind(this);

		!team.batting.json && current ? actions.getCurrentBattingDetails() : actions.getAllBattingDetails();
		!team.bowling.json && current ? actions.getCurrentBowlingDetails() : actions.getAllBowlingDetails();
	}

	render(){
		const { team, meta, params } = this.props;
		const batting = getBattingTableHeadColumns();
		const bowling = getBowlingTableHeadColumns();
		const options = getSeasonsList(meta.seasons);
		const current = params.season == 'current';
		const selectedIndex = current ? 1 : 0;
		
		if(team.batting.json && team.bowling.json){
			return (
				<div className='g-row responsive'>
					<div className='g-col nin responsive'>
						<div className='flex horizontal center mt5 mb20'>
							<h2 className='text secondary blue upper m0'>Leaderboard</h2>
							<Select classNames='ml10' options={options} selectedIndex={selectedIndex} onSelectHandler={this.onSelectSeasonHandler}/>
						</div>
						<div className='g-row mb20'>
							<div className='g-col twe'>
								<Card heading='Batting'>
									{
										team.batting.json.length ? 
											<Table head={batting} data={team.batting.json} type='batting'/>
										:
											<div className='text light small'>No records found</div>
									}
								</Card>
							</div>
						</div>
						<div className='g-row mb20'>
							<div className='g-col twe'>
								<Card heading='Bowling'>
									{
										team.bowling.json.length ? 
											<Table head={bowling} data={team.bowling.json} type='bowling'/>
										:
											<div className='text light small'>No records found</div>
									}
									
								</Card>
							</div>
						</div>
					</div>
					<div className='g-col thr responsive'>
						<h2 className='text secondary blue upper mt5 mb20'>Activity</h2>
						<Card heading='Current Standings' classnames='mb20'>
							<Standings />
						</Card>
						<Card heading='Upcoming Fixtures' classnames='mb20'>
							<Fixtures />
						</Card>
						<Card heading='Recent Results' classnames='mb20'>
							<Results />
						</Card>
					</div>
				</div>
			);
		}

		return null;

	}

	onSelectSeasonHandler(index) {
		const { actions, meta } = this.props;

		let season_id = getSeasonID(meta.seasons, index);

		if(season_id == -2) {
			actions.getAllBattingDetails();
			actions.getAllBowlingDetails();
			return;
		}

		if(season_id == -1) {
			actions.getCurrentBattingDetails();
			actions.getCurrentBowlingDetails();
			return;
		}

		actions.getBattingDetailsBySeason(season_id);
		actions.getBowlingDetailsBySeason(season_id);
	}
}

Players.propTypes = {
	active : PropTypes.bool,
	team : PropTypes.object,
	meta : PropTypes.object,
	actions : PropTypes.object,
	params : PropTypes.object
}

function mapStateToProps(state) {
    return {
        team : state.team,
        meta : state.meta
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);