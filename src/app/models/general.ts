import {FotoDokumentasi, Model} from './model';


export interface General extends Model {


  /* relasi ke enumerator  */
  uuidEnumerator: any;

  /* relasi ke data sumberdaya */
  uuidSumberDaya: any;

  statusDokumen: any;

  /**/
  photoNames: FotoDokumentasi[];
  /**/

  uuidPengupload: any;

  /* maybe to organization */
  organisasi: any;

  wpp: string;

  /* maybe to user */
  terverifikasiOleh: any;

  untukEksternalTerverifikasiOleh: any;

  byMachine: boolean;


}
