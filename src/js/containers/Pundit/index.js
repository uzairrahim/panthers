import './styles.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from 'actions/team';
import Card from 'components/Card';
import Badge from 'components/Badge';
import PunditRow from 'components/Table/PunditRow';
import { sortRosterByName } from 'utils';

class Pundit extends Component {

	constructor(props) {
		super(props);
		this.onAddToRoster = this.onAddToRoster.bind(this);
		this.onRemoveFromRoster = this.onRemoveFromRoster.bind(this);
		this.onScrollHandler = this.onScrollHandler.bind(this);
		this.state = {
			selection : [],
			floatBadges : false
		}
	}

	componentDidMount() {
		const { actions } = this.props;
		actions.getAllBattingDetails();
		actions.getAllBowlingDetails();

		window.addEventListener('scroll', this.onScrollHandler, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScrollHandler, false);
	}

	render() {
		const { team } = this.props;

		if(team.batting.json && team.bowling.json){
			const roster = sortRosterByName(team.batting.json);
			const onAddToRoster = this.onAddToRoster;
			const onRemoveFromRoster = this.onRemoveFromRoster;
			const onOversChangeHandler = this.onOversChangeHandler;
			return (
				<div>
					<div className='g-row mb20'>	
						<div className='g-col twe'>
							<h2 className='text secondary blue upper mb5'>Pundit</h2>
							<div className='text small gray'>Click on the row to select a player. Enter the number of overs to be bowled by the player to see bowling prediction.</div>
						</div>
					</div>
					<div className={'badge-row transition g-row mb20 ' + this.getBadgesFloatState()}>
						<div className='g-col twe flex horizontal center-center'>
							<div className='flex vertical center-center mr20'>
								<div className={'text small mb10 ' + this.getSelectedBadgeColor()}>Selected</div>
								<Badge
									color={this.getSelectedBadgeColor()}
									size='medium'>
									{this.state.selection.length}
								</Badge>
							</div>
							<div className='flex vertical center-center mr20'>
								<div className='text small blue mb10'>Batting</div>
								<Badge
									color='blue'
									size='medium'>
									{this.getBattingPrediction()}
								</Badge>
							</div>
							<div className='flex vertical center-center mr20'>
								<div className='text small gray mb10'>Overs</div>
								<Badge
									size='medium'>
									{this.getTotalOvers()}
								</Badge>
							</div>
							<div className='flex vertical center-center mr20'>
								<div className='text small blue mb10'>Bowling</div>
								<Badge
									color='blue'
									size='medium'>
									{this.getBowlingPrediction()}
								</Badge>
							</div>
							<div className='flex vertical center-center'>
								<div className='text small gray mb10'>Wickets</div>
								<Badge
									size='medium'>
									{this.getWicketPredictions()}
								</Badge>
							</div>
						</div>
					</div>
					<div className='g-row'>	
						<div className='g-col twe'>
							<Card heading='Roster' classnames='roster-table'>
								<div className='table'>
									<div className='t-body'>
										{
											roster.map(function(data,index){
												if(data.is_active === 0){
													return(
														<PunditRow
															key={`roster-${index}`}
															data={data}
															onAddToRoster={onAddToRoster}
															onRemoveFromRoster={onRemoveFromRoster}
															onOversChangeHandler={onOversChangeHandler}
														/>
													);
												}
											})
										}
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>
			);
		}

		return null;
	}

	onScrollHandler() {
		if(window.pageYOffset > 140 && !this.state.floatBadges){
			this.setState({ floatBadges : true })
		}

		if(window.pageYOffset < 140 && this.state.floatBadges){
			this.setState({ floatBadges : false })
		}
	}

	getBadgesFloatState() {
		return this.state.floatBadges ? 'fixed' : '';
	}

	getSelectedBadgeColor() {
		const { selection } = this.state;
		return selection.length <= 11 ? 'gray' : 'red';
	}

	getBattingPrediction() {
		const { selection } = this.state;
		const { team } = this.props;
		let batting = team.batting;
		var score = 0;

		if(batting.json && batting.json.length && selection.length ){
			for(let i = 0; i < selection.length; i++){
				for(let j = 0; j < batting.json.length; j++) {
					if(batting.json[j].id == selection[i].id){
						let data = batting.json[j];
						score += Number((data.runs/data.innings).toFixed(0));
					}
				}
			}
		}

		return score;
	}

	getBowlingPrediction() {
		const { selection } = this.state;
		const { team } = this.props;
		let bowling = team.bowling;
		var score = 0;

		if(bowling.json && bowling.json.length && selection.length ){
			for(let i = 0; i < selection.length; i++){
				for(let j = 0; j < bowling.json.length; j++) {
					if(bowling.json[j].id == selection[i].id){
						let data = bowling.json[j];
						score += Number((data.runs/data.overs).toFixed(0) * selection[i].overs);
					}
				}
			}
		}

		return score;
	}

	getTotalOvers() {
		const { selection } = this.state;
		var overs = 0;

		for(let i = 0; i < selection.length; i++){
			overs += Number(selection[i].overs);
		}

		return overs;
	}

	getWicketPredictions() {
		const { selection } = this.state;
		const { team } = this.props;
		let bowling = team.bowling;
		var wickets = 0;

		if(bowling.json && bowling.json.length && selection.length ){
			for(let i = 0; i < selection.length; i++){
				for(let j = 0; j < bowling.json.length; j++) {
					if(bowling.json[j].id == selection[i].id){
						let data = bowling.json[j];
						let runs = Number((data.runs/data.overs).toFixed(0) * selection[i].overs);
						let avg = Number((data.runs/data.wickets).toFixed(2));
						let wkts = Number(runs/avg);
						if(wkts >= 1) wickets += Number(wkts.toFixed(0));
					}
				}
			}
		}

		return wickets;
	}

	onAddToRoster(id, overs) {
		const { selection } = this.state;
		selection.push({id : id, overs : overs});
		this.setState({selection});
		this.getBattingPrediction();
	}

	onRemoveFromRoster(id) {
		const { selection } = this.state;
		var index = -1;
		for(let i = 0; i < selection.length; i++) {
			if(selection[i].id == id){
				index = i;
			}
		}
		selection.splice(index,1);
		this.setState({selection});
	}

	onOversChangeHandler(id, overs) {
		this.onRemoveFromRoster(id);
		this.onAddToRoster(id, overs);
	}
}

Pundit.propTypes = {
	team : PropTypes.object,
	meta : PropTypes.object,
	actions : PropTypes.object
};

Pundit.defaultProps = {
	team : {},
	meta : {},
	actions : {}
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Pundit);