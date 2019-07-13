import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MAX_WIDTH} from '../../shared/constants';
import {MainStateService} from '../../shared/services/main-state.service';
import {Subscription} from 'rxjs';
import {MatButton} from '@angular/material';


interface ToRoot {
  display: string;
  names: string[];
}

interface MyMenu {
  name?: string;
  displayName?: string;
  icon?: string;
  hasActive?: string;
  hasChilds?: MyMenu[];
  rightIcon?: string;
  isBack?: boolean;
  roots: ToRoot; // string[];
}


@Component({
  selector: 'app-the-dashboard',
  templateUrl: './the-dashboard.component.html',
  styleUrls: ['./the-dashboard.component.scss']
})
export class TheDashboardComponent implements OnInit, OnDestroy {


  /* buat fake trigger button, agar menghilangkan focus-program-cdk pada tombol navigasi */
  @ViewChild('fake', { read: MatButton, static: false }) fake;

  subscribers: Subscription[] = [];
  backCss = 'warn';
  collapsedIcon = 'chevron_right';

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
        {...this.back, roots: {display: 'Data Dasar', names: ['data-dasar']} },
        {
          name: 'unggah-data',
          displayName: 'Unggah Data',
          icon: 'vertical_align_top',
          hasActive: ''
        },
        {
          name: 'input-data',
          displayName: 'Input Data',
          icon: 'insert_drive_file',
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
        {...this.back, roots: {display: 'Pendataan', names: ['pendataan']} },
        {
          name: 'pendaratan',
          displayName: 'Pendaratan',
          icon: 'camera_rear',
          hasActive: ''
        },
        {
          name: 'operasional',
          displayName: 'Operasional',
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
            {...this.back, roots: {display: 'Biologi - Ukuran', names: ['pendataan', 'biologi']} },
            {
              name: 'ukuran',
              displayName: 'Ukuran',
              icon: 'camera_rear',
              hasActive: ''
            },
            {
              name: 'reproduksi',
              displayName: 'Reproduksi',
              icon: 'camera_rear',
              hasActive: ''
            },
          ]
        }
      ],

    },
    {
      name: 'alat-tangkap',
      displayName: 'Alat Tangkap',
      icon: 'camera_rear',
      hasActive: ''
    },
  ];



  /* menu yang akan ditampilkan ke user */
  menuInstance: MyMenu[] = this.menus;

  /* menu yang terpilih */
  currentMenu = this.menus[0];
  currentMenuInstance: MyMenu[] = this.menus;

  hide = false;

  constructor(public deviceDetector: DeviceDetectorService,
              public rootState: MainStateService,
              public renderer: Renderer2,
              public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    setTimeout(() => {
      this.hide = true
    }, 2000);



    /* listen untuk breakpointObserver */
    this.subscribers.push(
      this.breakpointObserver
        .observe([`(max-width: ${MAX_WIDTH}px)`])
        .subscribe(state => this.rootState.smallSizeReached(!state.matches))
    );
  }


  ngOnDestroy(): void {
    this.subscribers.forEach(value => value.unsubscribe());
    this.subscribers = [];
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

  clear(m: MyMenu | MyMenu[]) {
    let menus = [];
    if ((<any[]> m).length) {
      menus = [...(<any[]> m)];
    } else {
      menus.push(m);
    }

    for (const menu of menus) {
      menu.hasActive = '';
      if (menu.hasChilds) {
        this.clear(menu.hasChilds);
      }
    }
  }

  selectMenu(menu: MyMenu, menus = this.menuInstance) {
    this.currentMenuInstance = menus;

    for (const m of menus) {
      if (m.name === menu.name) {
        menu.hasActive = 'active';
        this.currentMenu = menu;
      } else {
        this.clear(m);
      }
    }
  }

  selectAllHisRootMenu(m: MyMenu) {

    for (const c of this.menus) {
      if (c.name !== m.roots.names[0])
      this.clear(c)
    }

    let topMenu = this.menus;
    for (const name of m.roots.names) {
      const next = <MyMenu> topMenu.filter(v => v.name === name)[0];
      topMenu = next.hasChilds;
      next.hasActive = 'active';
    }
  }

  onMenuClicked(menu: MyMenu, opt: any, nav) {

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
          this.hide = true
        }, 1000);


        this.selectMenu(menu);
        const backs = this.menuInstance.filter(value => value.isBack);
        if (this.menuInstance.filter(value => value.isBack).length > 0) {
          this.selectAllHisRootMenu(backs[0]);
        }
      } else { /* jika menu mempunyai sub menu, maka menu yang ditampilkan adalah sub menunya */
        this.menuInstance = menu.hasChilds;
      }

    }
  }

  current() {

    for (const cm of this.currentMenuInstance) {
      if (this.menuInstance.filter(value => value.name === cm.name).length === 0) {
        this.menuInstance = this.currentMenuInstance;
        break;
      }
    }


  }
}
