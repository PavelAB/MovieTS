import { RouteObject } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/homePage";
import MoviePage from "../pages/Movies/MoviePage";
import LoginPage from "../pages/Auth/loginPage";
import SignUpPage from "../pages/Auth/signUpPage";
import AboutPage from "../pages/About/AboutPage";
import AwardsPage from "../pages/Awards/AwardsPage";
import PersonnesPage from "../pages/Personnes/PersonnesPage";
import MovieDetailsPage from "../pages/Movies/pages/MovieDetailsPage";
import PersonnesDetailsPage from "../pages/Personnes/pages/PersonnesDetailsPage";

export const route: RouteObject[] = [{
    path: '',
    element: <App />,
    children: [
        {
            index: true,
            element: <HomePage />
        },
        {
            path: 'about',
            element: <AboutPage />
        },
        {
            path: 'movie',
            element: <MoviePage />
        },
        {
            path: 'movie/:ID_Movie',
            element: <MovieDetailsPage />
        },
        {
            path: 'stars',
            element: <PersonnesPage />
        },
        {
            path: 'stars/:ID_Personne',
            element: <PersonnesDetailsPage />
        },
        {
            path: 'awards',
            element: <AwardsPage />
        },
        {
            path: 'login',
            element: <LoginPage />
        },
        {
            path: 'signUp',
            element: <SignUpPage />
        }
    ]
}]