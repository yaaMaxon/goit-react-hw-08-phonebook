import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "./Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { refreshThunk } from "redux/authReducer";
import Navigation from "./Navigation/Navigation";
import RestictedRoute from "./Route/RestictedRoute";
import PrivateRoute from "./Route/PrivateRoute";
import { selectAuthIsLoading } from "redux/authSelectors";

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));

const appRoutes = [
  {path: '/', element: <HomePage />},
  {path: '/register', element: (
    <RestictedRoute>
      <RegisterPage />
    </RestictedRoute>
  ),
},
  {path: '/login', element: (
    <RestictedRoute> 
      <LoginPage />
    </RestictedRoute>
  ),
},
  {path: '/contacts', element: (
    <PrivateRoute>
      <ContactsPage />
    </PrivateRoute>
  ),
},
]

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsLoading);

  useEffect(() => {
    dispatch(refreshThunk())
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      {isRefreshing ? ( <Loader /> ) : (
      <Suspense fallback={<Loader />}>
        <Routes>
         {appRoutes.map(({ path, element }) => 
           <Route key={path} path={path} element={element} />)}
        </Routes>
      </Suspense>
      )}
    </div>
  );
};
