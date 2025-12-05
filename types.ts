
export enum ComplaintStatus {
  Baru = 'Baru',
  DalamProses = 'Dalam Proses',
  Selesai = 'Selesai',
  LuarBidangKuasa = 'Di Luar Bidang Kuasa',
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string; // base64 string
  status: ComplaintStatus;
  comments: string;
  timestamp: Date;
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}
