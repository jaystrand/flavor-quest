import axios from 'axios';

const apiKey = 'e505245deca64cb38494658cc624bec5'

const fetchRecipes = async (ingredients: string) => {
  try {
    // API request to fetch recipes by ingredients
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/findByIngredients',
      {
        params: {
          ingredients,
          number: 25,
          ignorePantry: true,
          apiKey: apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    // log error to console
    console.error(error);
  }
};


// uncomment this function if we include a way to fetch recipe by ID

// const fetchRecipeById = async (recipeId: string) => {
//   try {
//     // API request to fetch recipe by recipe ID
//     const response = await axios.get(
//       `https://api.spoonacular.com/recipes/${recipeId}/information`,
//       {
//         params: {
//           includeNutrition: false,
//           apiKey: apiKey,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {    
//     // log error to console
//     console.error(error);

//   }
// };

export { fetchRecipes };
// export { fetchRecipeById };