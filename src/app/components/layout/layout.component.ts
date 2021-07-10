import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActionsComponent } from '../actions/actions.component';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public editMode = false;

  constructor(private bottomSheet: MatBottomSheet, private router: Router) {}

  ngOnInit() {
    this.verifyEditMode(this.router.url);

    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((event: NavigationStart) => {
      this.verifyEditMode(event.url);
    });
  }

  public verifyEditMode(url) {
    if (url === '/app/add') {
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  public openBottomSheet(): void {
    this.bottomSheet.open(ActionsComponent);
  }

}
