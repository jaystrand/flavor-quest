import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace/>;
  }
//   else{
//     return <Navigate to="/search-recipes" />;
//   }

  return children; // If token exists, render the protected page
};

export default ProtectedRoute;