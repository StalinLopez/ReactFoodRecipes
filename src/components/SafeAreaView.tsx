import {
  SafeAreaView as RNSafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

export function SafeAreaView(props: SafeAreaViewProps) {
  return <RNSafeAreaView {...props} />;
}