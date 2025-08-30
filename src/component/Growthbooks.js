import { useEffect } from "react";
import { GrowthBookProvider } from "@growthbook/growthbook-react";

export default function MyApp() {
  useEffect(() => {
    // Load features asynchronously when the app renders
    growthbook.init({ streaming: true });
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <MyComponent/>
    </GrowthBookProvider>
  )
}