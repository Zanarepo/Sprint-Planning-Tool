import React, { useEffect } from 'react';
import { useFeature } from "@growthbook/growthbook-react";
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { trackGA, trackFB } from '../../tracking'; // import helper

const Homepage = () => {
  const newUI = useFeature("new-ui");

  // Log feature exposure once per user
  useEffect(() => {
    const logExposure = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (!newUI || !userEmail) return;

      const { data } = await supabase
        .from("feature_exposures")
        .select("*")
        .eq("email", userEmail)
        .eq("feature_key", "new-ui")
        .single();

      if (!data) {
        const { error } = await supabase.from("feature_exposures").insert([{
          email: userEmail,
          feature_key: "new-ui",
          variation: newUI.on,
          created_at: new Date().toISOString()
        }]);
        if (error) console.error("Failed to log feature exposure:", error.message);
      }

      const variantLabel = newUI.on ? 'new-ui' : 'old-ui';
      trackGA('ui_variant', {
        event_category: 'Feature Experiment',
        event_label: variantLabel,
        user_email: userEmail
      });
      trackFB('UIVariant', { variant: variantLabel, email: userEmail });
    };

    logExposure();
  }, [newUI]);

  const lessons = [
    { id: 'lesson1', to: '/tpm', icon: '🛠️', title: 'Lesson 1', subtitle: 'Databases & APIs' },
    { id: 'lesson2', to: '/dashboard2', icon: '📈', title: 'Lesson 2', subtitle: 'Agile & Cost Mgmt' },
    { id: 'lesson3', to: '/dashboard', icon: '⚡', title: 'Lesson 3', subtitle: 'Modern Technologies' },
    { id: 'lesson4', to: '/Dashboard3', icon: '👥', title: 'Lesson 4', subtitle: 'Product Analytics' },
    { id: 'lesson5', to: '/Dashboard4', icon: '📚', title: 'Lesson 5', subtitle: 'PM Essentials' },
  ];

  const handleLessonClick = async (lessonId) => {
    const userEmail = localStorage.getItem("userEmail");
    const variantLabel = newUI.on ? 'new-ui' : 'old-ui';

    trackGA('lesson_click', { lesson_id: lessonId, ui_variant: variantLabel, user_email: userEmail });
    trackFB('LessonClick', { lesson_id: lessonId, variant: variantLabel, email: userEmail });

    await supabase.from("ui_metrics").insert([{
      email: userEmail,
      ui_variant: variantLabel,
      action: 'lesson_click',
      lesson_id: lessonId,
      created_at: new Date().toISOString()
    }]);
  };

  return (
    <div className="w-full min-h-screen font-sans pt-24">
      {newUI.on ? (
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 min-h-screen p-8">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-purple-800 mb-4">🚀 TPM Hub - NEW EXPERIENCE</h1>
            <p className="text-xl text-purple-600">Bright, modern layout with interactive lessons!</p>
          </header>
          <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {lessons.map(lesson => (
              <Link
                key={lesson.id}
                to={lesson.to}
                onClick={() => handleLessonClick(lesson.id)}
                className="bg-purple-100 hover:bg-purple-200 transition p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center transform hover:scale-105"
              >
                <span className="text-6xl mb-4">{lesson.icon}</span>
                <h2 className="text-2xl font-bold text-purple-900">{lesson.title}</h2>
                <p className="text-purple-700 mt-2">{lesson.subtitle}</p>
              </Link>
            ))}
          </section>
        </div>
      ) : (
        <div className="bg-gray-50 min-h-screen p-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-gray-800">🏛️ TPM Hub - Classic UI</h1>
            <p className="text-gray-600 mt-2">Structured, timeless layout for Product Managers.</p>
          </header>
          <section className="space-y-6 mb-12">
            {lessons.map(lesson => (
              <Link
                key={lesson.id}
                to={lesson.to}
                onClick={() => handleLessonClick(lesson.id)}
                className="bg-white border border-gray-300 p-6 rounded-lg shadow hover:shadow-md flex items-center space-x-4"
              >
                <span className="text-4xl">{lesson.icon}</span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{lesson.title}</h2>
                  <p className="text-gray-600">{lesson.subtitle}</p>
                </div>
              </Link>
            ))}
          </section>
        </div>
      )}
    </div>
  );
};

export default Homepage;
