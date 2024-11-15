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

    await app.goToMensajes();
    expect(mockMenuController.close).toHaveBeenCalled();
  });

  it('Deberia navegar a la pagina publicacion paseador', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    await app.goToPublicacionPaseador();
    expect(mockMenuController.close).toHaveBeenCalled();
  });

  it('Verifica el estado de autenticacion', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const isAuthenticated = app.verificarAutenticacion();
    expect(isAuthenticated).toBe(true);
  });
});
