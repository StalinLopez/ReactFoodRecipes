import "dotenv/config";
import express from "express";
import { and, eq } from "drizzle-orm";
import { db } from "./db/client.js";
import { favouritesTable, recipesTable } from "./db/schema.js";
import { error } from "node:console";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/api/health", (req,res) => {
    return res.status(200).json({success:true});
});

// all-recipes -fectch all the recipes
app.get("/api/all-recipes",async (req,res)=>{
    try{
        const allRecipes = await db.select().from(recipesTable);
        return res.status(200).json({allRecipes:allRecipes})
    }catch (error){
        console.log("Erros While fetching recipes",error);
        return res.status(500).json({error:"Something went wrong"});
    }
});
// Favorites
//add-to-favorites -Post, it will add the recipes to the favourites table

app.post("/api/add-to-favourites",async(req,res)=>{
try {
    const {userId,recipeId,title,image,cookTime,serving,description}=
    req.body|| {};
   
    if(!userId || !recipeId || !title){
        return res.send(400).json({error:"Missing requeriments"});
    }
const newFavourites = await db.insert(favouritesTable).values({userId,recipeId,title,image,cookTime,serving,description}).returning();

return res.status(200).json(newFavourites[0]);

} catch (error) { 
    console.log("error while adding recipes to favourites", error);
    return res.status(500).json({error:"Something wrong"});
}
});

/// favourites get
app.get("/api/favourites/:userId",async(req,res)=>{
try {
 const {userId} = req.params || {};
 const userFavourites = await db.select()
 .from(favouritesTable)
 .where(eq(favouritesTable.userId,userId));
 
 return res.status(200).json(userFavourites);

} catch (error) { 
    console.log("error while fetching favourites", error);
    return res.status(500).json({error:"Something wrong"});
}
});



// /api/detail/:recipeID -get
app.get("/api/detail/:recipeId",async(req,res)=>{
try {
const{recipeId} =req.params || {};

const recipe = await db
.select()
.from(recipesTable)
.where(eq(recipesTable.id,Number(recipeId)));

return res.status(200).json({recipe_detail:recipe});
} catch (error) { 
    console.log("error while fetching recipe details", error);
    return res.status(500).json({error:"Something wrong"});
}
});

// /api/delete-favourites/:userId/:recipeId - DELETE
app.delete("/api/delete-favourites/:userId/:recipeId",async(req,res)=>{
try {
const {userId,recipeId } =req.params || {};

await db.delete(favouritesTable).where(and(
        eq(favouritesTable.userId,userId),
        eq(favouritesTable.recipeId, recipeId),
    ),
);

return res.status(200).json({success:true, message:"Favourites delete success"});


} catch (error) { 
    console.log("error while fetching recipe details", error);
    return res.status(500).json({error:"Something wrong"});
}
});


app.listen(PORT,()=>{
    console.log("server is running", PORT )
})