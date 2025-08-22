import React from 'react';
import Stage2ActivationSimulation  from './Stage2ActivationSimulation'; // Assuming this is a component you have
import { FaRocket, FaUserCheck, FaClock, FaExclamationTriangle, FaMagic,  FaInstagram, FaDumbbell } from 'react-icons/fa';

const Stage2Activation = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
          <FaRocket className="mr-2 text-blue-500" /> Stage 2: Activation
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Turn new users into engaged users by guiding them toward their first meaningful action.
        </p>
      </header>

      {/* Goal */}
      <section className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaUserCheck className="mr-2 text-green-500" /> Goal
        </h2>
        <p className="mt-2 text-gray-700">
          Convert new users into engaged users by encouraging them to complete a key action (e.g., sign up, complete onboarding).
        </p>
      </section>

      {/* Key Metrics */}
      <section className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaClock className="mr-2 text-indigo-500" /> Key Metrics
        </h2>
        <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
          <li>
            <strong>Time-to-first-value:</strong> E.g., signing up or completing onboarding.
          </li>
          <li>
            <strong>Activation rate:</strong> The percentage of users who complete the key action.
          </li>
        </ul>
      </section>

      {/* Common Bottlenecks */}
      <section className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaExclamationTriangle className="mr-2 text-red-500" /> Common Bottlenecks
        </h2>
        <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
          <li>Complicated sign-up process.</li>
          <li>Lack of clear onboarding guidance.</li>
          <li>Overwhelming UI/UX.</li>
        </ul>
      </section>

      {/* Optimization Strategies */}
      <section className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaMagic className="mr-2 text-purple-500" /> Optimization Strategies
        </h2>
        <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
          <li>
            <strong>Simplify onboarding:</strong> Use step-by-step guides like Slack’s approach.
          </li>
          <li>
            <strong>Use progressive profiling:</strong> Ask for minimal info upfront.
          </li>
          <li>
            <strong>Gamify early actions:</strong> Introduce elements like Duolingo’s streaks.
          </li>
        </ul>
      </section>

      {/* Case Study */}
      <section className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaInstagram className="mr-2 text-pink-500" /> Case Study
        </h2>
        <p className="mt-2 text-gray-700">
          Instagram reduced activation friction by auto-following suggested accounts during signup.
        </p>
      </section>

      {/* Exercise */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <FaDumbbell className="mr-2 text-yellow-500" /> Exercise
        </h2>
        <p className="mt-2 text-gray-700">
          Design a 3-step onboarding flow for a fitness app. Consider the following:
        </p>
        <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
          <li>Step 1: Introduce the app with a warm welcome and brief benefits.</li>
          <li>Step 2: Simplify sign-up by requesting minimal initial information.</li>
          <li>Step 3: Guide the user through key actions using visual cues and progress indicators.</li>
        </ul>
      </section>
      <Stage2ActivationSimulation /> <br/>
    </div>
  );
};

export default Stage2Activation;
