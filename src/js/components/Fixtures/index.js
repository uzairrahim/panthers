import './styles.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from 'actions/team';
import Fixture from './fixture.js';

class Fixtures extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { actions, team } = this.props;

		if(!team.fixtures.json){
			actions.getFixtures();
		}
	}

	render(){
		return (
			<div>
				{this.renderFixturesList()}
				{this.renderMoreLink()}
			</div>
		);
	}

	renderFixturesList() {
		const { team, meta } = this.props;

		if(!team.fixtures.json || !team.fixtures.json.length){
			return <div className='text light tiny'>No upcoming fixtures</div>;
		}

		return (
			team.fixtures.json.map(function(f, i){
				return <Fixture key={'fixture-' + i} fixture={f} grounds={meta.grounds} teams={meta.teams} />
			})
		)
	}

	renderMoreLink() {
		const { team } = this.props;

		if(team.fixtures.json && team.fixtures.json.length){
			return(
				<div>
					<br/>
					<a href='http://www.centraltxcricket.org/schedule.php' target='_blank'>
						<div className='text green tiny right'>more</div>
					</a>
				</div>
			)
		}
	}
}

Fixtures.propTypes = {
	actions : PropTypes.object,
	meta : PropTypes.object,
	team : PropTypes.object
}

Fixtures.defaultProps = {
	grounds : {},
	team : {},
	meta : {}
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

export default connect(mapStateToProps, mapDispatchToProps)(Fixtures);