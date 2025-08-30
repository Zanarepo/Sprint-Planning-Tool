import { useEffect } from "react";
import { supabase } from "./supabaseClient"; // adjust the path if needed

const useFeatureExposureLogger = (feature, featureKey) => {
  useEffect(() => {
    const logFeatureExposure = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (!feature || !userEmail) return;

      // Check if this user already has a record for this feature
      const { data } = await supabase
        .from("feature_exposures")
        .select("*")
        .eq("email", userEmail)
        .eq("feature_key", featureKey)
        .single();

      if (!data) {
        // No record exists → insert it
        await supabase.from("feature_exposures").insert([
          {
            email: userEmail,
            feature_key: featureKey,
            variation: feature.on,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    };

    logFeatureExposure();
  }, [feature, featureKey]);
};

export default useFeatureExposureLogger;
