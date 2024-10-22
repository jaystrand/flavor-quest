import {fetchImg} from '../api/API';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
const homepage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate(); //  hook to navigate b/w pages
  useEffect(() => {
    const getImage = async () => {
      const imgData = await fetchImg();
      if (imgData) {
        setImageUrl(imgData.urls?.regular);
      }
    };
    getImage();
  }, []);
  const handleRegister = () => {
    navigate('/register'); // Navigate to the registration page
  };
  return (
    <div>
     <button onClick={handleRegister}>Register</button> {/* Add Register Button */}
      <h1>Welcome to Flavor Quest</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Image */}
        <div>
          {imageUrl ? (
            <img src={imageUrl} alt="Random food from Unsplash" style={{ maxWidth: '400px', height: 'auto' }} />
          ) : (
            <p>Loading image...</p>
          )}
        </div>

        <Login />
      </div>
    </div>
  );
  };
  
  export default homepage;