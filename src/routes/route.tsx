import { RouteObject } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/homePage";
import MoviePage from "../pages/movies/MoviePage";
import LoginPage from "../pages/auth/loginPage";
import SignUpPage from "../pages/auth/signUpPage";
import AboutPage from "../pages/about/AboutPage";
import AwardsPage from "../pages/awards/AwardsPage";
import PeoplePage from "../pages/personnes/PeoplePage";
import MovieDetailsPage from "../pages/movies/MovieDetailsPage";
import PersonnesDetailsPage from "../pages/personnes/PersonDetailsPage";

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
            element: <PeoplePage />
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