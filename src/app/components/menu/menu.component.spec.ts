import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MenuComponent } from './menu.component';

fdescribe('MenuComponent', () => {//forzar prueba
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.innerHTML).toBe('eLearning Management System');
  });
  // Probando output asincrono
  it('Testing output',()=>{
    const val = true;
    component.clicked.subscribe(result => {//Se subscribe al observable boolean
      
      expect(result).toBe(val);//espera que result sea igual a val      
    });

    component.clicked.next(val);//resuelve el valor en el scope local
  });
  
  // Eventos HTML||
  it('Testing click',()=>{
    let button = fixture.debugElement.query(By.css('button'));//solicitar query de tipo css
    console.log(component.counter);
    expect(component.counter).toBe(0);

    button.triggerEventHandler('click', null);//Ejecuta el click
    
    console.log(component.counter);

    expect(component.counter).toBe(1);
  });
});
