import {fetchImg} from '../api/API';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import './homepage.css';
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
      <div className="homepage-container"></div>
      <div className="image-container">
        {/* Image */}
        <div>
          {imageUrl ? (
            <img src={imageUrl} alt="Random food from Unsplash" className="food-image" />
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