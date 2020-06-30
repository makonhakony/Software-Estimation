import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ProjectDetailService implements OnInit
{
    constructor(
        private http: HttpClient
    ){

    }
    ngOnInit(){

    }
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
            'Something bad happened: bad input.');
    };

    GetInfo(username: string, title: string){
        let body = new HttpParams()
        .set('username',username)
        .set("name",title)
    
        return this.http.post<any>("http://hcthanh.ddns.net:3000/api/GetInfo",
        body,
        {
            responseType:'text' as 'json'
        }
        )
        .pipe(catchError(this.handleError))
    }

    

    DeletGit(username: string, title: string){
        let body = new HttpParams()
        .set('username',username)
        .set("name",title)
    
        return this.http.post<any>("http://hcthanh.ddns.net:3000/api/DeleteGit",
        body,
        {
            responseType:'json'
        }
        )
        .pipe(catchError(this.handleError))
    }

    GetListFile(username:string, title:string){
        let body = new HttpParams()
        .set('username',username)
        .set("name",title)
    
        return this.http.post<any>("http://hcthanh.ddns.net:3000/api/GetListFile",
        body,
        {
            responseType:'text' as 'json'
        }
        )
        .pipe(catchError(this.handleError))
    }
}