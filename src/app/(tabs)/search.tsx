
<<<<<<< HEAD
import { fetchAddToFavourites, fetchAllRecipes } from "@/services/recipe.services";
import { IAddToFavourite, IRecipe } from "@/types/recipes.types";
import { useUser } from "@clerk/expo"
import { useEffect, useState } from "react";
import {View ,Text, ScrollView, TextInput} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Feather from "@expo/vector-icons/Feather"
import SearchCardRecipe from "@/components/searchCardRecipe";


const SearchScreen = () => {
    const {user} = useUser();
    const [searchValue,setSearchValue] = useState("");
    const [allRecipes, setAllRecipes] = useState<IRecipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
    
    const handleFetchAllRecipes = async () => {
     const response = await fetchAllRecipes();
     const recipes = response?.allRecipes || [];
        setAllRecipes(recipes);
        setFilteredRecipes(recipes);
        
    }  
     const handleAddToFavourites = async (recipe: IAddToFavourite) => {
     if (!user) return;
     try{
     await fetchAddToFavourites({userId:user.id,...recipe});
     alert("Recipe added to favourites successfully!");
     }catch(error){
console.error("Error adding recipe to favourites", error);
     }
    };
    
useEffect(() => {
const search = searchValue.trim().toLocaleLowerCase();
if(!search){
    setFilteredRecipes(allRecipes);
    return;
}
const filtered = allRecipes.filter((recipe) =>
    recipe.name.toLocaleLowerCase().includes(search),
);
setFilteredRecipes(filtered);
},[searchValue,allRecipes]);




    
useEffect(() => {
    handleFetchAllRecipes();
}, []);



    return (
        <SafeAreaView className="flex-1 bg-vista-white" p-4 edges={["top"]}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        >
           <View className="relative">
                    <TextInput
          className="h-12 rounded-lg bg-global-sand pl-12"
          placeholder="Search recipes..."
          placeholderTextColor="#594139"
          value={searchValue}
            onChangeText={setSearchValue}
        />
        <Feather
        name="search"
        size={22}
        color="#594139"
        style={{position:"absolute",top:8,left:12}}
        />
           </View> 
<View className="mt-4 pb-4">
    {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
            <SearchCardRecipe
            key={recipe.id}
            recipe={recipe}
            onHandleAddToFavourites={handleAddToFavourites}
            />
        ))
    ) : (
<Text className="mt-10 text-center text-base text-kabul">
        No recipes found
    </Text>
    ) }
</View>
        </ScrollView>
=======
import {View ,Text} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SearchScreen = () => {
    return (
        <SafeAreaView>
        <View>
        <Text>SearchScreen</Text>
        </View>
>>>>>>> 721f65e7a537f1b203fe85ddd676e797804497e2
        </SafeAreaView>
    )
}
export default SearchScreen