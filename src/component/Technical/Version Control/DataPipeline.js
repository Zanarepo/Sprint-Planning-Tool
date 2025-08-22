import React, { useRef } from 'react';
import { FaDatabase, FaArrowRight,  FaCogs } from 'react-icons/fa';

import DataPipelineSimulation from './DataPipelineSimulation'

const DataPipeline = () => {
  const contentRef = useRef();


  return (
    <div className="container mx-auto p-4" ref={contentRef}>
      <h2 className="text-2xl font-semibold mb-4">What is a Data Pipeline?</h2>
      <p>
        A <strong>data pipeline</strong> automates the flow of data from its source to a destination, making it ready for analysis. 
        It includes stages like data ingestion, processing, storage, analysis, and visualization.
      </p>
      <div className="my-4 flex items-center space-x-4">
        <img src="images/pipelinedata.jpg" alt="Data Pipeline"  className="mx-auto rounded-md shadow-lg w-2/3 md:w-2/3"  />
        
        <p className="text-sm">An overview of how data moves through the pipeline.</p>
      </div>

      <h3 className="text-xl font-medium mb-4">Components of a Data Pipeline</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
          <FaDatabase className="text-3xl mb-4 text-blue-600" />
          <h4 className="font-semibold text-lg">1. Data Sources</h4>
          <p>Data originates from sources like databases, logs, social media, and real-time streams.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
          <FaArrowRight className="text-3xl mb-4 text-green-600" />
          <h4 className="font-semibold text-lg">2. Ingestion Layer</h4>
          <p>Data is collected using tools like Apache Kafka or AWS Glue for batch or stream processing.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
          <FaCogs className="text-3xl mb-4 text-orange-600" />
          <h4 className="font-semibold text-lg">3. Processing Layer</h4>
          <p>Tools like Spark and Hadoop clean, transform, and enrich the data.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
          <FaDatabase className="text-3xl mb-4 text-purple-600" />
          <h4 className="font-semibold text-lg">4. Storage Layer</h4>
          <p>Processed data is stored in databases, data lakes, or data warehouses like Snowflake or AWS S3.</p>
        </div>
      </div>

      <h3 className="text-xl font-medium mb-4">How Data Flows in a Pipeline</h3>
      <p className="mb-4">Here's an example of how data flows through the pipeline:</p>
      <img src="images/data-flow.png" alt="Data Flow Illustration" className="w-full h-auto mb-4 rounded-lg" />
      <p className="text-sm">An illustration of how data moves through a pipeline from ingestion to visualization.</p>

      <h3 className="text-xl font-medium mb-4">Key Technologies for Data Pipelines</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Batch Processing:</strong> Tools like Apache Hive and AWS Glue handle data in chunks.</li>
        <li><strong>Stream Processing:</strong> Real-time data processing using Apache Kafka and AWS Kinesis.</li>
        <li><strong>ETL Tools:</strong> Apache Airflow and Talend help manage and transform data.</li>
        <li><strong>Storage Solutions:</strong> Data can be stored in Data Warehouses like BigQuery or Data Lakes like AWS S3.</li>
      </ul>

      <h3 className="text-xl font-medium mb-4">Why It’s Important for a TPM</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Improved Decision-Making:</strong> Leverage data to make informed product decisions.</li>
        <li><strong>Product Strategy:</strong> Use pipelines for real-time features and personalization.</li>
        <li><strong>Collaboration:</strong> Work seamlessly with data engineers and analysts.</li>
        <li><strong>Monitoring and Metrics:</strong> Ensure the pipeline delivers accurate data for KPIs.</li>
        <li><strong>Innovation:</strong> Add real-time analytics and predictive models.</li>
      </ul>
<DataPipelineSimulation/>
    
    </div>
  );
};

export default DataPipeline;
