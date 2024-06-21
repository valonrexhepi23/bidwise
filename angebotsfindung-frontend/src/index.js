import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import FileUploadApp from "./file-upload/FileUpload";
import ProjectPage from "./pages/ProjectPage";
import VectorSearch from "./pages/VectorSearch";
import AiModel from "./pages/AiModel";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/fileupload",
        element: <FileUploadApp/>,
    },
    {
        path: "/project",
        element: <ProjectPage/>,
    },
    {
        path: "/vectorsearch",
        element: <VectorSearch/>,
    },
    {
        path: "/ai",
        element: <AiModel />,
    }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
