const mongoRecipes = require('mongoose'); 

const RecipesSchema = mongoRecipes.Schema({
  headline:{
    type:String,
    required: true
  },
  mealType:{
    type: String,
    required:true
  }, 
  shortDescription:{
    type: String,
    required: true
  }, 
  thumbnail:{
    type: String,
    required: true
  }, 
  numOfPeople:{
    type: String,
    required: true
  }, 
  images:{
    type: Array,
    required:false
  }, 
  ingredients:{
    type: Array,
    required:true
  }, 
  recipe:{
    type:String,
    required: true
  }
})

module.exports = mongoRecipes.model('Recipes', RecipesSchema)