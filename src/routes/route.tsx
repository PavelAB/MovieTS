import { RouteObject } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/homePage";
import MoviePage from "../pages/movies/MoviePage";
import LoginPage from "../pages/auth/loginPage";
import SignUpPage from "../pages/auth/signUpPage";
import AboutPage from "../pages/about/AboutPage";
import AwardsPage from "../pages/awards/AwardsPage";
import PersonnesPage from "../pages/personnes/PersonnesPage";
import MovieDetailsPage from "../pages/movies/MovieDetailsPage";
import PersonnesDetailsPage from "../pages/personnes/PersonnesDetailsPage";

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