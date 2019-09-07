import { Component, OnInit } from '@angular/core';
import {MainStateService} from '../../../../shared/services/main-state.service';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.scss']
})
export class NoContentComponent implements OnInit {

  constructor(public rootState: MainStateService) { }

  ngOnInit() {
  }

}
