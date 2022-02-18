import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorias'
})
export class CategoriasPipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'Animação': return 'date_range';
    }
    return 'date_range';
  }

}
