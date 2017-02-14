import * as Types from 'actions/types';

let defaultState = {
	fixtures : {},
	batting : {},
	bowling : {},
	results : {},
	roster : {},
	standings : {}
};

export default function(state = defaultState, action = {}){
	switch(action.type){
		case Types.GET_FIXTURES:
			return Object.assign({}, state, {fixtures : action.data});

		case Types.GET_ALL_BATTING_DETAILS:
		case Types.GET_CURRENT_BATTING_DETAILS:
		case Types.GET_BATTING_DETAILS_BY_SEASON:
			return Object.assign({}, state, {batting : action.data});

		case Types.GET_ALL_BOWLING_DETAILS:
		case Types.GET_CURRENT_BOWLING_DETAILS:
		case Types.GET_BOWLING_DETAILS_BY_SEASON:
			return Object.assign({}, state, {bowling : action.data});

		case Types.GET_RESULTS:
			return Object.assign({}, state, {results : action.data});

		case Types.GET_PLAYERS:
			return Object.assign({}, state, {roster : action.data});

		case Types.GET_STANDINGS:
			return Object.assign({}, state, {standings : parseStandings(action.data)});
			
		default :
			return state;
	}
}

function parseStandings(data){
	let j = data.json, d = [], ci = 0, y = 0;

	if(j && j.length){
		for(let x = 0; x < j.length; x++){
			if(x != 0){
				if(j[x].season_id !== j[x-1].season_id || j[x].conference_id !== j[x-1].conference_id){
					d.push(j.slice(ci, x));
					ci = x;
				}
			}
			y = x;
		}

		d.push(j.slice(ci, y+1));
		data.json = d;
	}

	return data;
}