import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { ActionsComponent } from '../actions/actions.component';

class MatBottomSheetStub{
  open(){

  }

}

fdescribe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({// 1ro configurar el testBed
      declarations: [ LayoutComponent ],
      //crear stub
      providers: [{ provide: MatBottomSheet, useClass: MatBottomSheetStub}], //Cuando llames MatBottomSheet utices esta clase

      //importar el routingTestingModule
      imports: [RouterTestingModule.withRoutes([
        {
          path: '',
          component: LayoutComponent
        },
        {
          path: 'app/add',
          component: LayoutComponent
        }
      ])],
      //Utilizar los esquemas para los elementos que no estan definidos en la prueba (router-outlet app-menu)
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set the editMode to false', ()=>{
    const verifyEditMode = spyOn(component,'verifyEditMode').and.callThrough();//queremos que lo llame

    fixture.ngZone.run( ()=>{  

      (<any>component).router.navigate(['/']);//castiar el metodo privado router para acceder a el
      // Esperar que la aplicacion este estable (No funciono como en el tutorial)
      // fixture.whenStable().then(()=>{        
        expect(component.editMode).toBeFalsy();
        expect(verifyEditMode).toHaveBeenCalled();
      // });
    });
  });
  it('Should set the editMode to true', ()=>{
    const verifyEditMode = spyOn(component,'verifyEditMode').and.callThrough();//queremos que lo llame

    fixture.ngZone.run( ()=>{  

      (<any>component).router.navigate(['app/add']);//castiar el metodo privado router para acceder a el
      // Esperar que la aplicacion este estable (No funciono como en el tutorial)
      // fixture.whenStable().then(()=>{        
        expect(component.editMode).toBeTruthy();
        expect(verifyEditMode).toHaveBeenCalled();
      // });
    });
  });
  //Probar que el boton sea llamado con el componente ActionsComponent
  it('Should open',()=>{
    const open = spyOn((<any>component).bottomSheet, 'open');

    component.openBottomSheet();

    expect(open).toHaveBeenCalledWith(ActionsComponent);

  })
});
