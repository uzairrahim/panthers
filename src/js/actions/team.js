import Axios from 'axios';
import * as Types from 'actions/types';

export function getAllPlayers(){
	return function(dispatch){
		const query = Axios.get('/api/players');
		query.then(function(response){
			dispatch({
				type : Types.GET_PLAYERS,
				data : response.data
			});
		});
		return query;
	}
}

export function getAllBattingDetails(){
	return function(dispatch){
		const query = Axios.get('/api/players/batting/all');
		query.then(function(response){
			dispatch({
				type : Types.GET_ALL_BATTING_DETAILS,
				data : response.data
			});
		});
		return query;
	}
}

export function getAllBowlingDetails(){
	return function(dispatch){
		const query = Axios.get('/api/players/bowling/all');
		query.then(function(response){
			dispatch({
				type : Types.GET_ALL_BOWLING_DETAILS,
				data : response.data
			});
		});
		return query;
	}
}

export function getCurrentBattingDetails(){
	return function(dispatch){
		const query = Axios.get('/api/players/batting/current');
		query.then(function(response){
			dispatch({
				type : Types.GET_CURRENT_BATTING_DETAILS,
				data : response.data
			});
		});
		return query;
	}
}

export function getCurrentBowlingDetails(){
	return function(dispatch){
		const query = Axios.get('/api/players/bowling/current');
		query.then(function(response){
			dispatch({
				type : Types.GET_CURRENT_BOWLING_DETAILS,
				data : response.data
			});
		});
		return query;
	}
}

export function getBattingDetailsBySeason(season_id){
	return function(dispatch){
		const query = Axios.get('/api/players/batting/season/' + season_id);
		query.then(function(response){
			dispatch({
				type : Types.GET_BATTING_DETAILS_BY_SEASON,
				data : response.data
			});
		});
		return query;
	}
}

export function getBowlingDetailsBySeason(season_id){
	return function(dispatch){
		const query = Axios.get('/api/players/bowling/season/' + season_id);
		query.then(function(response){
			dispatch({
				type : Types.GET_BOWLING_DETAILS_BY_SEASON,
				data : response.data
			});
		});
		return query;
	}
}

export function getFixtures(){
	return function(dispatch){
		const query = Axios.get('/api/fixtures');
		query.then(function(response){
			dispatch({
				type : Types.GET_FIXTURES,
				data : response.data
			});
		});
		return query;
	}
}

export function getResults(){
	return function(dispatch){
		const query = Axios.get('/api/results');
		query.then(function(response){
			dispatch({
				type : Types.GET_RESULTS,
				data : response.data
			});
		});
		return query;
	}
}

export function getStandings(){
	return function(dispatch){
		const query = Axios.get('/api/standings');
		query.then(function(response){
			dispatch({
				type : Types.GET_STANDINGS,
				data : response.data
			});
		});
		return query;
	}
}