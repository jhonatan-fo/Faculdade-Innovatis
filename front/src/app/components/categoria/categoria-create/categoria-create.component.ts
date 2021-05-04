import { categoria } from './../categoria.model';
import { categoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class categoriaCreateComponent implements OnInit {

  categoria: categoria = {
    nome_categoria: ''
  }

  constructor(private categoriaService: categoriaService,
      private router: Router) { }

  ngOnInit(): void {
    
  }
 

  createcategoria(): void {
    this.categoriaService.create(this.categoria).subscribe(data => {
      console.log(data)
      this.categoriaService.showMessage('criado!')
      this.router.navigate(['/categorias'])
    })
  }

  cancel(): void {
    this.router.navigate(['/categorias'])
  }
}
