import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

fdescribe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;//Crear variable que se va a compartir en todos los test de unidad // component fixture Nos permite acceder a todas propiedades de la clase incluyendo el template
  let component: AppComponent; //variable golbal que se comparte a lo largo de la aplicacion

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });
  // configuracion para que todos mis test puedan acceder alfixture del tipo appComponent
  beforeEach(()=>{
    fixture = TestBed.createComponent(AppComponent);//el fixture se actualiza con este valor
    component = fixture.debugElement.componentInstance; //Dame una instancia de mi componente
  });

  it('Should have a router oputlet', () =>{
    const de = fixture.debugElement.query(By.directive(RouterOutlet)); //solicitarle al fixture del debug element un qwery(con el objeto By dentro podemos solicitar un query con todos los elementos html)

    expect(de).not.toBeNull();//que no sea nulo

  });


  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'proyecto'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('proyecto');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('proyecto app is running!');
  // });
});
