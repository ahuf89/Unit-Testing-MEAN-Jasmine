//creacion de una prueba unitaria

// importar rutas desde el componente donde se definieron las rutas
import { routes } from './app-routing.module';
import { PinsComponent } from './components/pins/pins.component';

//especificar un "describe" para agrupar las pruebas


fdescribe('App Routing', ()=>{//forzado 

    // ciclos de vida de las pruebas unitarias
    beforeAll(()=>{
        console.log("Before All");// Antes de todas las pruebas
    });

    beforeEach(()=>{
        console.log("Before Each");// Antes de cada prueba
    });

    afterAll(()=>{
        console.log("After All");// Despues de todas las prueba
    });

    afterEach(()=>{
        console.log("After Each");// Despues de cada prueba
    });

    //probar que tiene el path con la variable app en appRoutingModule
    it('Should have app as path', () => {
        //se prueba el array con el 0
        expect(routes[0].path).toBe('app');
    });
    
    
});
