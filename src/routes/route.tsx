import App from "../App";
import HomePage from "../pages/Home/home.page";

export const route = [{
    path: '',
    element: <App />,
    children: [
        {
            index: true,
            element: <HomePage />
        }
    ]
}]