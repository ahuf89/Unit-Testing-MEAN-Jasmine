import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { RepositoryService } from 'src/app/services/repository.service';
import { of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormArray } from '@angular/forms';

class RepositoryServiceStub {
  savePins() {
    return of(true);
  }
}

class NavigationServiceStub {
  goToPins() {}
}

class MatSnackBarStub {
  open() {
    return {
      afterDismissed: () => {
        return of(true);
      }
    };
  }
}

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  // beforeEach(async(() => {
  beforeEach(waitForAsync(() => {
  
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: NavigationService, useClass: NavigationServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 

  describe('When component is initializated', () =>{
    it('should create the form', ()=> {
      console.log(component.firstFormGroup.controls);
      expect(Object.keys(component.firstFormGroup.controls)).toEqual(['title', 'author', 'description']);//Obtiene los valores de las llaves
      expect(Object.keys(component.secondFormGroup.controls)).toEqual(['firstAsset', 'assets']);//Obtiene los valores de las llaves
    });     
  });
  
  describe('When addAsset is executed',()=>{
    
    it('Should add new group',()=>{
      const assets = <FormArray>component.secondFormGroup.get('assets');
      
      component.addAsset();
      component.addAsset();
      console.log(Object.keys(assets.controls));
      expect(Object.keys(assets.controls)).toEqual(['0', '1']);//Obtiene los valores de las llaves
    });
  });

  describe('When delete assets',()=>{
    it('Should remove the form control',()=>{
      const assets = <FormArray>component.secondFormGroup.get('assets');      
      
      component.addAsset();//Agrega un componente

      component.deleteAsset(0);//Borrar el componente
  
      expect(Object.keys(assets.controls)).toEqual([]);//Espera que este vacio

    });
  });

  describe('When savePins is executed',()=>{
    it('Should navigate to pins view',() =>{
      // Espia metodo privado y hace un casting a any y accede a el  metodo navegar para saber si fue llamado
      const navigate = spyOn((<any>component).navigate,'goToPins');
      
      // Espia para el metodo open del snackBar
      const open = spyOn((<any>component).snackBar, 'open').and.callThrough();
      
      component.savePin();//guardar el componente

      expect(navigate).toHaveBeenCalled();//espera que si todo se resuelve navegue a this.navigate.goToPins(); linea 95
      console.log('working')
      //Probar que el mensaje no se cambio 
      expect(open).toHaveBeenCalledWith('Your pin is saved, Redirecting ...', 'Cool!', {
        duration: 2000//que se llame con esos tres elementos
      });
    });
  });
});
