import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { categoria } from "./categoria.model";
import { Observable, EMPTY } from "rxjs";
import {  map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})

export class categoriaService {
 
  baseUrl = "http://54.90.39.27:5000/categorias";



  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  read(): Observable<categoria[]> {
    return this.http.get<categoria[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(idcategoria: number): Observable<categoria> {
    const url = `${this.baseUrl}/${idcategoria}`;
    return this.http.get<categoria>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  create(categoria: categoria): Observable<categoria> {
    return this.http.post(`${this.baseUrl}/novo`, categoria).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(categoria: categoria): Observable<categoria> {
    const url = `${this.baseUrl}/${categoria.idcategoria}`;
    return this.http.put<categoria>(url, categoria).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(idcategoria: number): Observable<categoria> {
    const url = `${this.baseUrl}/${idcategoria}`;
    return this.http.delete<categoria>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
