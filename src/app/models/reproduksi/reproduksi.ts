import {Model} from '../model';
import {General} from '../general';


export interface RincianBiologiReproduksi extends Model {

  // double
  panjang: number;

  tipePanjang: any;

  jenisKelamin: any;

  // double
  berat: number;

  tkg: any;

  // double
  beratIsiPerut: number;

}


export interface BiologiReproduksi extends General {

  namaLokasiSampling: any;

  namaKapal: any;

  daerahPenangkapan: any;

  penampung: boolean;

  penangkap: boolean;

  /* relasi tabel alat tangkap */
  uuidAlatTangkap: any;

  tanggalSampling: any;

  dataDetailReproduksi: RincianBiologiReproduksi[];

  
}
