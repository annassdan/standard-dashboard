import {FotoDokumentasi, Model} from '../model';
import {General} from '../general';


export interface RincianBiologiUkuran extends Model {

  /* relasi ke tabel spesies */
  uuidSpesies: any;

  // double
  panjang: number;

}


export interface SampelBiologiUkuran extends Model {

  /* relasi ke tabel spesies */
  uuidSpesies: any;

  // double
  sampleVolume: number;

  // double
  sampleIndividu: number;

  tipePanjang: string;

}


export interface BiologiUkuran extends General {


  namaLokasiSampling: any;

  tanggalSampling: any;

  namaKapal: string;

  /* ke tabel daerah penangkapan, karena mesti displitting by coma */
  daerahPenangkapan: any;

  /* ke table alat tangkap  */
  uuidAlatTangkap: any;

  penampung: boolean;

  penangkap: boolean;

  // double
  totalTangkapanVolume: number;

  totalTangkapanIndividu: number;

  totalSampelIndividu: number;

  // double
  totalSampelVolume: number;

  dataSampleDetail: SampelBiologiUkuran[];

  dataUkuranDetail: RincianBiologiUkuran[];

}
