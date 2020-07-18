import { Injector, Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, retry, tap } from "rxjs/operators";
import { throwError, Observable, ReplaySubject, defer } from "rxjs";
import { request } from "http";

export interface Pending<T> {
    data: Observable<T>;
    status: Observable<Status>;
    request:any
}

export enum Status {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}


@Injectable({ providedIn: 'root' })
export class InternalProjectService {
    constructor(
        private http: HttpClient
    ) { }

    load(username: string, title: string): Pending<number> {
        const status = new ReplaySubject<Status>();
        let body = new HttpParams()
            .set('username', username)
            .set("name", title)

        const request = this.http.post<any>("http://hcthanh.ddns.net:3000/api/UCCUrlMac",
        body,
        {
            responseType: 'json'
        })
        .pipe(
            retry(2),
            catchError(error => {
                status.next(Status.ERROR);
                throw 'error loading user';
                
              }),
              tap(() => status.next(Status.SUCCESS)),           
            // catchError(error2 => {
            //     status.next(Status.ERROR);
            //     this.handleError
            // })
        );

        const data = defer(() => {
            status.next(Status.LOADING);
            return request;
          });
          //debugger
        return { data, status ,request };
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
            'Something bad happened: ', error.error.message);
    };

    Compare(username: string, project1: string, project2: string) {
        let body = new HttpParams()
            .set('username', username)
            .set('project1', project1)
            .set('project2', project2)

        console.log(username)

        return this.http.post<any>("http://hcthanh.ddns.net:3000/api/Compare",
            body

        )

            .pipe(
                catchError(this.handleError),
            )
    }

    test:any
    CalculateSize(username: string, title: string) {
        let body = new HttpParams()
            .set('username', username)
            .set("name", title)

        this.test= this.http.post<any>("http://hcthanh.ddns.net:3000/api/UCCUrlMac",
            body,
            {
                responseType: 'json'
            }
        )
            .pipe(catchError(this.handleError))
        return this.test
    }

}