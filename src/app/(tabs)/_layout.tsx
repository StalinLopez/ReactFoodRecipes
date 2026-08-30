import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useAuth } from "@clerk/expo";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <NativeTabs tintColor="#AB3500">

      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>
          Home
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          md={{
            default: "home",
            selected: "home_filled",
          }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label>
          Search
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          md={{
            default: "search",
            selected: "search",
          }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="favourites">
        <NativeTabs.Trigger.Label>
          Favourites
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          md={{
            default: "favorite",
            selected: "favorite",
          }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>
          Profile
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          md={{
            default: "person",
            selected: "person",
          }}
        />
      </NativeTabs.Trigger>

    </NativeTabs>
  );
}