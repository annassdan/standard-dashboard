import {FotoDokumentasi, Model} from '../model';
import {Operasional} from '../operasional/operasional';
import {BiologiUkuran} from '../ukuran/ukuran';
import {General} from '../general';


export interface HasilTangkapanPendaratan extends Model {

  /* relasi ke tabel spesies */
  uuidSpesies: any;

  /*double*/
  tangkapanVolume: number;

  /*double*/
  tangkapanIndividu: number;

}

export interface RincianPendaratan extends Model {

  namaKapal: string;

  penampung: boolean;

  penangkap: boolean;

  jumlahKapalPenangkap: number;

  /* relasi ke tabel alat tangkap */
  uuidAlatTangkap: any;

  jumlahSetting: number;

  jumlahMataPancing: number;

  rumpon: boolean;

  cahaya: boolean;

  daerahPenangkapan: string;

  jumlahHariPerTrip: number;

  jumlahHariMenangkap: number;

  /*double*/
  totalTangkapanVolume: number;

  totalTangkapanIndividu: number;

  dataRincianTangkapanPendaratan: HasilTangkapanPendaratan[];

}

export interface Pendaratan extends General {

  tanggalPendaratan: any;

  namaLokasiPendaratan: string;

  dataRincianPendaratan: RincianPendaratan[];

  dataOperasional: Operasional[];

  dataUkuran: BiologiUkuran[];


}
