import { RouteObject } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home/home.page";
import Movie from "../pages/Movies/Movie";

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
        }
    ]
}]