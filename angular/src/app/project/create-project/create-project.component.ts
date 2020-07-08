import { Component, ViewChild, ElementRef, Output, EventEmitter, Injector, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { ProjectInput, ProjectServiceProxy, UserServiceProxy, PlanServiceProxy, PlanInput } from '@shared/service-proxies/service-proxies';
import { finalize, catchError } from 'rxjs/operators';

import * as _ from "lodash";
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { CreateProjectService } from './create-porject.service';
import { async } from '@angular/core/testing';
@Component({
    moduleId: module.id,
    templateUrl: 'create-project.component.html',
    styleUrls: ['create-project.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateProjectComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        public dialogRef: MatDialogRef<CreateProjectComponent>,
        private _projectService: ProjectServiceProxy,
        private _planService : PlanServiceProxy,
        @Inject(MAT_DIALOG_DATA) public data: ProjectInput,
        @Inject(MAT_DIALOG_DATA) public data2: PlanInput,
        private http: HttpClient,
        private internalService: CreateProjectService,

    ) {
        super(injector);
    }
    ProjectType:string 
    options2= ['Project', 'Plan']
    options: string[] = ["Link", "Input file"]
    ProjectForm: FormGroup
    userID: any
    ngOnInit() {
        // this.ProjectForm = new FormGroup({
        //     'name': new FormControl(this.data.linkURL, [
        //       Validators.required,
        //       Validators.minLength(4),
        //       //forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
        //     ]),
        //     'alterEgo': new FormControl(this.hero.alterEgo),
        //     'power': new FormControl(this.hero.power, Validators.required)
        //   });
        this._projectService.getUserID().subscribe((result: any) => {
            this.userID = result
        })
    }
    onNoClick(): void {
        this.dialogRef.close();
    }


    save(): void {

        // this.event.date = moment($('#datetime').val());
        // console.log(this.event.date)
        if (this.data.type == "Link") {
            this.internalService.Clonegit(this.userID.toString(), this.data.title, this.data.linkURL).subscribe((result: any) => {
                console.log("after post:", result)
                this._projectService.createWithLink(this.data).subscribe(() => {

                    console.log("this data: ", this.data)
                    this.notify.info(this.l('SavedSuccessfully'));

                    // this.internalService.test().subscribe((result:any)=>{
                    //     console.log("test func: ",result)
                    // })
                    console.log(this.userID)
                    this.close();

                });

                //START UCC HERE
                this.internalService.CalculateSize(this.userID, this.data.title).subscribe((result)=>{
                    console.log(result)
                })
            })

        }
        else if (this.data.type == "Input file") {
            this.data.linkURL = this.fileToUpload.name
            this.internalService.UploadProject(this.userID.toString(), this.data.title, this.fileToUpload).subscribe((result: any) => {
                console.log("after post:", result)
                this._projectService.createWithLink(this.data) //actually this is file
                    .subscribe(async () => {
                        console.log("this data: ", this.data)
                        this.notify.info(this.l('SavedSuccessfully'));

                        // this.internalService.test().subscribe((result:any)=>{
                        //     console.log("test func: ",result)
                        // })   

                        console.log(this.userID)

                        this.close();

                    });
            })

        }

    }

    fileToUpload: File = null
    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    close(): void {
        this.dialogRef.close({data:this.data})
    }

    //-------------------PLAN-------------------------
    savePlan(){
        this._planService.createPlans(this.data2).subscribe(async () => {
            console.log("this data: ", this.data2)
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();

        });
    }
}
