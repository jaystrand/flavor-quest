import { useState } from 'react';

const IngredientForm = () => {
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  interface Recipe {
    name: string;
    description: string;
  }

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...ingredients];
    const fieldName = event.target.name as keyof typeof values[0];
    values[index][fieldName] = event.target.value;
    setIngredients(values);
  };

  const handleAdd = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });
    const data = await response.json();
    setRecipes(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={ingredient.name}
              onChange={(event) => handleChange(index, event)}
              placeholder="Ingredient"
            />
            <input
              type="text"
              name="quantity"
              value={ingredient.quantity}
              onChange={(event) => handleChange(index, event)}
              placeholder="Quantity"
            />
          </div>
        ))}
        <button type="button" onClick={handleAdd}>Add Ingredient</button>
        <button type="submit">Find Recipes</button>
      </form>
      <div>
        {recipes.map((recipe, index) => (
          <div key={index}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientForm;