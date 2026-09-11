import { UserProfileView } from "@clerk/expo/native";

export default function ProfileScreen() {
  return (
    <UserProfileView
      isDismissible={false}
      style={{ flex: 1 }}
    />
  );
}