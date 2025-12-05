
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (username === 'yb' && password === 'yb') {
        setUserRole('yb');
        setIsAuthenticated(true);
    } else if (username === 'user' && password === 'user') {
        setUserRole('user');
        setIsAuthenticated(true);
    } else {
        setLoginError('Nama pengguna atau kata laluan salah.');
    }
  };

  const handleDemoAccess = () => {
    setUserRole('user');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setUserRole('user');
  };

  // -------------------------------------------------------------------------
  // RENDER: Login Screen
  // -------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-sky-700">Sistem Aduan Komuniti</h1>
            <p className="text-slate-500 mt-2">Sila log masuk untuk meneruskan.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Nama Pengguna</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="Cth: user atau yb"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Kata Laluan</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="Kata laluan"
              />
            </div>
            
            {loginError && <p className="text-sm text-red-600">{loginError}</p>}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Log Masuk
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Atau</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleDemoAccess}
                className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Lihat Demo (Tanpa Log Masuk)
              </button>
            </div>
            <div className="mt-4 text-center text-xs text-slate-400">
                <p>Log masuk demo:</p>
                <p>User: <strong>user</strong> / <strong>user</strong></p>
                <p>YB: <strong>yb</strong> / <strong>yb</strong></p>
            </div>
          </div>
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
           <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-medium">
             Log Keluar
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
