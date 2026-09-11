
import {View ,Text, Alert, ActivityIndicator, ScrollView, Pressable,Image} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { IAddToFavourite, IRecipe } from "@/types/recipes.types";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useUser } from "@clerk/expo";
import { fetchDeleteFavourites, fetchUserFavouritesRecipes } from "@/services/recipe.services";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const FavouritesScreen = () => {
    const router = useRouter();
    const [favouritesList, setFavouritesList] = useState<IAddToFavourite[] >([]);
    const {user} = useUser();
     
    const handleFetchFavouritesRecipes = async () => {
        if(!user){
return null;
        }
    
    
 const data = await fetchUserFavouritesRecipes(user.id);
 setFavouritesList(data||[]);
};

const handleDeleteFavourites = async (id: number  ) => {
    if(!user){
        return null;
    }

   try{
   await fetchDeleteFavourites(user.id,id);
   }catch (error) {
    Alert.alert("Error while deleting favourite recipe");
   }
};

const handleNavigation = (id: string) => {
    router.push(`/detail/${id}`);
};

useFocusEffect(
  useCallback(() => {
    handleFetchFavouritesRecipes();
  }, [])
);

  if(favouritesList.length === 0){
    return <ActivityIndicator />
  }
    return (
        <SafeAreaView className="h-full p-4 bg-vista-white" edges={["top"]}>
  <ScrollView showsVerticalScrollIndicator={false}>
    <Text className="text-[2rem] font-bold">Favourites</Text>
    <Text className="mt-2 text-kabul">
      {favouritesList.length} Recipes saved for your next culinary
      adventure.
    </Text>

    <View className="mt-8 flex gap-8 pb-24">
      {favouritesList.map((recipe, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => handleNavigation(String(recipe.recipeId))}
            className="relative rounded-xl bg-white shadow overflow-hidden"
          >
            <Image source={{uri: recipe.image}} 
            className="w-full h-108" 
            />
          
          <View 
  className="absolute top-4 right-4 bg-white opacity-80 rounded-full p-3"
>
  <AntDesign name="heart" size={24} color="#970000bf" />
</View>
<Pressable
  onPress={() => handleDeleteFavourites(recipe.recipeId || 0)}
  className="absolute top-20 right-4 bg-white opacity-80 rounded-full p-3"
>
  <MaterialIcons
    name="delete-outline"
    size={22}
    className="text-kabul"
  />
</Pressable>
<View className="p-4">
  <Text className="font-semibold text-xl">{recipe.title}</Text>
  <Text className="mt-2 text-kabul">{recipe.description}</Text>
</View>

          </Pressable>
        );
      })}
    </View>
  </ScrollView>
</SafeAreaView>
    );
};

export default FavouritesScreen