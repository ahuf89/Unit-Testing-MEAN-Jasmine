import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { PinsService } from '../pins/pins.service';
import { ActionsComponent } from './actions.component';

class MatBottomSheetStub{}

class PinsServiceStub{}

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsComponent ],
      providers: [
        { provide: MatBottomSheetRef, useClass: MatBottomSheetStub },
        { provide: PinsService, useClass: PinsServiceStub}        
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
