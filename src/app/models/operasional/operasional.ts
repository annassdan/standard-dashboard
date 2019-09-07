import {FotoDokumentasi, Model} from '../model';
import {General} from '../general';


export interface HasilTangkapanOperasional extends Model {

  /* relasi ke tabel spesies */
  uuidSpesies: any;

  kodeFao: string;

  totalBeratKg: number;

  totalBeratEkor: number;

  segar: boolean;

  beku: boolean;

  asin: boolean;

  loin: boolean;

  rebus: boolean;

}


export interface SpesifikasiAlatTangkapOperasional extends Model {

  /* relasi ke tabel alat tangkap */
  uuidAlatTangkap: any;

  spesifikasi: string;

  nilaiSpesifikasi: string;

  satuanSpesifikasi: string;

}


export interface Operasional extends General {

  /* any untuk kemungkinan pengubahan menjadi object */
  namaLokasiPendaratan: any;


  jamSampling: any;

  tanggalSampling: any;

  /* any karena bisa menjadi object model */
  namaKapal: any;

  tanggalBerangkat: any;

  /**/
  tandaSelar: any;

  tanggalKembali: any;

  namaPemilikKapal: string;

  namaKapten: string;

  jumlahAbk: number;

  // double
  panjangKapal: number;

  materialKapal: string;

  dayaCahaya: number;

  // double
  bobotKapal: number;

  kapalBantu: boolean;

  ukuranKapalBantu: number;

  kapalAndon: boolean;

  asalKapalAndon: any;

  jumlahPalka: number;

  jumlahBoks: number;

  mesinUtama: number;

  freezer: boolean;

  // double
  kapasitasFreezer: number;

  kapasitasPalkaBoks: number;

  mesinBantu: number;

  gps: boolean;

  jenisGps: string;

  /* relasi ke tabel alat tangkap */
  uuidAlatTangkap: any;

  material: string;

  jumlahAlatTangkapYangDioperasikan: number;

  jumlahSetting: number

  // double
  kedalamanAirMulai: number;

  // double
  kedalamanAirHingga: number;

  daerahPenangkapan: any;

  jumlahHariPerTrip: number;

  jumlahHariMenangkap: number;

  jenisRumpon: string;

  // double
  jumlahBalokEs: number;

  jumlahRumponDikunjungi: number;

  jumlahRumponBerhasil: number;

  waktuMemancing: string;

  komentar: string;

  sumberInformasi: string;

  // double
  jumlahTangkapanUntukDimakanDilautVolume: number;

  jumlahTangkapanUntukDimakanDilautIndividu: number;

  dataSpesifikasiAlatTangkap: SpesifikasiAlatTangkapOperasional[];

  dataOperasionalDetailTangkapan: HasilTangkapanOperasional[];

  // double
  jumlahTangkapanVolume: number;

  jumlahTangkapanIndividu: number;

  // double
  lamaPerendaman: number;


}
