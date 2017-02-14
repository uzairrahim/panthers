import { combineReducers } from 'redux';
import Meta from 'reducers/meta';
import Team from 'reducers/team';

export default combineReducers({
	meta : Meta,
	team : Team
});