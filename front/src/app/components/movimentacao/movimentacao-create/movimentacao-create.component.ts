import { movimentacao, movimentacaoUsuario } from './../movimentacao.model';
import { movimentacaoService } from './../movimentacao.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimentacao-create',
  templateUrl: './movimentacao-create.component.html',
  styleUrls: ['./movimentacao-create.component.css']
})

export class movimentacaoCreateComponent implements OnInit {
  
  @Input() loginUsuario: any

  movimentacaoUsuario: movimentacaoUsuario = {
    loginUsuario: null,
  }
  
  movimentacao: movimentacao = {
    quantidade: null,
    tipo_movimentacao: '', 
    id_usuario: window.localStorage.getItem('idUsuario'),
    id_produto: null,
    idmovimentacao: null, 
    data_hora: null,
    login_usuario: '',
    nome_produto: '',
  }
  
  movimentacoes: movimentacao /// carrega os dados no select

  constructor(
    private movimentacaoService: movimentacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.movimentacaoService.teste().subscribe(movimentacoes => {
      this.movimentacoes = movimentacoes
    })

    var usuario = window.localStorage.getItem('idUsuario');
    this.loginUsuario = usuario
  }

  createmovimentacao(): void {

    if(this.movimentacao.quantidade <= 0) {
      this.movimentacaoService.showMessage('Quantidade deve ser maior que 0', true)
      return;
    }

    this.movimentacaoService.create(this.movimentacao)
    .subscribe(data => {
      this.movimentacaoService.showMessage('criado!')
      this.router.navigate(['/movimentacoes'])
    })

  }

  cancel(): void {
    this.router.navigate(['/movimentacoes'])
  }
}
