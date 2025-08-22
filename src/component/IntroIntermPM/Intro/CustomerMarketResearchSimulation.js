import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CustomerMarketResearchSimulation = () => {
  const [openSections, setOpenSections] = useState({
    overview: true,
    form: false,
    insights: false,
  });
  const [customerType, setCustomerType] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [location, setLocation] = useState('');
  const [flavorPreference, setFlavorPreference] = useState('');
  const [purchaseFrequency, setPurchaseFrequency] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setOpenSections((prev) => ({ ...prev, insights: true, form: false }));
  };

  const handleReset = () => {
    setCustomerType('');
    setAgeGroup('');
    setLocation('');
    setFlavorPreference('');
    setPurchaseFrequency('');
    setPriceRange('');
    setSubmitted(false);
    setOpenSections((prev) => ({ ...prev, insights: false, form: true }));
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Calculate flavor weights for visualization
  const flavors = flavorPreference.split(',').map((f) => f.trim()).filter((f) => f);
  const flavorScores = flavors.map((_, index) => 100 / (index + 1));

  // Generate location strategy
  const getLocationStrategy = () => {
    if (ageGroup.includes('Students')) return `Set up near ${location} (e.g., college campuses, libraries) to target high-traffic student areas.`;
    if (ageGroup.includes('Families')) return `Choose family-friendly spots in ${location} (e.g., parks, community centers) for maximum visibility.`;
    return `Focus on high-traffic areas in ${location} (e.g., downtown, shopping districts) to reach a broad audience.`;
  };

  // Generate marketing tips
  const getMarketingTips = () => {
    if (ageGroup.includes('Students') || ageGroup.includes('Young Adults')) {
      return 'Use social media platforms like Instagram and TikTok to promote your lemonade stand with vibrant visuals and student discounts.';
    }
    if (ageGroup.includes('Families')) {
      return 'Advertise through local community boards and family events to attract families to your stand.';
    }
    return 'Leverage local advertising (e.g., flyers, local radio) to reach a diverse customer base.';
  };

  useEffect(() => {
    toast.info('Start your lemonade stand research!', {
      toastId: 'welcome-simulation',
      theme: 'light',
      style: { background: '#fef3c7', color: '#1f2937' },
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="mb-8 border-b border-yellow-200 flex-1">
        <div className="flex justify-between items-center mx-4 sm:mx-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center text-gray-800">
            <span className="mr-2 text-2xl">🍋</span>
            Customer & Market Research Simulation
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleSection('overview')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.overview}
              aria-controls="overview-section"
            >
              {openSections.overview ? 'Hide' : 'Show'}
            </button>
        
          </div>
        </div>
        <div className={`transition-all duration-500 overflow-hidden ${openSections.overview ? 'max-h-max' : 'max-h-0'}`}>
          <div className="mx-4 sm:mx-6 bg-yellow-50 p-4 sm:p-6 rounded-lg shadow-lg border border-yellow-300 text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Plan your lemonade stand by researching who your customers are, where they buy, and what flavors they love. Input your data to get tailored insights and recommendations!
            </p>
          </div>
        </div>
      </header>

      <section className="mx-4 sm:mx-6 flex-1">
        {/* Form Section */}
        <div>
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
              <span className="mr-2 text-blue-600">🔍</span>
              Let's Research
            </h2>
            <button
              onClick={() => toggleSection('form')}
              className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              aria-expanded={openSections.form}
              aria-controls="form-section"
            >
              {openSections.form ? 'Hide' : 'Show'}
            </button>
          </div>
          <div
  className={`transition-all duration-500 overflow-hidden ${
    openSections.form ? "max-h-max" : "max-h-0"
  }`}
>
  <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300">
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-full"
    >
      <div className="w-full">
        <label className="block text-gray-700 font-medium text-sm sm:text-base">
          Who are your potential customers?
        </label>
        <input
          type="text"
          value={customerType}
          onChange={(e) => setCustomerType(e.target.value)}
          className="w-full border border-yellow-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
          placeholder="e.g., students, office workers, families"
          required
        />
      </div>

      <div className="w-full">
        <label className="block text-gray-700 font-medium text-sm sm:text-base">
          What is their age group?
        </label>
        <select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
          className="w-full border border-yellow-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
          required
        >
          <option value="" disabled>
            Select age group
          </option>
          <option value="Students (18-24)">Students (18-24)</option>
          <option value="Young Adults (25-34)">Young Adults (25-34)</option>
          <option value="Families (35-54)">Families (35-54)</option>
          <option value="Seniors (55+)">Seniors (55+)</option>
        </select>
      </div>

      <div className="w-full">
        <label className="block text-gray-700 font-medium text-sm sm:text-base">
          Where do people buy lemonade?
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-yellow-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
          placeholder="e.g., college campuses, city parks"
          required
        />
      </div>

      <div className="w-full">
        <label className="block text-gray-700 font-medium text-sm sm:text-base">
          What flavors do they like? (comma-separated)
        </label>
        <input
          type="text"
          value={flavorPreference}
          onChange={(e) => setFlavorPreference(e.target.value)}
          className="w-full border border-yellow-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
          placeholder="e.g., classic, strawberry, mint"
          required
        />
      </div>

      <div className="w-full">
        <label className="block text-gray-700 font-medium text-sm sm:text-base">
          How often do they buy lemonade?
        </label>
        <select
          value={purchaseFrequency}
          onChange={(e) => setPurchaseFrequency(e.target.value)}
          className="w-full border border-yellow-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
          required
        >
          <option value="" disabled>
            Select frequency
          </option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Occasionally">Occasionally</option>
        </select>
      </div>

      <div className="w-full">
        <label className="block text-gray-700 font-medium text-sm sm:text-base">
          What price range are they willing to pay?
        </label>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full border border-yellow-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-600"
          required
        >
          <option value="" disabled>
            Select price range
          </option>
          <option value="$1-$2">$1-$2</option>
          <option value="$2-$3">$2-$3</option>
          <option value="$3-$5">$3-$5</option>
          <option value="$5+">$5+</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-3 px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        aria-label="Submit research form"
      >
        See Insights
      </button>
    </form>
  </div>
</div>
          </div>
          


        {/* Insights Section */}
        {submitted && (
          <div>
            <div className="flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4 mt-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center text-gray-800">
                <span className="mr-2 text-green-600">💡</span>
                Research Insights
              </h2>
              <button
                onClick={() => toggleSection('insights')}
                className="text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
                aria-expanded={openSections.insights}
                aria-controls="insights-section"
              >
                {openSections.insights ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className={`transition-all duration-500 overflow-hidden ${openSections.insights ? 'max-h-max' : 'max-h-0'}`}>
              <div className="mt-4 p-4 sm:p-6 bg-yellow-50 rounded-lg shadow-md border border-yellow-300 flex flex-col gap-4 sm:gap-6">
                <div className="p-4 bg-blue-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-blue-600">👥</span>
                    <span className="font-bold text-blue-700">Target Customers:</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 ml-6">{customerType} ({ageGroup})</p>
                </div>
                <div className="p-4 bg-green-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-green-600">📍</span>
                    <span className="font-bold text-green-700">Market Location:</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 ml-6">{location}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-purple-600">🍋</span>
                    <span className="font-bold text-purple-700">Flavor Preferences:</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 ml-6">{flavorPreference}</p>
                  <div className="mt-2">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800">Flavor Priority:</h3>
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      {flavors.map((flavor, index) => (
                        <div key={index} className="flex-1">
                          <div className="text-xs sm:text-sm text-gray-700 text-center">{flavor}</div>
                          <div
                            className="bg-yellow-200 rounded"
                            style={{ height: `${flavorScores[index]}px`, minHeight: '20px' }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-teal-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-teal-600">🕒</span>
                    <span className="font-bold text-teal-700">Purchase Frequency:</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 ml-6">{purchaseFrequency}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl text-orange-600">💰</span>
                    <span className="font-bold text-orange-700">Price Range:</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 ml-6">{priceRange}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-md">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Overall Insights</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Your research shows that <strong>{customerType}</strong> ({ageGroup}) in <strong>{location}</strong> prefer <strong>{flavorPreference}</strong>, buy lemonade <strong>{purchaseFrequency.toLowerCase()}</strong>, and are willing to pay <strong>{priceRange}</strong>.
                  </p>
                  <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                    <strong>Location Strategy:</strong> {getLocationStrategy()}
                  </p>
                  <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                    <strong>Flavor Strategy:</strong> Prioritize {flavors[0] || 'your top flavor'} in your menu, followed by {flavors.slice(1).join(', ') || 'other flavors'}.
                  </p>
                  <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                    <strong>Pricing Strategy:</strong> Set prices within {priceRange} to match {customerType}’s expectations.
                  </p>
                  <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                    <strong>Marketing Tips:</strong> {getMarketingTips()}
                  </p>
                  <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                    <strong>Next Steps:</strong> Like Netflix tailoring shows to viewer preferences, use these insights to design a lemonade stand that meets <strong>{customerType}</strong>’s needs in <strong>{location}</strong>.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-5 rounded-lg transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  aria-label="Reset simulation"
                >
                  Reset & Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CustomerMarketResearchSimulation;