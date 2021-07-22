import React from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";

import Header from "../components/Header.js"; //header lo voy a mostrar dependiendo de las rutas, por eso lo muevo a PrivateRoute
import MoviesDashboardPage from "../components/MoviesDashboardPage";
import CreateMoviePage from "../components/CreateMoviePage.js";
import MovieRatingPage from "../components/MovieRatingPage";
import MovieDetailPage from "../components/MovieDetailPage";
import WatchlistPage from "../components/WatchlistPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import { createBrowserHistory } from 'history';
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";


export const history =  createBrowserHistory(); 
//si uso Router en lugar de BrowserRouter, le puedo pasar mi instancia de history
//quiero que me deje ir a LoginPage solo si no estoy authenticado, si no que me redirija a dashboard
const AppRouter = () =>(

    <Router history={history}>
        <div>
            <Header/>
            <Switch>
                <Route exact={true} path="/"><Redirect to="/dashboard"/></Route>
                <Route path="/dashboard" component={MoviesDashboardPage}/>
                <PrivateRoute path="/add-movie" component={CreateMoviePage}/>
                <Route path="/movies/:movieId/" component={MovieDetailPage}/>
                <Route path="/ratings/:movieId/" component={MovieRatingPage}/>
                <Route path="/watchlist/:userId" component={WatchlistPage}/>
                <PublicRoute exact={true} path="/register/" component={RegisterPage}/>
                <PublicRoute exact={true} path="/login/" component={LoginPage}/>
                
                <Route component={NotFoundPage} /> 
                {/* with Switch and no path defined, this will run if there's no match for any of the routes above */}
            </Switch>
                
        </div>
        
    </Router>
);

export default AppRouter;