import React from "react";
import { jsPDF } from "jspdf";
import { FaDatabase, FaMusic, FaList } from "react-icons/fa";

const DatabaseNormalization = () => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text("Database Normalization in a Music Streaming App", 20, 10);
    doc.text("1. Database Normalization", 20, 20);
    doc.text("Example Use Case: In a music streaming app, you store information about songs, artists, albums, and user playlists.", 20, 30);
    doc.text("Without Normalization: Duplicate data is stored for each song across multiple playlists, leading to inefficiency.", 20, 40);
    doc.text("Example Table (before normalization):", 20, 50);
    doc.autoTable({
      head: [['Song Name', 'Artist Name', 'Album Name', 'Playlist Name']],
      body: [
        ['Song A', 'Artist X', 'Album 1', 'Playlist 1'],
        ['Song A', 'Artist X', 'Album 1', 'Playlist 2'],
        ['Song B', 'Artist Y', 'Album 2', 'Playlist 1']
      ],
      startY: 60
    });
    doc.text("Issues with Non-Normalized Data:", 20, doc.lastAutoTable.finalY + 10);
    doc.text("- Duplication of Data", 20, doc.lastAutoTable.finalY + 20);
    doc.text("- Wasted Storage", 20, doc.lastAutoTable.finalY + 30);
    doc.text("With Normalization:", 20, doc.lastAutoTable.finalY + 40);
    doc.text("Example Tables (after normalization):", 20, doc.lastAutoTable.finalY + 50);
    doc.autoTable({
      head: [['Song ID', 'Song Name', 'Artist ID', 'Album ID']],
      body: [
        [1, 'Song A', 1, 1],
        [2, 'Song B', 2, 2]
      ],
      startY: doc.lastAutoTable.finalY + 60
    });
    doc.autoTable({
      head: [['Artist ID', 'Artist Name']],
      body: [
        [1, 'Artist X'],
        [2, 'Artist Y']
      ],
      startY: doc.lastAutoTable.finalY + 10
    });
    doc.autoTable({
      head: [['Album ID', 'Album Name']],
      body: [
        [1, 'Album 1'],
        [2, 'Album 2']
      ],
      startY: doc.lastAutoTable.finalY + 10
    });
    doc.autoTable({
      head: [['Playlist Name', 'Song ID']],
      body: [
        ['Playlist 1', 1],
        ['Playlist 1', 2],
        ['Playlist 2', 1]
      ],
      startY: doc.lastAutoTable.finalY + 10
    });

    doc.text("Benefits of Normalization:", 20, doc.lastAutoTable.finalY + 20);
    doc.text("- Less Duplication", 20, doc.lastAutoTable.finalY + 30);
    doc.text("- Easier Updates", 20, doc.lastAutoTable.finalY + 40);
    doc.text("- Efficient Storage", 20, doc.lastAutoTable.finalY + 50);
    doc.save("Database_Normalization_Music_Streaming.pdf");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Database Normalization in a Music Streaming App</h1>
      
      <button 
        onClick={handleDownloadPDF} 
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mb-6 block mx-auto"
      >
        Download as PDF
      </button>

      {/* Database Normalization Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-600 mb-2"><FaDatabase className="inline mr-2" /> 1. Database Normalization</h2>
        <p className="text-gray-700 text-lg mb-4">
          <strong>Example Use Case:</strong> In a <strong>music streaming app</strong>, you store information about songs, artists, albums, and user playlists.
          Normalization helps organize the data efficiently, avoiding redundancy and making it easier to manage.
        </p>
      </section>

      {/* Without Normalization */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-green-600 mb-2"><FaMusic className="inline mr-2" /> Without Normalization</h3>
        <p className="text-gray-700 mb-4">
          Without normalization, you may store all information in a single table, leading to repeated data entries for songs, artists, and albums.
        </p>

        <h4 className="font-semibold text-lg text-gray-800 mb-2">Example Table (Before Normalization):</h4>
        <table className="min-w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">Song Name</th>
              <th className="py-2 px-4 border border-gray-300">Artist Name</th>
              <th className="py-2 px-4 border border-gray-300">Album Name</th>
              <th className="py-2 px-4 border border-gray-300">Playlist Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border border-gray-300">Song A</td>
              <td className="py-2 px-4 border border-gray-300">Artist X</td>
              <td className="py-2 px-4 border border-gray-300">Album 1</td>
              <td className="py-2 px-4 border border-gray-300">Playlist 1</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">Song A</td>
              <td className="py-2 px-4 border border-gray-300">Artist X</td>
              <td className="py-2 px-4 border border-gray-300">Album 1</td>
              <td className="py-2 px-4 border border-gray-300">Playlist 2</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">Song B</td>
              <td className="py-2 px-4 border border-gray-300">Artist Y</td>
              <td className="py-2 px-4 border border-gray-300">Album 2</td>
              <td className="py-2 px-4 border border-gray-300">Playlist 1</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Issues with Non-Normalized Data */}
      <section className="mb-8">
        <h4 className="font-semibold text-lg text-red-600 mb-2">Issues with Non-Normalized Data:</h4>
        <ul className="list-disc pl-6 text-gray-700">
          <li><strong>Duplication of Data:</strong> Artist and album information is repeated for every instance of a song in the playlist.</li>
          <li><strong>Wasted Storage:</strong> Storing repeated information for every playlist instance leads to inefficient use of storage space.</li>
        </ul>
      </section>

      {/* With Normalization */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-2"><FaList className="inline mr-2" /> With Normalization</h3>
        <p className="text-gray-700 mb-4">
          Normalization breaks down the data into separate tables, linking them using unique identifiers (IDs) for each entity.
        </p>

        <h4 className="font-semibold text-lg text-gray-800 mb-2">Example Tables (After Normalization):</h4>

        {/* Songs Table */}
        <h5 className="font-semibold text-lg text-gray-800 mb-2">Songs Table:</h5>
        <table className="min-w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">Song ID</th>
              <th className="py-2 px-4 border border-gray-300">Song Name</th>
              <th className="py-2 px-4 border border-gray-300">Artist ID</th>
              <th className="py-2 px-4 border border-gray-300">Album ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border border-gray-300">1</td>
              <td className="py-2 px-4 border border-gray-300">Song A</td>
              <td className="py-2 px-4 border border-gray-300">1</td>
              <td className="py-2 px-4 border border-gray-300">1</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">2</td>
              <td className="py-2 px-4 border border-gray-300">Song B</td>
              <td className="py-2 px-4 border border-gray-300">2</td>
              <td className="py-2 px-4 border border-gray-300">2</td>
            </tr>
          </tbody>
        </table>

        {/* Artists Table */}
        <h5 className="font-semibold text-lg text-gray-800 mb-2">Artists Table:</h5>
        <table className="min-w-full table-auto border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">Artist ID</th>
              <th className="py-2 px-4 border border-gray-300">Artist Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border border-gray-300">1</td>
              <td className="py-2 px-4 border border-gray-300">Artist X</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-300">2</td>
              <td className="py-2 px-4 border border-gray-300">Artist Y</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Benefits of Normalization */}
      <section>
        <h4 className="font-semibold text-lg text-green-600 mb-4">Benefits of Normalization:</h4>
        <ul className="list-disc pl-6 text-gray-700">
          <li><strong>Less Duplication:</strong> Data is stored in one place, making updates easier.</li>
          <li><strong>Easier Updates:</strong> If the album name changes, you only update it in the Albums Table.</li>
          <li><strong>Efficient Storage:</strong> You save storage space by avoiding repetition of song data in playlists.</li>
        </ul>
      </section>
    </div>
  );
};

export default DatabaseNormalization;
