import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";


const StrategyDocument = () => {
  // User and document states
  const [, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);


  // Customization states (colors, font, layout, etc.)
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [layout, setLayout] = useState("standard"); // Example layout option

  // Reference to document container for PDF generation
  const docRef = useRef(null);

  // Retrieve logged-in user's email and id
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      (async () => {
        const { data, error } = await supabase
          .from("users")
          .select("id")
          .eq("email", email)
          .single();
        if (error) {
          console.error("Error fetching user id:", error);
        } else if (data) {
          setUserId(data.id);
        }
      })();
    }
  }, []);

  // Fetch strategy documents for the user
  useEffect(() => {
    if (userId) {
      (async () => {
        const { data, error } = await supabase
          .from("product_strategies")
          .select("*")
          .eq("user_id", userId);
        if (error) {
          console.error("Error fetching documents:", error);
        } else if (data) {
          setDocuments(data.filter((d) => d != null));
          if (data.length > 0) {
            setSelectedDoc(data[0]);
          }
        }
      })();
    }
  }, [userId]);

  // Handle form changes for creating/updating a document

  // Create or update a document

  // Set form for editing an existing document

  // Delete a document

  // Download as high-resolution PDF
  const downloadPDF = async () => {
    if (!docRef.current) return;
    const canvas = await html2canvas(docRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${selectedDoc.name}.pdf`);
  };

  // Download as CSV
  const downloadCSV = () => {
    if (!selectedDoc) return;
    const headers = ["Field", "Value"];
    const rows = [
      ["Name", selectedDoc.name],
      ["Mission", selectedDoc.mission],
      ["Vision", selectedDoc.vision],
      ["Target Audience", selectedDoc.target_audience || ""],
      ["Customer Problem", selectedDoc.customer_problem || ""],
      ["Competitors", selectedDoc.competitors || ""],
      ["Proposed Solution", selectedDoc.proposed_solution || ""],
      ["Positioning", selectedDoc.positioning || ""],
      ["Business Model", selectedDoc.business_model || ""],
      ["Monetization", selectedDoc.monetization || ""],
      ["Roadmap", selectedDoc.roadmap],
      ["Go-To-Market", selectedDoc.go_to_market || ""],
      ["KPIs", selectedDoc.kpis || ""],
      ["Recommendation", selectedDoc.recommendation || ""],
    ];
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedDoc.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download as DOC (using a simple HTML to DOC conversion)
  const downloadDOC = () => {
    if (!selectedDoc) return;
    const html = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${selectedDoc.name}</title>
        </head>
        <body>
          <h1>${selectedDoc.name}</h1>
          <h2>Mission</h2>
          <p>${selectedDoc.mission}</p>
          <h2>Vision</h2>
          <p>${selectedDoc.vision}</p>
          <h2>Target Audience</h2>
          <p>${selectedDoc.target_audience || ""}</p>
          <h2>Customer Problem</h2>
          <p>${selectedDoc.customer_problem || ""}</p>
          <h2>Competitors</h2>
          <p>${selectedDoc.competitors || ""}</p>
          <h2>Proposed Solution</h2>
          <p>${selectedDoc.proposed_solution || ""}</p>
          <h2>Positioning</h2>
          <p>${selectedDoc.positioning || ""}</p>
          <h2>Business Model</h2>
          <p>${selectedDoc.business_model || ""}</p>
          <h2>Monetization</h2>
          <p>${selectedDoc.monetization || ""}</p>
          <h2>Roadmap</h2>
          <p>${selectedDoc.roadmap}</p>
          <h2>Go-To-Market</h2>
          <p>${selectedDoc.go_to_market || ""}</p>
          <h2>KPIs</h2>
          <p>${selectedDoc.kpis || ""}</p>
          <h2>Recommendation</h2>
          <p>${selectedDoc.recommendation || ""}</p>
        </body>
      </html>
    `;
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    saveAs(blob, `${selectedDoc.name}.doc`);
  };



  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-6">
    <h1 className="text-3xl sm:text-3xl md:text-3xl font-bold mb-6 text-center">
      Customize Your Strategy Document
    </h1>
  
  
  {/* Customization Controls */}
  <div className="w-full mb-8 p-4 bg-gray-100 rounded shadow">
  <h2 className="text-2xl font-semibold mb-4 text-center">
    Customize Document Style
  </h2>
  <div className="flex flex-col sm:flex-row gap-4">
    <div className="flex-1">
      <label className="block font-bold mb-1">Background Color:</label>
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        className="w-full h-10"
      />
    </div>
    <div className="flex-1">
      <label className="block font-bold mb-1">Text Color:</label>
      <input
        type="color"
        value={textColor}
        onChange={(e) => setTextColor(e.target.value)}
        className="w-full h-10"
      />
    </div>
    <div className="flex-1">
      <label className="block font-bold mb-1">Font Family:</label>
      <select
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="sans-serif">Sans-serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
      </select>
    </div>
    <div className="flex-1">
      <label className="block font-bold mb-1">Layout:</label>
      <select
        value={layout}
        onChange={(e) => setLayout(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="standard">Standard</option>
        <option value="modern">Modern</option>
      </select>
    </div>
  

    </div>
  </div>



      {/* If more than one document exists, allow user to select one */}
      {documents.length > 1 && (
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 overflow-x-auto">
      {/* Your content goes here */}
    
    
        <h2 className="text-2xl font-semibold mb-4 text-center">Select Document</h2>
        <select
          value={selectedDoc ? selectedDoc.id : ""}
          onChange={(e) =>
            setSelectedDoc(
              documents.find((doc) => doc.id === parseInt(e.target.value))
            )
          }
          className="w-full border p-2 rounded"
        >
          {documents.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>
      
      )}

{selectedDoc && (
  <div className="w-full px-4 sm:px-6 lg:px-8 overflow-x-auto">
    <div
      id={`doc-${selectedDoc.id}`}
      ref={docRef}
      className="w-full p-8 rounded shadow-lg mb-6"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: fontFamily,
      }}
    >
      <h1 className="text-4xl font-bold mb-4 text-center">{selectedDoc.name}</h1>
      
      <section className="mb-6">
        <h2 className="text-3xl font-semibold mb-2">Mission</h2>
        <p>{selectedDoc.mission}</p>
      </section>
      
      <section className="mb-6">
        <h2 className="text-3xl font-semibold mb-2">Vision</h2>
        <p>{selectedDoc.vision}</p>
      </section>
      
      {selectedDoc.target_audience && (
        <section className="mb-6">
          <h2 className="text-3xl font-semibold mb-2">Target Audience</h2>
          <p>{selectedDoc.target_audience}</p>
        </section>
      )}
      
      {selectedDoc.customer_problem && (
        <section className="mb-6">
          <h2 className="text-3xl font-semibold mb-2">Customer Problem</h2>
          <p>{selectedDoc.customer_problem}</p>
        </section>
      )}
      
      {selectedDoc.competitors && (
        <section className="mb-6">
          <h2 className="text-3xl font-semibold mb-2">Competitors</h2>
          <p>{selectedDoc.competitors}</p>
        </section>
      )}
      
      {selectedDoc.proposed_solution && (
        <section className="mb-6">
          <h2 className="text-3xl font-semibold mb-2">Proposed Solution</h2>
          <p>{selectedDoc.proposed_solution}</p>
        </section>
      )}
      
      {selectedDoc.positioning && (
        <section className="mb-6">
          <h2 className="text-3xl font-semibold mb-2">Positioning</h2>
          <p>{selectedDoc.positioning}</p>
        </section>
      )}
      
      {selectedDoc.business_model && (
        <section className="mb-6">
          <h2 className="text-3xl font-semibold mb-2">Business Model</h2>
          <p>{selectedDoc.business_model}</p>
        </section>
      )}
      
      {selectedDoc.monetization && (
        <section className="mb-6">
          <h2 className="text-3xl font-semibold mb-2">Monetization</h2>
          <p>{selectedDoc.monetization}</p>
        </section>
      )}
      
      <section className="mb-6">
        <h2 className="text-3xl font-semibold mb-2">Roadmap</h2>
        <p>{selectedDoc.roadmap}</p>
      </section>
      
      {selectedDoc.go_to_market && (
        <section className="mb-6">
          <h2 className="text-3xl font-semibold mb-2">Go-To-Market</h2>
          <p>{selectedDoc.go_to_market}</p>
        </section>
      )}
      
      {selectedDoc.kpis && (
        <section className="mb-6">
          <h2 className="text-3xl font-semibold mb-2">KPIs</h2>
          <p>{selectedDoc.kpis}</p>
        </section>
      )}
      
      {selectedDoc.recommendation && (
        <section className="mb-6">
          <h2 className="text-3xl font-semibold mb-2">Recommendation</h2>
          <p className="break-words">{selectedDoc.recommendation}</p>
        </section>
      )}
    </div>

  

  <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-4">
  <button
    onClick={downloadPDF}
    className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
  >
    Download as PDF
  </button>
  <button
    onClick={downloadCSV}
    className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
  >
    Download as CSV
  </button>
  <button
    onClick={downloadDOC}
    className="bg-purple-600 text-white px-4 py-2 rounded w-full sm:w-auto"
  >
    Download as DOC
  </button>
</div>

        </div>
      )}
    </div>
  );
};

export default StrategyDocument;
