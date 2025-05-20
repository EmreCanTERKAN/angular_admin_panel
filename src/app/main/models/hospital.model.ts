export interface HospitalModel {
  shortName: string;
  fullTitle: string;
  authorizedPerson: string;
  city: string;
  district: string;
  phone: string;
  email: string;
  address: string;
  taxNumber: string;
  taxOffice: string;
  website: string;
  status: 'active' | 'pasive';
  createdAt: string; 
}