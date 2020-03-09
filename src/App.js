import React from 'react';
import LandingPage from './pages/Landing';
import HotelDetail from './pages/Hotel-Detail';
import Confirmation from './pages/Confirmation';
import Error404 from './pages/Error404';
import Navbar from './components/Navbar';
import { Route, Switch } from "react-router-dom";
import './App.scss';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route path="/" exact component={LandingPage}></Route>
				<Route path="/hotel/:id" component={HotelDetail}></Route>
				<Route path="*" component={Error404} />
			</Switch>
		</div>
	);
}

export default App;
