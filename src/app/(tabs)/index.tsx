
import { IRecipe } from '@/types/recipes.types';
import { View, Text ,ScrollView,Image, Pressable} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from 'react';
import { fetchAllRecipes } from '@/services/recipe.services';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign} from "@react-native-vector-icons/ant-design";
import { router } from 'expo-router';
import RecipeCard from '@/components/RecipeCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const HomeScreen = () => {

    const [allRecipes,setAllRecipes] = useState<IRecipe[]>([]);

    const handleGetAllRecipes = async () =>{
    const response = await fetchAllRecipes();
    setAllRecipes(response?.allRecipes || []);
    };
    const handleNavigation = (id:String)=>{

        router.push(`/detail/${id}`);

    }
    useEffect(()=>{
        handleGetAllRecipes();
    },[]);

    if (allRecipes.length === 0){
        return null;
    }

   

    return (
    <SafeAreaView className="h-full p-4 bg-vista-white" edges={["top"]}>
        <View className="p-4">
            <ScrollView showsVerticalScrollIndicator={false}> 
            <View className="relative">
             <Image source={{uri:allRecipes[0].thumbnail}}
              className="w-full h-75 rounded-lh"/>
              <View className="h-full opacity-20 rounded-lg w-full
              bg-black absolute"></View>
              <LinearGradient
              colors={["transparent","rgba(0,0,0,0.85)"]}
              start={{x:0,y:0}}
              end={{x:0,y:1}}
              style={{
                position:"absolute",    
                top:0,
                left:0,
                right:0,
                bottom:0,
                borderRadius:8,
              }}           
              />
              <View className="absolute top-[3.8rem] left-4">
                <View className="flex flex-row gap-2">
                    <View
                    className="flex flex-row gap-1 items-center
                    bg-ebb py-1 px-3 rounded-full">
                        <AntDesign name="field-time" size={16} color="black"/>
                        <Text
                        className="text-cod-gray text-[12px]
                        font-medium" 
                        >
                            {allRecipes[0].prepTimeMinutes} min
                        </Text>
                    </View>


                    <View
                    className="flex flex-row gap-1 items-center
                    bg-ebb py-1 px-3 rounded-full">
                    <Text className="text-burning-orange">*</Text>
                        <Text
                        className="text-cod-gray text-[0.75rem] font-medium">
                            {allRecipes[0].rating} 
                        </Text>
                    </View>

                </View>
                <Text className="text-white text-[1.75rem]
                font-bold mt-3"> {allRecipes[0].name}</Text>

                <Text className="text-white text-base mt-3">{allRecipes[0].shortDescription}
                     </Text>

               <Pressable
               onPress={()=> handleNavigation(String(allRecipes[0].id))}
               className="self-start mt-3 bg-burning-orange rounded-lg px-4 py-2">
                <Text
                className="text-white text-[0.875rem]
                font-semibiold">
                    ViewRecipe
                </Text>
                </Pressable>

              </View>
           </View>
           
           <View className="mt-8">
            <Text 
            className="text-cod-gray
            font-semibold text-[1.25rem]">
                TrendingNow
            </Text>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                gap:18
            }}>
                     {allRecipes?.map((recipe) =>{
                        return <RecipeCard key={recipe.id} recipe={recipe}/>
                     })}
            </ScrollView>
           </View>

           <View className="mt-8 pb-24">
            <Text
            className="text-cod-gray font-semibold text-[1.25]">
                All Recipes
            </Text>
            {allRecipes?.map((recipe)=>{
                return(
                    <Pressable
                    key={recipe.id}
                    onPress={()=> handleNavigation(String(recipe.id))}
                    className="flex flex-row items-center
                    gap-4 mt-4 border-cavern-pink bg-white
                    rounded-2xl">
                    <Image source={{uri: recipe.thumbnail}}
                    className="h-24 w-24 rounded-lg"/>
                 <View className="flex">
                 <Text className="text-cod-gray
                 text-lg font-medium">{recipe.name}</Text> 
                 <Text className="text-kabul" >
                    {recipe.shortDescription.length>30 
                    ? recipe.shortDescription.slice(0.30) + "..." : recipe.shortDescription}
                 </Text>


                  <View className="flex flex-row gap-3 mt-2">
                   <View
                   className="flex flex-row gap-1">
                            <AntDesign name="field-time" size={16} color="black"/>
                    <Text
                    className="font-medium text-sm text-kabul">
                        {recipe.prepTimeMinutes}m
                    </Text>
                   </View>
                                      <View
                   className="flex flex-row gap-1">
<MaterialIcons name="food-bank" size={16} color="black" />
                    <Text
                    className="font-medium text-sm text-kabul">
                        {recipe.servings}m
                    </Text>
                   </View>
                                      <View
                   className="flex flex-row gap-1">
                    <Text
                    className="font-medium text-sm text-kabul">
                        {recipe.rating}m
                    </Text>
                   </View>
                  </View>





                 </View>
                    </Pressable>
                )
            })}
           </View>

            </ScrollView>
        </View>
    </SafeAreaView>
    );
}
export default HomeScreen;