import {fetchImg} from '../api/API';
import { useState, useEffect } from 'react';
const homepage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    const getImage = async () => {
      const imgData = await fetchImg();
      if (imgData) {
        setImageUrl(imgData.urls?.regular);
      }
    };
    getImage();
  }, []);
  return (
    <div>
      <h1>Welcome to Flavor Quest</h1>
      {imageUrl ? (
        <img src={imageUrl} alt="Random food from Unsplash" style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
  };
  
  export default homepage;