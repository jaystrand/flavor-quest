import React { useState, useEffect } from 'react';
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

const imgAPIKey = 't7HfNWxFA-sV6n2WAAQFBEKzNHmNHg0oCCOVY-siuBw'

const fetchImg = async () => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        query: 'food',
      },
      headers: {
        Authorization: `Client-ID ${imgAPIKey}`,
      },
    });
    // return image data
    return response.data;
  } catch (error) {
    console.error(error);
    return null; // return null if error in handling
  }
};

export { fetchRecipes , fetchImg };