import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MainStateService} from '../../shared/services/main-state.service';
import {MatButton} from '@angular/material';
import {rightArrowChar} from '../../shared/constants';
import {ElectronService} from 'ngx-electron';


export interface ToRoot {
  display: string;
  names: string[];
}

export interface MyMenu {
  name?: string;
  displayName?: string;
  description?: string;
  icon?: string;
  hasActive?: string;
  hasChilds?: MyMenu[];
  rightIcon?: string;
  isBack?: boolean;
  roots?: ToRoot; // string[];
}


@Component({
  selector: 'app-the-dashboard',
  templateUrl: './the-dashboard.component.html',
  styleUrls: ['./the-dashboard.component.scss']
})
export class TheDashboardComponent implements OnInit, OnDestroy, AfterViewInit {


  /* buat fake trigger button, agar menghilangkan focus-program-cdk pada tombol navigasi */
  @ViewChild('fake', {read: MatButton, static: false}) fake;

  @ViewChild('myContainer', {read: ViewContainerRef, static: false})
  myContainer: ViewContainerRef;


  backCss = 'accent';
  collapsedIcon = 'chevron_right';

  readonly dashboardIcon = 'dashboard';
  back = {
    name: 'back',
    displayName: 'Kembali',
    icon: 'chevron_left',
    isBack: true
  };

  /* daftar menu */
  menus = <MyMenu[]> [
    {
      name: 'beranda',
      displayName: 'Beranda',
      description: 'Halaman Utama Aplikasi',
      icon: 'dashboard',
      hasActive: 'active'
    },
    {
      name: 'data-dasar',
      displayName: 'Data Dasar',
      icon: 'dns',
      hasActive: '',
      rightIcon: this.collapsedIcon,
      hasChilds: [
        {...this.back, roots: {display: 'Data Dasar ', names: ['data-dasar']}},
        {
          name: 'unggah-data',
          displayName: 'Unggah Data',
          description: 'Proses Unggah Data Mentah dari Excel',
          icon: 'vertical_align_top',
          hasActive: ''
        },
        {
          name: 'input-data',
          displayName: 'Input Data',
          description: 'Proses Input Data Mentah ke Sistem',
          icon: 'note_add',
          hasActive: ''
        }
      ]
    },
    {
      name: 'pendataan',
      displayName: 'Pendataan',
      icon: 'receipt',
      hasActive: '',
      rightIcon: this.collapsedIcon,
      hasChilds: [
        {...this.back, roots: {display: 'Pendataan ', names: ['pendataan']}},
        {
          name: 'pendaratan',
          displayName: 'Pendaratan',
          description: 'Daftar Pendataan untuk Pendaratan',
          icon: 'camera_rear',
          hasActive: ''
        },
        {
          name: 'operasional',
          displayName: 'Operasional',
          description: 'Daftar Pendataan untuk Operasional',
          icon: 'camera_rear',
          hasActive: ''
        },
        {
          name: 'biologi',
          displayName: 'Biologi',
          icon: 'camera_rear',
          hasActive: '',
          rightIcon: this.collapsedIcon,
          hasChilds: [
            {...this.back, roots: {display: `Pendataan ${rightArrowChar}  Biologi `, names: ['pendataan', 'biologi']}},
            {
              name: 'ukuran',
              displayName: 'Ukuran',
              description: 'Daftar Pendataan untuk Biologi Ukuran',
              icon: 'camera_rear',
              hasActive: ''
            },
            {
              name: 'reproduksi',
              displayName: 'Reproduksi',
              description: 'Daftar Pendataan untuk Biologi Reproduksi',
              icon: 'camera_rear',
              hasActive: ''
            },
          ]
        }
      ],

    },
    {
      name: 'master',
      displayName: 'Master',
      icon: 'blur_linear',
      hasActive: '',
      rightIcon: this.collapsedIcon,
      hasChilds: [
        {...this.back, roots: {display: 'Master ', names: ['master']}},
        {
          name: 'alat-tangkap',
          displayName: 'Alat Tangkap',
          description: 'Daftar Alat Tangkap',
          icon: 'camera_rear',
          hasActive: ''
        },
      ]
    }

  ];


  /* menu yang terpilih */
  currentMenu = this.menus[2].hasChilds[3].hasChilds[1];

  /* menu yang akan ditampilkan ke user */
  menuInstance: MyMenu[] = this.menus[2].hasChilds[3].hasChilds;

  currentMenuInstance: MyMenu[] = this.menuInstance;
  breadcrumbPrefixText = this.currentMenu.displayName;
  breadcrumbPrefixIcon = this.dashboardIcon;

  hide = false;

  constructor(
    public electronService: ElectronService,
    public rootState: MainStateService,
    private changeDetector: ChangeDetectorRef,
    public breakpointObserver: BreakpointObserver) {
    this.showMenu(this.currentMenu);


    console.log('this.electronService.ipcRenderer', this.electronService.ipcRenderer);
  }


  closeElectronWindow() {
    this.electronService.ipcRenderer.sendSync('close-window');
  }


  public beep() {
    this.electronService.shell.beep();
  }

  minimizeElectronWindow() {
    this.electronService.ipcRenderer.sendSync('minimize-window');
  }

  ngOnInit() {
    setTimeout(() => {
      this.hide = true;
    }, 2000);
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }


  pickBreadcrumb() {
    const getted = <MyMenu[]> this.menuInstance.filter(value => value.isBack);
    if (getted.length === 0) {
      this.breadcrumbPrefixIcon = this.dashboardIcon;
      this.breadcrumbPrefixText = this.currentMenu.displayName;
      return;
    }

    this.breadcrumbPrefixIcon = this.currentMenu.icon;
    this.breadcrumbPrefixText = getted[0].roots.display;
  }

  ngOnDestroy(): void {
  }

  backToRoot(m: MyMenu) {
    let topMenu = this.menus;
    const lengthRootNames = m.roots.names.length;

    let next;
    let atRootNameIndex = 0;
    while (atRootNameIndex < lengthRootNames) {
      next = <MyMenu> topMenu.filter(v => v.name === m.roots.names[atRootNameIndex])[0];

      if ((atRootNameIndex + 1) < lengthRootNames) {
        topMenu = next.hasChilds;
      }

      atRootNameIndex++;
    }

    this.menuInstance = topMenu;
  }

  clear(m: MyMenu | MyMenu[], except?: string) {
    let menus = [];
    if ((<any[]> m).length) {
      menus = (<MyMenu[]> m);
    } else {
      menus.push(m);
    }

    for (const menu of menus) {
      if (except && menu.name === except) {
        continue;
      }

      menu.hasActive = '';
      if (menu.hasChilds) {
        this.clear(menu.hasChilds, except);
      }
    }
  }

  selectMenu(menu: MyMenu, menus = this.menuInstance) {
    this.currentMenuInstance = menus;

    for (const m of menus) {
      if (m.name === menu.name) {
        menu.hasActive = 'active';
        this.currentMenu = menu;
        this.pickBreadcrumb();
      } else {
        this.clear(m);
      }
    }

    /* set perubahan nilai event listener on menu options */
    this.rootState.menuOptions({
      currentMenusInstance: this.currentMenuInstance,
      currentMenu: this.currentMenu,
      breadcrumbPrefixText: this.breadcrumbPrefixText
    });
  }

  selectAllHisRootMenu(m: MyMenu, except) {

    for (const c of this.menus) {
      this.clear(c, except);
    }

    let topMenu = this.menus;
    for (const name of m.roots.names) {
      const next = <MyMenu> topMenu.filter(v => v.name === name)[0];
      topMenu = next.hasChilds;
      next.hasActive = 'active';
    }
  }

  onMenuClicked(menu: MyMenu, opt: any) {

    if (menu.isBack) {
      this.backToRoot(menu);
    } else {
      /* akan di return jika yng terklik lagi dangan menu yang sama bila tidak mempunya child */
      if (!menu.hasChilds) {
        if (this.currentMenu.name === menu.name) {
          return;
        }

        if (opt.isLarge !== 'true') {
          opt.sidenav.toggle();

          /*  eksekusi tombol fake aga menghilangkan cdk-program-focus pada navigasi button */
          this.fake.focus();
        }


        this.hide = false;
        setTimeout(() => {
          this.hide = true;
        }, 1000);

        this.showMenu(menu);
      } else { /* jika menu mempunyai sub menu, maka menu yang ditampilkan adalah sub menunya */
        this.menuInstance = menu.hasChilds;
      }

    }
  }

  showMenu(menu: MyMenu) {
    this.selectMenu(menu);
    const backs = this.menuInstance.filter(value => value.isBack);
    if (this.menuInstance.filter(value => value.isBack).length > 0) {
      this.selectAllHisRootMenu(backs[0], menu.name);
    }
  }

  async current() {


    // const module = await import('../master/alat-tangkap/alat-tangkap.module');
    // const compiled = await this.compiler.compileModuleAndAllComponentsAsync(module.AlatTangkapModule);
    // const factory = compiled.componentFactories.find((cf: ComponentFactory<any>) => cf.selector === 'app-alat-tangkap');
    //
    // if (factory) {
    //   this.myContainer.createComponent(factory);
    // }


    for (const cm of this.currentMenuInstance) {
      if (this.menuInstance.filter(value => value.name === cm.name).length === 0) {
        this.menuInstance = this.currentMenuInstance;
        break;
      }
    }


  }

}
