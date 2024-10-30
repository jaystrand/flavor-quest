import { fetchImg } from '../api/API';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import '../styles/homepage.css'
const homepage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate(); //  hook to navigate b/w pages
  useEffect(() => {
    const getImage = async () => {
      const imgData = await fetchImg();
      console.log(imgData);
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
    <div className="homepage-container" >
    
     
      <h1>Welcome to Flavor Quest</h1>
      <div className="homepage-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '50px' }}>
        {/* Image */}
        <div>
          {imageUrl ? (
            <img className="homepage-image" src={imageUrl} alt="Random food from Unsplash" style={{ maxWidth: '400px', height: 'auto' ,borderRadius: '10px'}} />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      <div className="login-signup-box" style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Login />
        <br />
        <button onClick={handleRegister}>Sign Up</button><label> Sign Up if not a member</label> {/* Add Register Button */}
      </div>
      </div>
    </div>
  );
  };
  
  export default homepage;