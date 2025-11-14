import React, { useState } from 'react';
import { Complaint, ComplaintStatus } from '../types';
import { NewIcon, InProgressIcon, CompletedIcon, OutOfScopeIcon, ImageIcon, CategoryIcon } from './icons';

interface ComplaintCardProps {
  complaint: Complaint;
  userRole: 'user' | 'yb';
  onUpdateComplaint: (id: string, newStatus: ComplaintStatus, newComments: string) => void;
}

// FIX: Changed JSX.Element to React.ReactElement to resolve 'Cannot find namespace JSX' error.
const statusStyles: Record<ComplaintStatus, { bg: string; text: string; icon: React.ReactElement }> = {
  [ComplaintStatus.Baru]: { bg: 'bg-sky-100', text: 'text-sky-800', icon: <NewIcon /> },
  [ComplaintStatus.DalamProses]: { bg: 'bg-amber-100', text: 'text-amber-800', icon: <InProgressIcon /> },
  [ComplaintStatus.Selesai]: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: <CompletedIcon /> },
  [ComplaintStatus.LuarBidangKuasa]: { bg: 'bg-slate-100', text: 'text-slate-800', icon: <OutOfScopeIcon /> },
};

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, userRole, onUpdateComplaint }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<ComplaintStatus>(complaint.status);
  const [currentComments, setCurrentComments] = useState(complaint.comments);
  
  const { bg, text, icon } = statusStyles[complaint.status];

  const handleUpdate = () => {
    onUpdateComplaint(complaint.id, currentStatus, currentComments);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-slate-900 mb-2">{complaint.title}</h3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${bg} ${text}`}>
            {icon}
            {complaint.status}
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          {new Date(complaint.timestamp).toLocaleString('ms-MY', { dateStyle: 'medium', timeStyle: 'short' })}
        </p>

        <div className="flex items-center text-sm text-slate-600 mb-4">
            <CategoryIcon />
            Kategori: <strong className="ml-1">{complaint.category}</strong>
        </div>

        <p className="text-slate-700 mb-4 whitespace-pre-wrap">{complaint.description}</p>
        
        {complaint.image && (
          <div className="mb-4">
            <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center text-sm text-sky-600 hover:text-sky-800 font-medium">
                <ImageIcon />
                {isExpanded ? 'Sembunyi Gambar' : 'Lihat Gambar Aduan'}
            </button>
            {isExpanded && <img src={complaint.image} alt="Complaint attachment" className="mt-2 rounded-lg max-h-96 w-auto shadow-md" />}
          </div>
        )}

        { (complaint.comments || userRole === 'yb') &&
          <div className="mt-6 border-t border-slate-200 pt-4">
            <h4 className="font-semibold text-slate-800 mb-2">Maklum Balas YB:</h4>
            {userRole === 'user' ? (
              <p className="text-slate-600 italic whitespace-pre-wrap">{complaint.comments || "Tiada maklum balas lagi."}</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kemas Kini Status</label>
                  <select
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value as ComplaintStatus)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                  >
                    {Object.values(ComplaintStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Ulasan / Tindakan</label>
                    <textarea
                        rows={3}
                        value={currentComments}
                        onChange={(e) => setCurrentComments(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                        placeholder="Nyatakan tindakan yang diambil..."
                    ></textarea>
                </div>
                <button
                  onClick={handleUpdate}
                  className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Kemas Kini
                </button>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default ComplaintCard;
