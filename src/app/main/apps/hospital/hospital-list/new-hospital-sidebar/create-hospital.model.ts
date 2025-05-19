export interface CreateHospitalModel {
  /** Hastanenin kısa adı */
  shortName: string;

  /** Hastanenin tam ünvanı */
  fullTitle: string;

  /** Hastanedeki yetkili kişi */
  authorizedPerson: string;

  /** Hastanenin bulunduğu il */
  city: string;

  /** Hastanenin bulunduğu ilçe */
  district: string;

  /** Hastanenin telefon numarası */
  phone: string;

  /** Hastanenin e-posta adresi */
  email: string;

  /** Hastanenin fiziksel adresi */
  address: string;

  /** Hastane vergi numarası */
  taxNumber: string;

  /** Hastane vergi dairesi */
  taxOffice: string;

  /** Hastane web sitesi */
  website: string;

  /** Hastanenin aktif/pasif durumu */
  status: 'active' | 'pasive';

  /** Hastanenin sisteme kaydedildiği tarih */
  createdAt: string; // ISO formatında tarih (örn: 2024-05-01)
}