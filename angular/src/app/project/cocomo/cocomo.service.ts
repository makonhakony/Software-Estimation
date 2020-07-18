import { Injector, Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { request } from "http";

@Injectable()
export class CocomoService {
    constructor(
        private http: HttpClient
    ) { }
    
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened: ',error.error.message);
    };

    BasicCocomo(mode: number, size: number){
        let body = new HttpParams()
        .set('mode',mode.toString())
        .set("size",size.toString())
    
        return this.http.post<any>("http://hcthanh.ddns.net:3000/api/basiccocomo",
        body,
        {
            responseType:'json'
        }
        )
        .pipe(catchError(this.handleError))
    }
    InterCocomo(mode: number,option: number[], size: number){
        console.log(mode,option,size)
        return this.http.post<any>("http://hcthanh.ddns.net:3000/api/intermediatecocomo",
        {'mode':mode,'drivers':option,'size':size},
        {
            responseType:'json'
        }
        )
        .pipe(catchError(this.handleError))
    }
}