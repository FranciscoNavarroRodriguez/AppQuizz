import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contador-inicial',
  templateUrl: './contador-inicial.component.html',
  styleUrls: ['./contador-inicial.component.scss']
})
export class ContadorInicialComponent implements OnInit, OnDestroy{

  contador: number = 3 
  setInterval: any

  constructor(private router: Router){}

  ngOnInit(): void {
    this.playContadorInicial()

  }
  
  ngOnDestroy(): void {
    clearInterval(this.setInterval)
  }


  playContadorInicial(){
    this.setInterval = setInterval(() => {
      if(this.contador === 1){
        this.router.navigate(['/jugar/realizar-quizz'])
      }
      this.contador--  
    },1000)
  }

}
