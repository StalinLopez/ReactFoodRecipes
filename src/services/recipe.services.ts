import { IAddToFavourite } from "@/types/recipes.types";
import { convertKeysToCamelCase } from "@/utils/app.utils";
import { BASE_URL } from "@/utils/constants";

const fetchAllRecipes = async () => {
    try{
        const url = `${BASE_URL}/all-recipes`;
        const response = await fetch(url);
        const data = await response.json();
        const parsedRecipes = convertKeysToCamelCase(data);

        return parsedRecipes;
        
    }catch (error){
        console.log("Error while fetching all recipes",error);
    }
};
const fetchAddToFavourites = async(requestPayload:IAddToFavourite) =>{

    try{
const url=`${BASE_URL}/add-to-favourites`;
    const {userId,recipeId,title,image,cookTime,servings,description}=requestPayload || {};

        const payload = {
            userId,recipeId,title,image,cookTime,servings,description      
        };
        const response = await fetch(url,{
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(payload),
        });

        const data=await response.json();
        return data; 
    }catch(error){
        console.log("Error while adding to favourites")
    }
    

};

const fetchUserFavouritesRecipes = async(userId: String) =>{
    try{
const url=`${BASE_URL}/favourites/${userId}`;
const response = await fetch(url);
const data = response.json();
const parseData = await convertKeysToCamelCase(data);
return parseData;
    }catch(error){
    console.log("error while fetching save reciper",error);
    }
};


const fetchRecipesDetails = async(recipeId: String) =>{
    try{
const url=`${BASE_URL}/details/${recipeId}`;
const response = await fetch(url);
const data = response.json();
const parseData = await convertKeysToCamelCase(data);
return parseData;
    }catch(error){
    console.log("error while fetching recipe details",error);
    }
};
export {fetchAllRecipes,fetchAddToFavourites,fetchUserFavouritesRecipes,fetchRecipesDetails};