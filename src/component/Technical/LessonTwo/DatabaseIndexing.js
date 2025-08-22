import React, { useState } from "react";
import { FaDatabase, FaSearch, FaCogs, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";

const DatabaseIndexing = () => {
  const [loading, setLoading] = useState(false);

  // Generate the PDF document
  const generatePDF = () => {
    setLoading(true);
    const doc = new jsPDF();

    doc.text("Database Concepts in Music Streaming App", 20, 10);

    // 1. Database Normalization
    doc.text("1. Database Normalization", 20, 20);
    doc.text(
      `Without Normalization: 
      Song Name | Artist Name | Album Name | Playlist Name 
      Song A | Artist X | Album 1 | Playlist 1
      Song A | Artist X | Album 1 | Playlist 2
      Song B | Artist Y | Album 2 | Playlist 1

      With Normalization:
      Songs Table:
      Song ID | Song Name | Artist ID | Album ID
      1 | Song A | 1 | 1
      2 | Song B | 2 | 2

      Artists Table:
      Artist ID | Artist Name
      1 | Artist X
      2 | Artist Y

      Albums Table:
      Album ID | Album Name
      1 | Album 1
      2 | Album 2

      Playlists Table:
      Playlist Name | Song ID
      Playlist 1 | 1
      Playlist 1 | 2
      Playlist 2 | 1`,
      20,
      30
    );

    // 2. Indexing
    doc.text("2. Indexing", 20, 120);
    doc.text(
      `Without Indexing:
      Searching for "Song A" means scanning every row of the Songs Table.
      
      With Indexing:
      Index on the Song Name column speeds up search.
      Song Name → Row 1: Song A
      Song Name → Row 3: Song A
      Song Name → Row 2: Song B`,
      20,
      130
    );

    // 3. Optimization
    doc.text("3. Optimization", 20, 180);
    doc.text(
      `Without Optimization:
      Fetching recommendations inefficiently may slow the app, requiring scans of all playlists and songs.
      
      With Optimization:
      Query caching and pre-computed data improve performance and scalability.`,
      20,
      190
    );

    doc.save("music-streaming-database-concepts.pdf");
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 bg-gray-100 py-3">
        Music Streaming App: Database Concepts
      </h1>

      {/* Collapsible Sections for Database Concepts */}
      <div className="space-y-6">
        {/* Database Normalization Section */}
        <div className="p-6 border rounded-lg shadow-lg bg-white">
          <div className="flex items-center">
            <FaDatabase className="text-blue-600 text-4xl" />
            <h2 className="text-2xl font-semibold ml-4">Database Normalization</h2>
          </div>
          <p className="mt-4 text-gray-700">
            Learn how to structure your database efficiently by reducing duplication and saving storage.
          </p>
          <div className="mt-4">
            <h3 className="font-semibold">Without Normalization:</h3>
            <table className="min-w-full mt-2 border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Song Name</th>
                  <th className="border px-4 py-2">Artist Name</th>
                  <th className="border px-4 py-2">Album Name</th>
                  <th className="border px-4 py-2">Playlist Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Song A</td>
                  <td className="border px-4 py-2">Artist X</td>
                  <td className="border px-4 py-2">Album 1</td>
                  <td className="border px-4 py-2">Playlist 1</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Song A</td>
                  <td className="border px-4 py-2">Artist X</td>
                  <td className="border px-4 py-2">Album 1</td>
                  <td className="border px-4 py-2">Playlist 2</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Song B</td>
                  <td className="border px-4 py-2">Artist Y</td>
                  <td className="border px-4 py-2">Album 2</td>
                  <td className="border px-4 py-2">Playlist 1</td>
                </tr>
              </tbody>
            </table>
            <h3 className="font-semibold mt-4">With Normalization:</h3>
            <p className="mt-2">
              Data is separated into distinct tables to avoid repetition and reduce storage waste.
            </p>
          </div>
        </div>

        {/* Indexing Section */}
        <div className="p-6 border rounded-lg shadow-lg bg-white">
          <div className="flex items-center">
            <FaSearch className="text-green-600 text-4xl" />
            <h2 className="text-2xl font-semibold ml-4">Indexing</h2>
          </div>
          <p className="mt-4 text-gray-700">
            Indexing allows fast retrieval of data, especially for searches involving large datasets.
          </p>
          <h3 className="font-semibold mt-4">Without Indexing:</h3>
          <p className="text-gray-700">
            Searching through rows one by one can slow down the system as the database grows.
          </p>
          <h3 className="font-semibold mt-4">With Indexing:</h3>
          <p className="text-gray-700">
            An index on the Song Name column allows the database to quickly locate songs without scanning every row.
          </p>
        </div>

        {/* Optimization Section */}
        <div className="p-6 border rounded-lg shadow-lg bg-white">
          <div className="flex items-center">
            <FaCogs className="text-red-600 text-4xl" />
            <h2 className="text-2xl font-semibold ml-4">Optimization</h2>
          </div>
          <p className="mt-4 text-gray-700">
            Optimization techniques like query caching and sharding improve performance and scalability.
          </p>
          <h3 className="font-semibold mt-4">Without Optimization:</h3>
          <p className="text-gray-700">
            Fetching data inefficiently can cause delays, especially when there are large amounts of data to process.
          </p>
          <h3 className="font-semibold mt-4">With Optimization:</h3>
          <p className="text-gray-700">
            Caching results and using pre-computed data ensures quicker responses for user actions.
          </p>
        </div>
      </div>

      {/* Download PDF Button */}
      <div className="mt-8 text-center">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg flex items-center justify-center"
          onClick={generatePDF}
          disabled={loading}
        >
          {loading ? "Generating PDF..." : "Download PDF"}
          <FaDownload className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default DatabaseIndexing;
