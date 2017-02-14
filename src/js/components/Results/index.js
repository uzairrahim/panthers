import './styles.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Result from './result';
import * as Actions from 'actions/team';

class Results extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { actions, team } = this.props;

		if(!team.results.json){
			actions.getResults();
		}
	}

	render(){
		return (
			<div>
				{this.renderResultsList()}
				{this.renderMoreLink()}
			</div>
		);
	}

	renderResultsList() {
		const { team } = this.props;

		if(!team.results.json || !team.results.json.length){
			return <div className='text light tiny'>No results found</div>;
		}

		return(
			team.results.json.map(function(r, i){
				return <Result result={r} key={'result-' + i} />
			})
		);
	}

	renderMoreLink() {
		const { team } = this.props;

		if(team.results.json && team.results.json.length){
			return(
				<div>
					<br/>
					<a href='http://www.centraltxcricket.org/scorecard.php' target='_blank'>
						<div className='text green tiny right'>more</div>
					</a>
				</div>
			)
		}
	}
}

Results.propTypes = {
	actions : PropTypes.object,
	team : PropTypes.object
}

Results.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Results);