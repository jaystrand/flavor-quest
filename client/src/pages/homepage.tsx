import {fetchImg} from '../api/API';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
// import './homepage.css';
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
    
     
      <h1>Welcome to Flavor Quest</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '50px' }}>
        {/* Image */}
        <div>
          {imageUrl ? (
            <img src={imageUrl} alt="Random food from Unsplash" style={{ maxWidth: '400px', height: 'auto' ,borderRadius: '10px'}} />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Login />
        <br />
        <button onClick={handleRegister}>Register</button> {/* Add Register Button */}
      </div>
      </div>
    </div>
  );
  };
  
  export default homepage;