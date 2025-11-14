
import React, { useState } from 'react';
import { Complaint, ComplaintStatus } from '../types';
import { suggestCategory } from '../services/geminiService';
import Spinner from './Spinner';

interface ComplaintFormProps {
  onAddComplaint: (complaint: Complaint) => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ onAddComplaint }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imageName, setImageName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Sila isi tajuk dan keterangan aduan.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const category = await suggestCategory(description);

      const newComplaint: Complaint = {
        id: Date.now().toString(),
        title,
        description,
        category,
        image,
        status: ComplaintStatus.Baru,
        comments: '',
        timestamp: new Date(),
      };

      onAddComplaint(newComplaint);

      // Reset form
      setTitle('');
      setDescription('');
      setImage(undefined);
      setImageName('');
    } catch (err) {
      setError('Gagal menghantar aduan. Sila cuba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Buat Aduan Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">Tajuk Aduan</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Cth: Lampu jalan rosak"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">Keterangan</label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Terangkan aduan anda dengan terperinci..."
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Muat Naik Gambar (Pilihan)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-slate-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                  <span>Pilih fail</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                </label>
                <p className="pl-1">atau seret dan lepas</p>
              </div>
              <p className="text-xs text-slate-500">{imageName || 'PNG, JPG, GIF sehingga 10MB'}</p>
            </div>
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner /> : 'Hantar Aduan'}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
