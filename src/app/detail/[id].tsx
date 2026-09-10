import { useLocalSearchParams } from "expo-router";
import { IRecipe } from "@/types/recipes.types";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { fetchRecipesDetails } from "@/services/recipe.services";
import Ionicons from "@expo/vector-icons/Ionicons"; 

import { View,Image,ScrollView, Pressable,Text } from "react-native";
import { AntDesign } from "@react-native-vector-icons/ant-design";
import { SimpleLineIcons } from "@react-native-vector-icons/simple-line-icons";
const DetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{id:string}>();
  const [recipeDetails,setRecipeDetails] = useState<IRecipe>();

const handleFetchRecipeDetails = async () => {
  if (!id) return;

  try {
    const response = await fetchRecipesDetails(id);
    console.log("Respuesta de la API:", response);

    // En lugar de hacer setRecipeDetails(response.recipe_detail[0]) directamente,
    // verificamos con encadenamiento opcional que la propiedad y el array existan:
    if (response?.recipeDetail?.[0]) {
      setRecipeDetails(response.recipeDetail[0]);
    } else {
      console.warn("La respuesta de la API no contiene 'recipeDetail':", response);
    }
  } catch (error) {
    console.error("Error al obtener la receta:", error);
  }
};

  useEffect(() => {
    handleFetchRecipeDetails();
  }, []);
   if(!recipeDetails){
    return null;
   }

return <SafeAreaView className="h-full bg-vista-white"edges={["bottom"]}>
<ScrollView showsVerticalScrollIndicator={false}>
  <View className="relative">
   <Image source={{uri: recipeDetails.thumbnail}}
   className="h-132 w-full"
   alt="detail-image"
   />
   <Pressable className="absolute top-20 left-6" onPress={() => router.back()}>
   <Ionicons name="chevron-back" size={24} color="white" />
   </Pressable>
  </View>
  <View className="p-4">
    <Text className="font-bold text-[1.75rem]">{recipeDetails.name}</Text>
    <Text className="text-gray-600">{recipeDetails.shortDescription}</Text>
  
  <View className="mt-8 flex-row items-center gap-2">
    <View
   className="px-4 py-3 items-center justify-center flex-row gap-2 bg-white
   border-ebb">
      <Text className="text-orange-400">⭐</Text >
      <Text className="font-bold text-kabul">{recipeDetails.rating} </Text>
    </View>

  <View
   className="px-4 py-3 items-center justify-center flex-row gap-2 bg-white
   border-ebb">
      <AntDesign name="field-time" size={16} color="black"/>
      <Text className="font-bold text-kabul">{recipeDetails.prepTimeMinutes} min</Text>
    </View>

  <View
   className="px-4 py-3 items-center justify-center flex-row gap-2 bg-white
   border-ebb">
      <SimpleLineIcons name="energy" size={16} color="black"/>
      <Text className="font-bold text-kabul">{recipeDetails.calorie} cal</Text>
    </View>

  </View>
  
  <View className="mt-8">
  <Text className="text-xl font-semibold text-cod-gray">Ingredientes</Text>
   <View className="border-b border-ebb mt-4">
   </View>
   <View className="gap-4 mt-8">
    {recipeDetails.ingredients.map((item) => {
      return(
        <View key={item} className="flex-row gap-2 items-center">
          <View className="h-8 w-8 rounded-lg border-[1.5px]
          border-kabul"
          ></View>
          <Text >{item}</Text>
        </View>
      );
    })}
    </View>
  </View>
  

  <View className="p-4 bg-white border-ebb border rounded-2x1 mt-8">
<Text className="font-semibold text-cod-gray text-xl">Nutrition per serving</Text>
<View className="flex-row gap-4 mt-4 items-center justify-center">
  
<View
  className="felx-1 mx-1 items-center justify-center rounded-2x1
  bg-white p-4 shadow"
  >
    <Text className="text-kabul text-sm font-medium">Fats</Text>
    <Text className="mt-1 text-xl font-bold text-cod-gray">
      ${recipeDetails.protein}g</Text>
  </View>

  <View
  className="felx-1 mx-1 items-center justify-center rounded-2x1
  bg-white p-4 shadow"
  >
    <Text className="text-kabul text-sm font-medium">Fats</Text>
    <Text className="mt-1 text-xl font-bold text-cod-gray">
      ${recipeDetails.carbs}g</Text>
  </View>

  <View
  className="felx-1 mx-1 items-center justify-center rounded-2x1
  bg-white p-4 shadow"
  >
    <Text className="text-kabul text-sm font-medium">Fats</Text>
    <Text className="mt-1 text-xl font-bold text-cod-gray">
      ${recipeDetails.fats}g</Text>
  </View>


</View>


  </View>
  
  

  </View>

</ScrollView>
</SafeAreaView>
}

export default DetailScreen;