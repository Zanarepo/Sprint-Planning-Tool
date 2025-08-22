import React from 'react';

const SampleSizeExplainer = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">Understanding Sample Size for A/B Tests</h1>
        <p className="mt-2 text-lg">Learn why picking the right number of users is super important!</p>
      </header>
      <div className="w-full mx-4 p-6 bg-white rounded-lg shadow-md my-6">
        <h2 className="text-2xl font-bold mb-4">Why Sample Size Matters</h2>
        <p className="mb-6 text-gray-600">
          To make your A/B test work, you need to test the right number of people. Too few, and you might think your new idea is great when it’s just luck. Too many, and you’re waiting forever! The right number, like <strong>6,394 per group</strong>, helps you be sure your new app feature (like a fun progress bar) really makes more people use the app. Let’s learn what goes into picking this number!
        </p>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">What Do These Words Mean?</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>
              <strong>Sample Size per Group</strong>: How many people you need to test in each group (old version vs. new version). Like asking 6,394 kids if they like your new cookie to know it’s better than the old one. A special math formula picks this number based on other settings below!
            </li>
            <li>
              <strong>Baseline Conversion Rate (10%)</strong>: How many people already do something, like use your app daily. If 100 kids try your old cookie and 10 say “Yum!” that’s 10%. It’s your starting point before trying the new feature.
            </li>
            <li>
              <strong>Minimum Detectable Effect (MDE, 15%)</strong>: The smallest improvement you want to notice. If 10 kids like your old cookie, you want 11 or 12 to like the new one (15% better). In the app, it’s how much more you want people to use the new feature.
            </li>
            <li>
              <strong>Significance Level (5%)</strong>: How sure you want to be that your new feature works. A 5% level means you’re 95% sure it’s really better, not just luck. It’s like being super sure your new cookie is a hit!
            </li>
            <li>
              <strong>Statistical Power (80%)</strong>: Your chance of spotting the improvement if it’s real. With 80% power, you have an 80% chance of noticing if more people use the app with the new feature.
            </li>
            <li>
              <strong>Contamination (0%)</strong>: This means your test is clean—no mix-ups! Like making sure kids only taste one cookie and give honest answers, so your app test isn’t messed up by mistakes.
            </li>
          </ul>
        </div>

        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">How Do We Pick 6,394?</h3>
          <p className="text-gray-600">
            The number <strong>6,394</strong> comes from a magic math formula that looks at:
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>How many people already use the app (10% baseline).</li>
            <li>How big a change you want to see (15% more users).</li>
            <li>How sure you want to be (95% sure, or 5% significance).</li>
            <li>Your chance of catching the change (80% power).</li>
            <li>No mix-ups in the data (0% contamination).</li>
          </ul>
          <p className="text-gray-600 mt-2">
            The formula says you need 6,394 people in each group (old app and new app) to be sure your new feature works. If you want to be super sure or look for a tiny change, you need more people. If your app doesn’t have many users, you might need a bigger change or more time to test!
          </p>
        </div>

        <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Tips for Your A/B Test</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>
              <strong>Check Your Traffic</strong>: Make sure your app has enough users (like 6,394 × 2 = 12,788 total) to run the test. If not, try a bigger change (higher MDE) to need fewer people.
            </li>
            <li>
              <strong>Use a Calculator</strong>: Tools like Optimizely or Evan Miller’s Sample Size Calculator can find the right number for you based on your settings.
            </li>
            <li>
              <strong>Balance Speed and Sureness</strong>: A smaller sample size is faster but might miss small changes. A bigger sample size takes longer but makes you more confident.
            </li>
            <li>
              <strong>Keep Data Clean</strong>: Avoid mix-ups (contamination) by making sure users only see one version of your app.
            </li>
          </ul>
        </div>

        <div className="text-center">
          <a
            href="https://www.evanmiller.org/ab-testing/sample-size.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Try a Sample Size Calculator
          </a>
        </div>
      </div>
    </div>
  );
};

export default SampleSizeExplainer;