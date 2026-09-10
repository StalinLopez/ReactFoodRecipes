export {useAuth} from "@clerk/expo";
import { useAuth } from "@clerk/expo";
import {Redirect,Stack} from "expo-router";

export default function RootLayout() {
    const {isSignedIn,isLoaded} = useAuth();
    
    if(!isLoaded) {
    return null;
    }

    if(isSignedIn) {
<<<<<<< HEAD
            return <Redirect href="/(tabs)" />
=======
            return <Redirect href="/" />
>>>>>>> 721f65e7a537f1b203fe85ddd676e797804497e2
    }

    return <Stack screenOptions={{headerShown:false}} />;
}
