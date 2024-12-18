import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout";
import ForgotPassword from "../pages/ForgotPassword";
import Gemini from "../pages/Gemini";

const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "register",
                element: <AuthLayouts> <RegisterPage /> </AuthLayouts>
            },
            {
                path: "email",
                element: <AuthLayouts> <CheckEmailPage /> </AuthLayouts>
            },
            {
                path: "password",
                element: <AuthLayouts> <CheckPasswordPage /> </AuthLayouts>
            },
            {
                path: "forgot-password",
                element: <AuthLayouts><ForgotPassword /></AuthLayouts>
            },
            {
                path: "",
                element: <Home />,
                children: [
                    {
                        path: "messages/:friendId",
                        element: <MessagePage />
                    }
                ]
            },
            {
                path: "gemini",
                element: <AuthLayouts> <Gemini /> </AuthLayouts>
            }
        ]
    }
]);

export default router;