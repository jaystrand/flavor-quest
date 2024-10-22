// import React { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
const imgAPIKey = process.env.REACT_APP_UNSPLASH_API_KEY;

const fetchRecipes = async (ingredients: string) => {
  try {
    // API request to fetch recipes by ingredients
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/findByIngredients',
      {
        params: {
          ingredients,
          number: 25,
          instructionsRequired: true,
          ignorePantry: true,
          apiKey: apiKey,
        },
      }
    );
    // return recipe data
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // log error to console
    console.error(error);
  }
};


// uncomment this function if we include a way to fetch recipe by ID

const fetchRecipeById = async (recipeId: string) => {
  try {
    // API request to fetch recipe by recipe ID
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          includeNutrition: false,
          apiKey: apiKey,
        },
      }
    );
    // return recipe data
    // console.log(response.data);
    return response.data;
  } catch (error) {    
    // log error to console
    console.error(error);
  }
};

imgAPIKey

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
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null; // return null if error in handling
  }
};

export { fetchRecipes , fetchRecipeById , fetchImg };