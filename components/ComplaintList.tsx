
import React from 'react';
import { Complaint } from '../types';
import ComplaintCard from './ComplaintCard';

interface ComplaintListProps {
  complaints: Complaint[];
  userRole: 'user' | 'yb';
  onUpdateComplaint: (id: string, newStatus: Complaint['status'], newComments: string) => void;
}

const ComplaintList: React.FC<ComplaintListProps> = ({ complaints, userRole, onUpdateComplaint }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Senarai Aduan</h2>
      {complaints.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl shadow-lg">
          <p className="text-slate-500">Tiada aduan buat masa ini.</p>
        </div>
      ) : (
        complaints.map((complaint) => (
          <ComplaintCard 
            key={complaint.id} 
            complaint={complaint} 
            userRole={userRole}
            onUpdateComplaint={onUpdateComplaint} 
          />
        ))
      )}
    </div>
  );
};

export default ComplaintList;
