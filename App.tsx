
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ComplaintForm from './components/ComplaintForm';
import ComplaintList from './components/ComplaintList';
import { Complaint, ComplaintStatus } from './types';

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

  useEffect(() => {
    // This effect ensures localStorage is only accessed on the client side
    setIsClient(true);
    try {
      const storedComplaints = localStorage.getItem('complaints');
      if (storedComplaints) {
        // Parse and revive date objects
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
    // This effect saves to localStorage whenever complaints change, only on client
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

  const sortedComplaints = [...complaints].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-6 py-4">
        <div className="flex justify-end mb-6">
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
