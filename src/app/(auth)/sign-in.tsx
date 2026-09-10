import useSocialAuth from "@/hooks/useSocialAuth";
import {Text,View,Image, Pressable} from "react-native";

const SignInScreen = () => {

    const {handleSocialAuth}=useSocialAuth()
    return (
        <View>
            <Image source={require("@/assets/images/hero.png")} className="w-full " />
            <View
            className="mt-12 hfull bg-white
            rounded-tr-[2.375rem] rounded-tl-[2.375rem] p-8 mb-16">
                <View className="flex gap-2 items-center">
                    <Text 
                    className="text-center text-cod-gray text-4xl
                    font-bold">Welcome Back</Text>
                    <Text className="text-base text-kabul text-center">Sign in to your account</Text>
                </View>
<View className="mt-6 gap-4 flex items-center">
    <Pressable
    onPress={()=> handleSocialAuth("oauth_google")}
    className="cursor-ponter flex items-center justify-center flex-row
    gap-4 w-full border border-ebb py-4 rounded-full">
        <Image
        source={require("@/assets/images/google.png")}
        className="w-5 h-5"
        />
        <Text
        className="text-base font-semibold"
        >continue with Google</Text>
    </Pressable>
        <Pressable
            onPress={()=> handleSocialAuth("oauth_apple")}
    className="bg-black cursor-ponter flex items-center justify-center flex-row
    gap-4 w-full border border-ebb py-4 rounded-full">
        <Image
        source={require("@/assets/images/google.png")}
        className="w-5 h-5"
        />
        <Text
        className="text-base font-semibold text-white"
        >continue with Google</Text>
    </Pressable>
    <Text className="w-[80%] text-center mt-9 text-kabul font-medium ">
       by continuin, agree to our 
    </Text  >
    </View>
            </View>
        </View>
    );
}

export default SignInScreen;