// src/growthbook.js
import { GrowthBook } from "@growthbook/growthbook";
import { autoAttributesPlugin } from "@growthbook/growthbook/plugins";

const growthbook = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: "sdk-qOMORJsrs8Ah68f",
  enableDevMode: true,
  environment: process.env.REACT_APP_GB_ENV || "dev", // dev or prod
  trackingCallback: (experiment, result) => {
    console.log("Viewed Experiment", {
      experimentId: experiment.key,
      variationId: result.key,
    });
  },
  plugins: [autoAttributesPlugin()],
});

// ✅ Set user ID for SAMPLE by ID
const userEmail = localStorage.getItem("userEmail");
if (userEmail) {
  growthbook.setAttributes({
    id: userEmail, // GrowthBook will hash this ID for deterministic rollout
    email: userEmail, // optional, for analytics/logging
  });
}

export { growthbook };
