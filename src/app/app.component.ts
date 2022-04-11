import { Component } from '@angular/core';

import { AutenticacaoService } from './autenticacao/services/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'filmes-angular';

  font_size = 16;

  //Increase, decrease and set default font size
  setFontSize(idd: string) {

    //calc font size
    if(idd === 'a+' && this.font_size < 22){
      this.font_size += 2;
    } else if(idd === 'a-' && this.font_size > 12) {
      this.font_size -= 2;
    } else if(idd === 'a') {
      this.font_size = 16;
    }

    //set font size
    let htmlRoot:HTMLElement = <HTMLElement> document.getElementsByTagName("html")[0];
    if (htmlRoot != null) {
       htmlRoot.style.fontSize = `${this.font_size}px`;
    }

  }

  constructor(public autenticacaoService: AutenticacaoService ){

  }
}
