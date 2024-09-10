import { RouteObject } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/homePage";
import MoviePage from "../pages/Movies/MoviePage";
import LoginPage from "../pages/Auth/loginPage";
import SignUpPage from "../pages/Auth/signUpPage";
import AboutPage from "../pages/About/AboutPage";

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
            path: 'login',
            element: <LoginPage />
        },
        {
            path: 'signUp',
            element: <SignUpPage />
        }
    ]
}]