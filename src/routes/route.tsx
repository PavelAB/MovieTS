import { RouteObject } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/homePage";
import Movie from "../pages/Movies/MoviePage";
import LoginPage from "../pages/Auth/loginPage";
import SignUpPage from "../pages/Auth/signUpPage";

export const route: RouteObject[] = [{
    path: '',
    element: <App />,
    children: [
        {
            index: true,
            element: <HomePage />
        },
        {
            path: 'movie',
            element: <Movie />
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