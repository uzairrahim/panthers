import '../../axios.config';
import 'common.scss';
import 'flex.scss';
import 'form.scss';
import 'grid.scss';

import React from 'react';
import ReactDOM  from 'react-dom';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, useRouterHistory } from 'react-router';
import Store from 'store';
import Layout from 'components/Layout';
import Leaderboard from 'containers/Leaderboard';
import Pundit from 'containers/Pundit';
import { navigate } from './utils';

const history = useRouterHistory(createHashHistory)({queryKey: false});

ReactDOM.render(
	<Provider store={Store}>
		<Router history={history}>
			<Route path='/' component={Layout}>
				<IndexRedirect to='/leaderboard' />
				<Route path='leaderboard(/:season)' component={Leaderboard} />
				<Route path='pundit' component={Pundit} />
				<Route path='*' onEnter={redirectToIndex} />
			</Route>
		</Router>
	</Provider>
	, document.getElementById('root')
);

function redirectToIndex(){
	navigate('#/leaderboard');
}