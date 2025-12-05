
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ComplaintForm from './components/ComplaintForm';
import ComplaintList from './components/ComplaintList';
import { Complaint, ComplaintStatus } from './types';
import Spinner from './components/Spinner';

// Mock initial data for demonstration
const initialComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Jalan Berlubang di Taman Ceria',
    description: 'Terdapat lubang besar di hadapan rumah no. 15, Jalan Ceria 3. Merbahaya untuk penunggang motosikal.',
    category: 'Infrastruktur',
    image: 'https://picsum.photos/seed/road/600/400',
    status: ComplaintStatus.DalamProses,
    comments: 'Pihak majlis telah dimaklumkan dan kerja-kerja penurapan akan dijalankan dalam masa 3 hari bekerja. Harap maklum.',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: '2',
    title: 'Sampah tidak dikutip',
    description: 'Lori sampah tidak datang mengikut jadual sejak minggu lepas. Sampah sudah mula berbau.',
    category: 'Kebersihan',
    status: ComplaintStatus.Selesai,
    comments: 'Isu dengan kontraktor telah diselesaikan. Kutipan akan kembali seperti biasa bermula esok. Aduan selesai.',
    timestamp: new Date(Date.now() - 2 * 86400000), // 2 days ago
  },
   {
    id: '3',
    title: 'Anjing Liar Berkeliaran',
    description: 'Banyak anjing liar di kawasan taman permainan, membimbangkan keselamatan anak-anak.',
    category: 'Keselamatan',
    status: ComplaintStatus.LuarBidangKuasa,
    comments: 'Isu anjing liar adalah di bawah bidang kuasa Jabatan Veterinar. Aduan telah dipanjangkan kepada mereka untuk tindakan lanjut.',
    timestamp: new Date(Date.now() - 3 * 86400000), // 3 days ago
  }
];

const App: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [userRole, setUserRole] = useState<'user' | 'yb'>('user');
  const [isClient, setIsClient] = useState(false);
  
  // API Key State
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isCheckingKey, setIsCheckingKey] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing API Key session on mount
    const checkApiKey = async () => {
      try {
        if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
          setHasApiKey(true);
        }
      } catch (e) {
        console.error("Error checking API key:", e);
      } finally {
        setIsCheckingKey(false);
      }
    };
    
    checkApiKey();

    // Standard localStorage logic
    setIsClient(true);
    try {
      const storedComplaints = localStorage.getItem('complaints');
      if (storedComplaints) {
        const parsedComplaints = JSON.parse(storedComplaints).map((c: Complaint) => ({
          ...c,
          timestamp: new Date(c.timestamp),
        }));
        setComplaints(parsedComplaints);
      }
    } catch (error) {
      console.error("Failed to load complaints from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('complaints', JSON.stringify(complaints));
      } catch (error) {
        console.error("Failed to save complaints to localStorage", error);
      }
    }
  }, [complaints, isClient]);

  const handleAddComplaint = (complaint: Complaint) => {
    setComplaints(prevComplaints => [complaint, ...prevComplaints]);
  };

  const handleUpdateComplaint = (id: string, newStatus: ComplaintStatus, newComments: string) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(c =>
        c.id === id ? { ...c, status: newStatus, comments: newComments } : c
      )
    );
  };

  const handleSelectKey = async () => {
    try {
      if (window.aistudio) {
        await window.aistudio.openSelectKey();
        // Optimistically set true as per guidelines to mitigate race condition
        setHasApiKey(true);
      }
    } catch (error) {
      console.error("Error selecting key:", error);
      // If user cancels or fails, we stay on the prompt screen
    }
  };

  // -------------------------------------------------------------------------
  // RENDER: API Key Selection Screen
  // -------------------------------------------------------------------------
  if (isCheckingKey) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
        <Spinner />
        <p className="mt-4 text-slate-500">Menyemak konfigurasi sistem...</p>
      </div>
    );
  }

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Tetapan Kunci API</h2>
          <p className="text-slate-600 mb-6">
            Untuk menggunakan ciri AI pintar dalam aplikasi ini, sila pilih atau masukkan API Key anda.
          </p>
          
          <button
            onClick={handleSelectKey}
            className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
          >
            Pilih API Key
          </button>
          
          <p className="mt-4 text-xs text-slate-400">
            Anda mesti menggunakan kunci API dari projek berbayar Google Cloud. 
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline ml-1">
              Baca dokumentasi bil.
            </a>
          </p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // RENDER: Main App
  // -------------------------------------------------------------------------
  const sortedComplaints = [...complaints].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-6">
           {/* API Re-selection (Optional, small link) */}
           <button onClick={handleSelectKey} className="text-xs text-slate-400 hover:text-sky-600 underline">
             Tukar API Key
           </button>

          <div className="bg-white p-1 rounded-full shadow-md flex space-x-1">
            <button
              onClick={() => setUserRole('user')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${userRole === 'user' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Paparan Pengguna
            </button>
            <button
              onClick={() => setUserRole('yb')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${userRole === 'yb' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Paparan YB
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <ComplaintForm onAddComplaint={handleAddComplaint} />
          </div>
          <div className="md:col-span-2">
            <ComplaintList 
              complaints={sortedComplaints} 
              userRole={userRole} 
              onUpdateComplaint={handleUpdateComplaint} 
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 mt-12 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Sistem Aduan Komuniti. Dibangunkan untuk rakyat.</p>
      </footer>
    </div>
  );
};

export default App;
