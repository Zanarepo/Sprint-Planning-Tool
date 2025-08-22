// StatusCodes.js
import React from "react";

const StatusCodes = () => {
  return (
    <div className="mt-6 bg-gray-50 p-6 rounded-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Understanding HTTP Response Status Codes
      </h3>
      <p className="text-gray-700 text-center mb-4">
        HTTP status codes indicate the result of an API request. Here's a quick reference for the most common ones:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Status 200 */}
        <div className="bg-green-100 p-4 rounded-md shadow-md border border-green-200">
          <h4 className="text-xl font-medium text-green-800">200 OK</h4>
          <p className="text-green-600">The request was successful, and the server responded with the requested data.</p>
          <code className="text-sm text-gray-600 mt-2 block">
            res.status(200).json( message: 'Request successful' );
          </code>
        </div>

        {/* Status 201 */}
        <div className="bg-green-100 p-4 rounded-md shadow-md border border-green-200">
          <h4 className="text-xl font-medium text-green-800">201 Created</h4>
          <p className="text-green-600">The request was successful, and a new resource has been created.</p>
          <code className="text-sm text-gray-600 mt-2 block">
            res.status(201).json( message: 'Resource created successfully' );
          </code>
        </div>

        {/* Status 400 */}
        <div className="bg-yellow-100 p-4 rounded-md shadow-md border border-yellow-200">
          <h4 className="text-xl font-medium text-yellow-800">400 Bad Request</h4>
          <p className="text-yellow-600">The server cannot process the request due to invalid syntax or missing parameters.</p>
          <code className="text-sm text-gray-600 mt-2 block">
            res.status(400).json(message: 'Bad request, invalid data' );
          </code>
        </div>

        {/* Status 401 */}
        <div className="bg-yellow-100 p-4 rounded-md shadow-md border border-yellow-200">
          <h4 className="text-xl font-medium text-yellow-800">401 Unauthorized</h4>
          <p className="text-yellow-600">Authentication is required, but the credentials provided are invalid or missing.</p>
          <code className="text-sm text-gray-600 mt-2 block">
            res.status(401).json( message: 'Unauthorized access' );
          </code>
        </div>

        {/* Status 404 */}
        <div className="bg-red-100 p-4 rounded-md shadow-md border border-red-200">
          <h4 className="text-xl font-medium text-red-800">404 Not Found</h4>
          <p className="text-red-600">The requested resource could not be found on the server.</p>
          <code className="text-sm text-gray-600 mt-2 block">
            res.status(404).json( message: 'Resource not found' );
          </code>
        </div>

        {/* Status 500 */}
        <div className="bg-red-100 p-4 rounded-md shadow-md border border-red-200">
          <h4 className="text-xl font-medium text-red-800">500 Internal Server Error</h4>
          <p className="text-red-600">The server encountered an error and could not process the request.</p>
          <code className="text-sm text-gray-600 mt-2 block">
            res.status(500).json( message: 'Internal server error' );
          </code>
        </div>

        {/* Status 403 */}
        <div className="bg-red-100 p-4 rounded-md shadow-md border border-red-200">
          <h4 className="text-xl font-medium text-red-800">403 Forbidden</h4>
          <p className="text-red-600">The server understands the request, but the client does not have permission to access it.</p>
          <code className="text-sm text-gray-600 mt-2 block">
            res.status(403).json( message: 'Forbidden: You do not have permission' `);
          </code>
        </div>

        {/* Status 422 */}
        <div className="bg-orange-100 p-4 rounded-md shadow-md border border-orange-200">
          <h4 className="text-xl font-medium text-orange-800">422 Unprocessable Entity</h4>
          <p className="text-orange-600">The request was well-formed but could not be followed due to semantic errors.</p>
          <code className="text-sm text-gray-600 mt-2 block">
            res.status(422).json( message: 'Validation failed' );
          </code>
        </div>
      </div>
    </div>
  );
};

export default StatusCodes;
