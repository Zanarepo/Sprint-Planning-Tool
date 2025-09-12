import { useState } from "react"
import Case1 from "./Case1"
import Case2 from "./Case2"
import Case3 from "./Case3"
import Case4 from "./Case4"
import TPMCase1 from "./TPMCase1"
import TPMCase2 from "./TPMCase2"
import TPMCase3 from "./TPMCase3"
import TPMCase4 from "./TPMCase4"
import TPMCase5 from "./TPMCase5"

export default function CaseStudiesTabs() {
  const [activeTab, setActiveTab] = useState("case1")

  const tabs = [
    { id: "case1", label: "Case Study 1", component: <Case1 /> },
    { id: "case2", label: "Case Study 2", component: <Case2 /> },
    { id: "case3", label: "Case Study 3", component: <Case3 /> },
    { id: "case4", label: "Case Study 4", component: <Case4 /> },
    { id: "tpmcase1", label: "TPM Case Study 1", component: <TPMCase1 /> },
    { id: "tpmcase2", label: "TPM Case Study 2", component: <TPMCase2 /> },
    { id: "tpmcase3", label: "TPM Case Study 3", component: <TPMCase3 /> },
    { id: "tpmcase4", label: "TPM Case Study 4", component: <TPMCase4 /> },
    { id: "tpmcase5", label: "TPM Case Study 5", component: <TPMCase5 /> },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Case Studies</h1>

      {/* Tab buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition 
              ${
                activeTab === tab.id
                  ? "bg-yellow-600 text-white border-yellow-600"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content - now full width, no card box */}
      <div className="w-full">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="w-full">
                <h2 className="text-xl font-semibold mb-4">
                  {tab.label}: Placeholder Name
                </h2>
                {tab.component}
              </div>
            )
        )}
      </div>
    </div>
  )
}
