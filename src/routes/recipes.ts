const recipes = require('express');
const recipesRouter = recipes.Router()
const Recipes = require('../../models/Recipes');

recipesRouter.get('/', async (req:any, res:any) => {
  try {
    const recipes = await Recipes.find();
    res.send(recipes)
  } catch (error) {
    console.log(error);
  } 
})

recipesRouter.get('/:recipeId', async (req:any, res:any) => {
  res.header("Acces-Control-Allow-Origin", '*')
  try {
    const recipe = await Recipes.find({_id: req.params.recipeId});
    res.send(recipe)
  } catch (error) {
    console.log(error)
  }
})

recipesRouter.post('/', async (req:any, res:any) => {
  res.header("Access-Control-Allow-Origin", "*")
  const recipe = new Recipes({
    headline: req.body.headline,
    mealType: req.body.mealType, 
    shortDescription: req.body.shortDescription,
    thumbnail: req.body.thumbnail, 
    numOfPeople: req.body.numOfPeople, 
    images: req.body.images, 
    ingredients: req.body.ingredients,
    recipe: req.body.recipe
  })

  try {
    const newRecipe = await recipe.save(recipe);
    res.send(newRecipe);
  } catch (error) {
    console.log(error);
  }
})

recipesRouter.patch('/', async (req:any, res:any) => {
  res.header("Access-Control-Allow-Origin", "*")
  const recipe = req.body.recipe;

  try {
    const updatedRecipe = await Recipes.updateOne({_id: recipe._id}, {$set: {
      headline: recipe.headline,
      mealType: recipe.mealType, 
      shortDescription: recipe.shortDescription,
      thumbnail: recipe.thumbnail, 
      numOfPeople: recipe.numOfPeople, 
      images: recipe.images, 
      ingredients: recipe.ingredients,
      recipe: recipe.recipe
    }}) 
  } catch (error) {
    
  }
})

recipesRouter.delete('/:id', async (req:any, res:any) => {
  res.header("Access-Control-Allow-Origin", "*")
  console.log('delete')
  try {
    const recipeToBeDeleted:any = await  Recipes.deleteOne({_id: req.params.id})
    res.send(recipeToBeDeleted);
  } catch (error) {
    console.log(error)
  }
})

module.exports = recipesRouter;