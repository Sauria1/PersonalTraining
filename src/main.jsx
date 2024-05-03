import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Customers from "./components/Customers.jsx";
import Trainings from "./components/Trainings.jsx";
import Error from "./components/Error.jsx";
import Calendar from "./components/Calendar.jsx";
import './index.css';

const router = createBrowserRouter( [
    {
        path: "/PersonalTraining/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                element: <Customers />,
                index: true
            },
            {
                path: "Trainings",
                element: <Trainings />
            },
            {
                path: "Calendar",
                element: <Calendar />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);