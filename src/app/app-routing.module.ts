import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'filmes'},
  { path: 'filmes', loadChildren: () => import('./filmes/filmes.module').then(m => m.FilmesModule)},
  { path: 'categorias', loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule)},
  { path: 'estudios', loadChildren: () => import('./estudio/estudio.module').then(m => m.EstudioModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)},
  { path: 'detalhes', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
