import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterTestingModule } from '@angular/router/testing'; // Para simular navegación
import { Router } from '@angular/router';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [RouterTestingModule], // Módulo para simular rutas
      providers: [
        {
          provide: AngularFireAuth,
          useValue: {
            signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword'), // Simula la función
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería navegar a la página de registro', () => {
    const router = TestBed.inject(Router); // Inyecta Router en lugar de RouterTestingModule
    const navigateSpy = spyOn(router, 'navigate'); // Espía el método navigate
  
    component.goToRegister(); // Llama al método del componente
  
    expect(navigateSpy).toHaveBeenCalledWith(['/registro']); // Verifica que navigate se llamó con el argumento correcto
  });
});
