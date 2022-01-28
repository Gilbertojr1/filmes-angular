import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorias'
})
export class CategoriasPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'Animação': return 'auto_fix_high';
    }
    return 'auto_fix_high';
  }

}
