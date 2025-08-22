import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from './Sprints.png'; // Import logo for certificate header
import signature from './sign.png'; // Import signature image

const Profile = () => {
  const [userData, setUserData] = useState({
    id: null,
    full_name: '',
    email: '',
    role: '',
    others: '',
    completion: false,
  });
  const [certificates, setCertificates] = useState([]);
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('6 weeks');
  const [certNumber, setCertNumber] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const certificateRef = useRef(null);

  const organization = 'TheSprintSchool';

  useEffect(() => {
    const fetchUserAndCerts = async () => {
      const userEmail = localStorage.getItem('userEmail');
      const downloaded = localStorage.getItem('hasDownloaded') === 'true';
      setHasDownloaded(downloaded);
      console.log('Fetching user with email:', userEmail); // Debug log

      if (!userEmail) {
        setError('No user email found in local storage. Please log in.');
        return;
      }

      try {
        // Fetch user data including completion
        const { data: user, error: userError } = await supabase
          .from('users')
          .select('id, full_name, email, role, others, completion')
          .eq('email', userEmail)
          .single();

        if (userError) {
          console.error('Error fetching user:', userError);
          setError('User not found or invalid email.');
          return;
        }

        if (!user) {
          setError('No user found for this email.');
          return;
        }

        console.log('User data fetched:', user); // Debug log
        setUserData(user);

        // Fetch certificates
        const { data: certs, error: certError } = await supabase
          .from('certificates')
          .select('id, course, date, duration, cert_number, completion')
          .eq('user_id', user.id);

        if (certError) {
          console.error('Error fetching certificates:', certError);
          setError('Failed to fetch certificates.');
          return;
        }

        console.log('Certificates fetched:', certs); // Debug log
        setCertificates(certs || []);
        if (certs.length > 0) {
          setShowCertificate(true);
          setCertNumber(certs[0].cert_number);
          setDate(certs[0].date);
          setDuration(certs[0].duration);
          setShareableLink(`${window.location.origin}/certificate/${certs[0].id}`);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      }
    };
    fetchUserAndCerts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updateData = {
        full_name: userData.full_name,
        email: userData.email,
        others: userData.others,
        updated_at: new Date().toISOString(),
      };
      if (!hasDownloaded) {
        updateData.role = userData.role;
      }

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userData.id);

      if (error) {
        console.error('Error updating user:', error);
        setError('Failed to update profile.');
        return;
      }

      setSuccess('Profile updated successfully!');
      setError(null);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred.');
    }
  };

  const generateCertNumber = (course) => {
    const prefixMap = {
      'Technical Product Management': 'TPM',
      'Growth Product Management': 'GPM',
      'Introduction to Product Management PM': 'IPM',
      'Intermediate Product Management PM': 'IMP',
    };
    const prefix = prefixMap[course] || 'CERT';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let random = '';
    for (let i = 0; i < 4; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}-${random}`;
  };

  const handleGetCertificate = async () => {
    if (!userData.completion) {
      setError('You have not completed any courses yet.');
      setShowCertificate(false);
      return;
    }

    if (!userData.id) {
      setError('User data not loaded. Please try again.');
      return;
    }

    if (certificates.length > 0) {
      setShowCertificate(true);
      setError(null);
      return;
    }

    const newCertNumber = generateCertNumber(userData.role);
    setCertNumber(newCertNumber);
    setShowCertificate(true);

    try {
      const { data, error } = await supabase
        .from('certificates')
        .insert([
          {
            user_id: userData.id,
            course: userData.role,
            date,
            duration,
            cert_number: newCertNumber,
            completion: true,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      const link = `${window.location.origin}/certificate/${data.id}`;
      setShareableLink(link);
      setSuccess(`Certificate generated! Shareable link: ${link}`);
      setError(null);
    } catch (error) {
      console.error('Error saving to Supabase:', error);
      setError('Failed to generate certificate.');
    }
  };

  const handleDownload = () => {
    const input = certificateRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`certificate_${certNumber}.pdf`);
      if (!hasDownloaded) {
        setHasDownloaded(true);
        localStorage.setItem('hasDownloaded', 'true');
      }
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      setSuccess('Link copied to clipboard!');
      setTimeout(() => setSuccess(null), 3000);
    }).catch((err) => {
      console.error('Error copying link:', err);
      setError('Failed to copy link.');
    });
  };

  if (error && !showCertificate) {
    return <p className="text-red-500 text-center">{error}</p>;
  }
  if (!userData.id) {
    return <p className="text-center">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl p-6 bg-white shadow-2xl rounded-xl border border-yellow-600 sm:p-8">
        <h1 className="text-2xl font-bold text-yellow-600 mb-6 text-center sm:text-3xl">User Profile</h1>
        
        <button
          onClick={handleGetCertificate}
          disabled={!userData.completion}
          className={`w-full bg-yellow-600 text-white py-3 rounded-lg mb-6 transition duration-300 sm:w-auto sm:px-6 ${
            userData.completion ? 'hover:bg-yellow-700' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Get Certificate
        </button>

        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={userData.full_name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              disabled={hasDownloaded}
              className={`w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 ${
                hasDownloaded ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <option value="Technical Product Management">Technical Product Management</option>
              <option value="Growth Product Management">Growth Product Management</option>
              <option value="Intro/Intermediate PM">Intro/Intermediate PM</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Others</label>
            <input
              type="text"
              name="others"
              value={userData.others || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700"
            >
              <option value="6 weeks">6 weeks</option>
              <option value="8 weeks">8 weeks</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={handleUpdate}
          className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-300 mb-4 sm:w-auto sm:px-6"
        >
          Update Profile
        </button>
        
        {showCertificate && (
          <>
            <div
              ref={certificateRef}
              className="mt-8 p-6 bg-gradient-to-br from-white to-yellow-50 border-4 border-yellow-600 rounded-lg shadow-lg text-center relative overflow-hidden max-w-full"
              style={{ width: '100%', maxWidth: '800px', height: 'auto', minHeight: '400px', margin: '0 auto' }}
            >
              <div style={{ position: 'relative', zIndex: 10 }}>
                <img src={logo} alt="TheSprintSchool Logo" className="mx-auto w-24 h-24 mb-4 sm:w-32 sm:h-32" />
                <h2 className="text-xl font-certificate font-bold text-yellow-800 mb-3 sm:text-3xl">Certificate of Completion</h2>
                <p className="text-sm font-certificate text-yellow-700 mb-3 sm:text-lg">This certifies that</p>
                <p className="text-lg font-certificate font-extrabold text-yellow-900 mb-3 sm:text-2xl">{userData.full_name}</p>
                <p className="text-sm font-certificate font-extrabold text-yellow-600 mb-3 sm:text-lg">has successfully completed a hands-on course on</p>
                <p className="text-base font-certificate  font-certificate font-semibold text-yellow-800 mb-4 sm:text-xl">{userData.role}</p>
                <p className="text-xs font-certificate font-semibold text-yellow-800 mt-4 sm:text-sm">Duration: {duration}</p>
                <div className="flex  flex-col sm:flex-row justify-between items-center px-4 sm:px-10">
                  <div className="text-left space-y-1 mb-4 sm:mb-0">
                    <p className="font-bold font-certificate text-yellow-800 text-sm sm:text-lg">Prince Zana</p>
                    <p className="text-xs font-semibold text-yellow-900">Founder, TheSprintSchool</p>
                    <img
                      src={signature}
                      alt="Prince Zana Signature"
                      className="w-24 h-auto max-w-[100px] sm:max-w-[120px]"
                    />
                  </div>
                  <p className="text-xs text-yellow-600 sm:text-sm">Date: {date}</p>
                  <p className="text-xs font-semibold text-yellow-600 sm:text-sm">Certificate No: {certNumber}</p>
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
              {shareableLink && (
                <button
                  onClick={handleCopyLink}
                  className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition duration-300 sm:w-auto sm:px-6"
                >
                  Copy Link
                </button>
              )}
            </div>
            
            {shareableLink && (
              <p className="mt-6 text-center text-gray-600">
                Shareable Link: <a href={shareableLink} className="text-yellow-600 hover:underline">{shareableLink}</a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;