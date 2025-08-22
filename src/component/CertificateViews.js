import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from './Sprints.png'; // Import logo for certificate header
import signature from './sign.png'; // Import signature image

const CertificateViewer = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const certificateRef = useRef(null);

  const organization = 'TheSprintSchool';

  useEffect(() => {
    const fetchCertificateAndUser = async () => {
      try {
        // Fetch certificate data
        const { data: cert, error: certError } = await supabase
          .from('certificates')
          .select('id, user_id, course, date, duration, cert_number')
          .eq('id', id)
          .single();

        if (certError) {
          console.error('Error fetching certificate:', certError);
          setError('Certificate not found.');
          return;
        }

        if (!cert) {
          setError('Certificate not found.');
          return;
        }

        console.log('Certificate fetched:', cert); // Debug log
        setCertificate(cert);

        // Fetch user data
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', cert.user_id)
          .single();

        if (userError) {
          console.error('Error fetching user:', userError);
          setError('User not found.');
          return;
        }

        console.log('User data fetched:', user); // Debug log
        setUserData(user);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      }
    };
    fetchCertificateAndUser();
  }, [id]);

  const handleDownload = () => {
    const input = certificateRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`certificate_${certificate.cert_number}.pdf`);
    });
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/certificate/${id}`;
    navigator.clipboard.writeText(link).then(() => {
      setSuccess('Link copied to clipboard!');
      setTimeout(() => setSuccess(null), 3000);
    }).catch((err) => {
      console.error('Error copying link:', err);
      setError('Failed to copy link.');
    });
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!certificate || !userData) {
    return <p className="text-center">Loading certificate...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl p-6 bg-white shadow-2xl rounded-xl border border-yellow-600 sm:p-8">
        <h1 className="text-2xl font-bold text-yellow-600 mb-6 text-center sm:text-3xl">Certificate</h1>

        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        <div
          ref={certificateRef}
          className="mt-8 p-0 bg-gradient-to-br from-white to-yellow-50 border-4 border-yellow-600 rounded-lg shadow-lg text-center relative overflow-hidden max-w-full"
          style={{ width: '100%', maxWidth: '800px', height: 'auto', minHeight: '400px', margin: '0 auto' }}
        >
          <div style={{ position: 'relative', zIndex: 10 }}>
            <img src={logo} alt="TheSprintSchool Logo" className="mx-auto w-24 h-24 font-certificate mb-4 sm:w-32 sm:h-32" />
            <h2 className="text-xl font-bold text-yellow-800 font-certificate mb-3 sm:text-3xl">Certificate of Completion</h2>
            <p className="text-sm font-certificate text-yellow-700 mb-3 sm:text-lg">This certifies that</p>
            <p className="text-lg font-certificate font-extrabold text-yellow-900 mb-3 sm:text-2xl">{userData.full_name}</p>
            <p className="text-sm font-certificate font-extrabold text-yellow-600 mb-3 sm:text-lg">has successfully completed a hands-on course on</p>
            <p className="text-base font-semibold font-certificate text-yellow-800 mb-4 sm:text-xl">{certificate.course}</p>
            <p className="text-xs font-semibold text-yellow-800 mt-4 sm:text-sm">Duration: {certificate.duration}</p>
            <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-10">
              <div className="text-left space-y-1 mb-4 sm:mb-0">
                <p className="font-bold font-certificate text-yellow-800 text-sm sm:text-lg">Prince Zana</p>
                <p className="text-xs font-semibold text-yellow-900">Founder, TheSprintSchool</p>
                <img
                  src={signature}
                  alt="Prince Zana Signature"
                  className="w-24 h-auto max-w-[100px] sm:max-w-[120px]"
                />
              </div>
              <p className="text-xs text-yellow-600 sm:text-sm">Date: {certificate.date}</p>
              <p className="text-xs font-semibold text-yellow-600 sm:text-sm">Certificate No: {certificate.cert_number}</p>
            </div>
            <p className="text-xs font-bold text-yellow-600 mt-3 sm:text-sm">Issued by {organization}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <button
            onClick={handleDownload}
            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-300 sm:w-auto sm:px-6"
          >
            Download as PDF
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-300 sm:w-auto sm:px-6"
          >
            Copy Link
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Shareable Link: <a href={`${window.location.origin}/certificate/${id}`} className="text-yellow-600 hover:underline">{`${window.location.origin}/certificate/${id}`}</a>
        </p>
      </div>
    </div>
  );
};

export default CertificateViewer;