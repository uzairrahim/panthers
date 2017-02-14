import './styles.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from 'components/Menu';
import Head from 'components/Header';
import Body from 'components/Body';
import Foot from 'components/Footer';
import * as Actions from 'actions/meta';

class Layout extends Component {

	constructor(props) {
		super(props);
		this.onHeaderMenuIconClickHandler = this.onHeaderMenuIconClickHandler.bind(this);
		this.onMenuItemClickHandler = this.onMenuItemClickHandler.bind(this);
		this.state = {
			showSideMenu : false
		}
	}

	componentDidMount() {
		const { actions, meta } = this.props;

		if(!meta.grounds.json){
			actions.getGrounds();
		}

		if(!meta.seasons.json){
			actions.getSeasons();
		}

		if(!meta.teams.json){
			actions.getTeams();
		}

	}

	render() {
		const { children } = this.props;
		const { showSideMenu } = this.state;
		return(
			<div className='layout'>
				<Menu 
					show={showSideMenu}
					onMenuItemClickHandler={this.onMenuItemClickHandler}
				/>
				<Head onHeaderMenuIconClickHandler={this.onHeaderMenuIconClickHandler}/>
				<Body>{children}</Body>
				<Foot />
			</div>
		);
	}

	onHeaderMenuIconClickHandler() {
		this.setState({showSideMenu : !this.state.showSideMenu});
	}

	onMenuItemClickHandler() {
		this.setState({showSideMenu : false});
	}
}

Layout.propTypes = {
	actions : PropTypes.object,
	children : PropTypes.object,
	meta : PropTypes.object
}

function mapStateToProps(state) {
    return {
        meta : state.meta
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, Actions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);