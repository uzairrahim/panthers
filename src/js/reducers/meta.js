import * as Types from 'actions/types';

let defaultState = {
	grounds : {},
	seasons : {},
	teams : {}
};

export default function(state = defaultState, action = {}){
	switch(action.type){
		case Types.GET_GROUNDS:
			return Object.assign({}, state, {grounds : action.data});

		case Types.GET_SEASONS:
			return Object.assign({}, state, {seasons : action.data});

		case Types.GET_TEAMS:
			return Object.assign({}, state, {teams : action.data});
			
		default :
			return state;
	}
}