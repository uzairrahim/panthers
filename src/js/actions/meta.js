import Axios from 'axios';
import * as Types from 'actions/types';

export function getGrounds(){
	return function(dispatch){
		const query = Axios.get('/api/grounds');
		query.then(function(response){
			dispatch({
				type : Types.GET_GROUNDS,
				data : response.data
			});
		});
		return query;
	}
}

export function getSeasons(){
	return function(dispatch){
		const query = Axios.get('/api/seasons');
		query.then(function(response){
			dispatch({
				type : Types.GET_SEASONS,
				data : response.data
			});
		});
		return query;
	}
}

export function getCurrentSeasons(){
	return function(dispatch){
		const query = Axios.get('/api/seasons/current');
		query.then(function(response){
			dispatch({
				type : Types.GET_SEASONS,
				data : response.data
			});
		});
		return query;
	}
}

export function getTeams(){
	return function(dispatch){
		const query = Axios.get('/api/teams');
		query.then(function(response){
			dispatch({
				type : Types.GET_TEAMS,
				data : response.data
			});
		});
		return query;
	}
}