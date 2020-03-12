import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import List from './List';
import Login from './Login';
import Register from './Register';

const Root = () => (
	<BrowserRouter>
		<div>
			<Route exact path="/" component={Login}/>
			<Route exact path="/register" component={Register}/>
			<Route exact path="/usuarios" component={List}/>
		</div>
	</BrowserRouter>
);

export default Root;