import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/buttonStyles.css';
import '../styles/recipes.css';

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
//new addition for view recipe
interface Recipe {
  title: string;
  description: string;
}

const Profile = () => {
  // const [profile, setProfile] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<{ username: string, email: string, favorites: Favorite[], comments: Comment[] } | null>(null);
 // States for recipe creation form
 const [showRecipeForm, setShowRecipeForm] = useState(false);
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [ingredients, setIngredients] = useState([{ name: '', quality: '' }]);  // For multiple ingredients
const [type,setType] = useState('');
const [imageUrl, setImageUrl] = useState(''); // Optional image_url field
const [successMessage, setSuccessMessage] = useState('');
const [showMessage, setShowMessage] = useState(false);

const [recipes, setRecipes] = useState<Recipe[]>([]); //-> newly added
const [showRecipes, setShowRecipes] = useState(false); // State to control recipe display

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
          if (response.data) {
            setUser(response.data);
            console.log('user info:', response.data);
            console.log('Favorites:', response.data.Favorites);
            console.log('Comments:', response.data.Comments);
          }
    
          // console.log('Profile data:', response.data); 
          // setUser(response.data);
          // console.log('Full user object:', user);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
        }
    };

    fetchProfile();
  }, [navigate]);

   // Handle form input for ingredients (multiple)
   const handleIngredientChange = (index: number, field: string, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field as keyof typeof ingredients[0]] = value;
    setIngredients(updatedIngredients);
  };
    // Handle recipe creation form submission
    const handleSubmitRecipe = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const token = localStorage.getItem('token'); // Ensure user is logged in
      if (!token) {
        navigate('/');  // Redirect to login if not authenticated
        return;
      }
     const useID = localStorage.getItem('userId')
     console.log("UserId in profile",useID)
      try {
        const response = await axios.post('http://localhost:3001/api/recipes', {
          title,
          description,
          image_url: imageUrl, // Include optional image URL
          type,
          ingredients,
          user_id: useID//user?.user_id
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("Recipe created:", response.data);
        setSuccessMessage('Recipe submitted successfully!')
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
      }, 3000); // Hides message after 3 seconds
        // Reset form after submission
        setTitle('');
        setDescription('');
        setIngredients([{ name: '', quality: '' }]);
        setImageUrl(''); // Clear image URL
        setType('')
        setShowRecipeForm(false);  // Hide the form after submission
      } catch (error) {
        console.error("Error creating recipe:", error);
      }
    };

 // Toggle recipe form visibility
  const handleCreateRecipe = () => {
    setShowRecipeForm(!showRecipeForm);
  };

   // Function to fetch recipes created by the user
   const fetchUserRecipes = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    const useID = localStorage.getItem('userId')
    try {
      const response = await axios.get(`http://localhost:3001/api/recipes/user/${useID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        setRecipes(response.data); // Set the recipes data
        setShowRecipes(true); // Show the recipes when data is fetched
      }
    } catch (error) {
      console.error("Error fetching user recipes:", error);
    }
  };

  // Toggle recipes display
  const handleViewRecipes = () => {
    if (!showRecipes) {
      fetchUserRecipes();
    } else {
      setShowRecipes(false);
    }
  };

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

              {/* Button to show/hide recipe creation form */}
          <button className='button' onClick={handleCreateRecipe}>
            {showRecipeForm ? 'Cancel' : 'Create Recipe'}
          </button>

          {/* Recipe creation form */}
          {showRecipeForm && (
            <div>
              <h2>Create a New Recipe</h2>
              {showMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              <form onSubmit={handleSubmitRecipe}>
                <div>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="image_url">Image URL:</label>
                  <input
                    type="text"
                    id="image_url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="type">Type:</label>
                  <input
                    type="text"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                </div>

                {/* Ingredients fields */}
                <div>
                  <label>Ingredients:</label>
                  {ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        placeholder="Ingredient name"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Quantity"
                        value={ingredient.quality}
                        onChange={(e) => handleIngredientChange(index, 'quality', e.target.value)}
                        required
                      />
                    </div>
                  ))}
                  {/* <button type="button" onClick={addIngredientField}>Add Another Ingredient</button> */}
                </div>

                <button className='button' type="submit">Submit Recipe</button>
              </form>
            </div>
          )}
          <button className='button' onClick={handleLogout}>Logout</button>
            {/* newly added to view recipes */}
            <button className='button' onClick={handleViewRecipes}> 
              {showRecipes ? 'Hide Recipes' : 'View Recipes'}
            </button>
            {showRecipes && (
        <div className="view-recipes-container">
          <h2 className='header' >My Recipes</h2>
          <ul>
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <li key={index} >
                  <h3 className="recipe-title">Recipe {index+1}</h3>
                  <h3  className="recipe-title" >Title : {recipe.title}</h3>
                  <p className="recipe-description" >Description : {recipe.description}</p>
                </li>
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </ul>
        </div>
      )}

        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;