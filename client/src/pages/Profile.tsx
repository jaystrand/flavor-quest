import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  username: string;
  email: string;
}
interface Favorite {
  recipe: {
    title: string;
    description: string;
  };
}
interface Comment {
  text: string;
  recipe: {
    title: string;
  };
}


const Profile = () => {
  // const [profile, setProfile] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<{ username: string, email: string, favorites: Favorite[], comments: Comment[] } | null>(null);

  const navigate = useNavigate();
  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      
        const token = localStorage.getItem('token'); // Get token from localStorage
        console.log("TOKEN FROM PROFILE PAGE",token);
        if (!token) {
          navigate('/');  // Redirect to login if not authenticated
          // setError('You are not logged in.');
          return;
        }else{
          try {
          const response = await axios.get('http://localhost:3001/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Profile data:', response.data); 
          setUser(response.data);
          console.log('Full user object:', user);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
        }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      <h1>User Profile</h1>
      <h2>Welcome {user?.username} !</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>

          <h2>Favorites</h2>
          <ul>
            {user.favorites && user.favorites.length > 0 ? (
              user.favorites.map((favorite, index) => (
                <li key={index}>
                  <h3>{favorite.recipe.title}</h3>
                  <p>{favorite.recipe.description}</p>
                </li>
              ))
            ) : (
              <p>No favorites found</p>
            )}
          </ul>

          <h2>Comments</h2>
          <ul>
            {user.comments && user.comments.length > 0 ? (
              user.comments.map((comment, index) => (
                <li key={index}>
                  <p>{comment.text}</p>
                  <small>Commented on: {comment.recipe.title}</small>
                </li>
              ))
            ) : (
              <p>No comments found</p>
            )}
          </ul>

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;