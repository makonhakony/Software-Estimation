import { Injector, Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { request } from "http";

@Injectable()
export class CreateProjectService {
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

    a: any
    // Clonegit(username: string, title: string, link: string) {
    //     // var params= [{"username": username,
    //     //             "name": title,
    //     //             "url": link}]
    //     let body = new HttpParams()
    //         .set('username', username)
    //         .set('name', title)
    //         .set('url', link)

    //     console.log("clonegit body: ", body)
    //     // let _headers = new HttpHeaders({
    //     //     'Content-Type': 'application/x-www-form-urlencoded',
    //     //     'Access-Control-Allow-Origin': '*',
    //     //     'Access-Control-Allow-Credentials': 'true'
    //     // })

    //     // let options = {
    //     //     headers: {
    //     //         'Content-Type': 'application/json',
    //     //         'Access-Control-Allow-Origin': '*',
    //     //         'Access-Control-Allow-Credentials': 'true'
    //     //     }
    //     // };

    //     this.a = this.http.post<any>("http://hcthanh.ddns.net:3000/api/CloneGit",
    //         body

    //     )
    //     .pipe(
    //         catchError(this.handleError),
    //     )
    //     console.log("test: ", this.a)
    //     return this.a
    // }

    // UploadProject(username: string, title: string, file: File) {
    //     let formData = new FormData()
    //     formData.append("username",username)
    //     formData.append("name",title)
    //     formData.append("file",file)


    //     this.a = this.http.post<any>("http://hcthanh.ddns.net:3000/api/UploadProject",
    //         formData

    //     ).pipe(
    //         catchError(this.handleError),
    //     )
    //     console.log("test: ", this.a)
    //     return this.a
    // }

    
    GetSloc(username: string, title: string){
        let body = new HttpParams()
        .set('username',username)
        .set("name",title)
    
        return this.http.post<any>("http://hcthanh.ddns.net:3000/api/GetSloc",
        body,
        {
            responseType:'json'
        }
        )
        .pipe(catchError(this.handleError))
    }


    // test() {
    //     // const xhr = new XMLHttpRequest();
    //     // xhr.open('POST', 'https://bar.other/resources/post-here/');
    //     // xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
    //     // xhr.setRequestHeader('Content-Type', 'application/xml');
    //     // xhr.onreadystatechange = handler;
    //     // xhr.send('<person><name>Arun</name></person>'); 
    //     let _headers= new HttpHeaders({

    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Credentials': 'true'})
    //     this.a = this.http.get<any>("https://59e6cff05e2f.ngrok.io/api/Hello", {
    //       // headers:{
    //       //   CORS_ALLOW_HEADERS : 'accept'
    //       // },
    //       headers: _headers,
    //       responseType: 'json'
    //     },
    //     ).pipe(catchError(this.handleError))
    //     console.log(typeof this.a)
    //     return this.a;
    //   }
}