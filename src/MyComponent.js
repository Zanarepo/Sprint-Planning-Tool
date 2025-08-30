// src/MyComponent.js
import React from "react";
import { useFeature } from "@growthbook/growthbook-react";

export default function MyComponent() {
  // 👇 This feature key must match the one you created in GrowthBook dashboard
  const newUI = useFeature("new-ui");

  return (
    <div>
      {newUI.on ? (
        <h1>✨ New UI Enabled!</h1>
      ) : (
        <h1>Old UI</h1>
      )}
    </div>
  );
}

