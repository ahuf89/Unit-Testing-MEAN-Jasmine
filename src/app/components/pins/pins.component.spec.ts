import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { RepositoryService } from 'src/app/services/repository.service';
import { PinsService } from './pins.service';
import { PinsComponent } from './pins.component';
import { of, Subject } from 'rxjs';
import { PINS } from 'src/app/services/mocks/pins';
import {  NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Crear stubs

class RepositoryServiceStub {// stub relacionado con el repositorio
  observer = new Subject();// crear variable interna y asignarle un nuevo subject con el objetivo de tener un control total de todas las cosas que pasen con los observables
  
  getPins(){
    return this.observer;//retorna el observable para que se puedan subscribir a los cambios
  }

  resolvePins(){
    this.observer.next(JSON.parse(JSON.stringify(PINS)));//resuelva con una nueva copia de los pins
    //funcion json.stringify para convertir el objeto en string y volverlo objeto para copiar el objeto
  }

  updatePin(){//retorna un observable
    return of(true);
  }
  
}

class MatSnackBarStub {//ejecutar el metodo open
  open(){}
}

class PinsServiceStub {
  observer = new Subject();
  $actionObserver = this.observer.asObservable();
  //metodo para retornar 
  public resolve(action){
    return this.observer.next(action);
  } 
}

fdescribe('PinsComponent', () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinsComponent ],
      // espias para los servicios
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub},
        { provide: MatSnackBar,       useClass: MatSnackBarStub},
        { provide: PinsService,       useClass: PinsServiceStub}        
      ],
      // Importar modulo reactiveFormsModule
      imports: [
        ReactiveFormsModule
      ],
      // Eliminar errores de esquema
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When new page is open', () => {
    const open = spyOn(window, 'open');

    component.openUrl('https://platzi.com');

    expect(open).toHaveBeenCalledWith('https://platzi.com', '_blank');
  });

  it('When update progress', ()=>{
    component.pins = PINS;
    const pin = PINS[0];
    const updatePin = spyOn((<any>component).repository, 'updatePin').and.returnValue(of(true));
    const open = spyOn((<any>component).snackBar, 'open');
    const pinService = TestBed.get(PinsService);
    // const pinService = TestBed.inject(PinsService);
    // const pinService =  TestBed.inject(PinsService) as MockStore<any>;
    // const pinService =  TestBed.inject(PinsService) as MockStore<any>;
    //  const pinService = TestBed.inject(PinsService) as jasmine.SpyObj<PinsService>;
    // valueServiceSpy = TestBed.inject(PinsService) as jasmine.SpyObj<PinsService>;

    
    pinService.resolve('save'); 

    expect(open).toHaveBeenCalled();

    // expect(open).toHaveBeenCalledWith('Your pin is saved, Redirecting ...', 'Cool!', {
    //   duration: 2000//que se llame con esos tres elementos
    // });

    expect(updatePin).toHaveBeenCalled();  
  });
});
