import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'; // Simular rutas
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Servicio de autenticación
import { MenuController } from '@ionic/angular'; // Servicio del menú

describe('AppComponent', () => {
  let mockAngularFireAuth: any;
  let mockMenuController: any;

  beforeEach(async () => {
    // Crear mocks de los servicios utilizados
    mockAngularFireAuth = {
      authState: {
        subscribe: jasmine.createSpy('subscribe'),
      },
      signOut: jasmine.createSpy('signOut'),
    };

    mockMenuController = {
      close: jasmine.createSpy('close').and.returnValue(Promise.resolve()),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule], // Importamos RouterTestingModule para manejar rutas
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: MenuController, useValue: mockMenuController },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Deberia navegar a la pagina mensaje', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  
    const navigateSpy = spyOn(app['router'], 'navigate'); // Espiar el método `navigate` del Router
    await app.goToMensajes(); // Llamar al método
  
    expect(navigateSpy).toHaveBeenCalledWith(['/mensaje']); // Verificar que se navegó a `/mensaje`
  });
  

  it('Debería navegar a la página publicacion paseador ', async () => {
    const mockMenuController = {
      close: jasmine.createSpy('close').and.returnValue(Promise.resolve())
    };
  
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  
    // Reemplazar el controlador de menú del componente con el mock
    app['menuCtrl'] = mockMenuController as any;
  
    await app.goToPublicacionPaseador();
  
    // Verificar que el método close del mock fue llamado
    expect(mockMenuController.close).toHaveBeenCalled();
  });
  

  it('Verifica el estado de autenticacion', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const isAuthenticated = app.verificarAutenticacion();
    expect(isAuthenticated).toBe(true);
  });
});
