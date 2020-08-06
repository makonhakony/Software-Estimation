import { Component, ViewChild, Injector, OnInit } from '@angular/core';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectServiceProxy, ProjectInput, ListResultDtoOfProjectListDto, ProjectListDto, PlanServiceProxy, ListResultDtoOfPlanListDto, PlanListDto } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { MatDialog } from '@angular/material';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InternalProjectService, Status, Pending } from './project.service';
import { Router } from '@angular/router';
import { title } from 'process';

export interface ProjectListLoad extends ProjectListDto {
    isCalculating: boolean
}
@Component({
    templateUrl: 'project.component.html',

    animations: [appModuleAnimation()]
})
export class ProjectComponent implements OnInit {
    @ViewChild('createProjectModal') createProjectModal: CreateProjectComponent;
    readonly Status = Status;
    projectload: Pending<any>;

    constructor(
        injector: Injector,
        private _projectService: ProjectServiceProxy,
        private _planService: PlanServiceProxy,
        public dialog: MatDialog,
        private http: HttpClient,
        private _internalService: InternalProjectService,
        private _router: Router,
    ) {
        //super(injector);

    }
    userID: string
    ngOnInit() {
        this.loadProject()
        this._projectService.getUserID().subscribe((result: any) => {
            this.userID = result
        })
        //")
    }
    // ProjectInputChecked(): ProjectListDto & { checked: boolean} {
    //     return new ProjectListDto() as ProjectListDto & { checked: boolean};
    // }

    project: ProjectInput
    projectList: ProjectListDto[] = [];

    //projectListLoad: ProjectListLoad[] = []


    projectId: string = ''

    isCalculating: boolean = false
    FileUpload: File
    createProject() {
        this.project = new ProjectInput()

        const dialogRef = this.dialog.open(CreateProjectComponent, {
            width: '550px',
            data: { title: this.project.title, type: this.project.type, linkURL: this.project.linkURL, ProjectId: this.projectId, FileUpload: this.FileUpload }
        });
        dialogRef.afterClosed().subscribe(async result => {

            console.log('after close:', result)
            this.projectId = result.projectId
            this.loadProject()
            if (result.data.type == "Link") {
                this._internalService.Clonegit(this.userID.toString(), result.projectId, result.data.linkURL).subscribe(async (result1) => {
                    //START UCC HERE
                    console.log("1: ", result1)
                    this._projectService.modifySizeValue(this.projectId, result1.size).subscribe(()=>{
                        this.loadProject()
                    })

                    this.projectload = await this._internalService.load(this.userID, result.projectId)
                    this.isCalculating = true
                    //debugger
                    if (this.projectload) {
                        this.projectload.request.subscribe((result2) => {
                            console.log("2: ", result2)
                            this._projectService.modifySlocValue(this.projectId, result2.SLOC).subscribe(()=>{
                                this.loadProject()
                            })
                        })
                    }
                })

            }
            else {
                this._internalService.UploadProject(this.userID.toString(), result.projectId, result.FileUpload).subscribe(async (result1) => {
                    //START UCC HERE
                    this.projectload = await this._internalService.load(this.userID, result.data.title)
                    this.isCalculating = true
                    debugger
                    if (this.projectload) {
                        this.projectload.request.subscribe((result2) => {

                            this._projectService.modifySlocValue(this.projectId, result2.SLOC).subscribe(() => {
                                console.log(this.projectId, result2.SLOC)
                            })

                        })



                    }
                })
            }

        });
    }
    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this.loadProject();
        finishedCallback();
    }

    loadProject() {
        this._projectService.getListProject()
            .subscribe((result: ListResultDtoOfProjectListDto) => {

                this.projectList = result.items;

                //console.log("inside: ",this.projectList)
            });

        // this._planService.getListProject()
        //     .subscribe((result: ListResultDtoOfPlanListDto) => {
        //         this.planList = result.items;
        //         this.planList.forEach(() => {
        //             this.panelOpenState1.push(false)
        //             this.panelOpenState2.push(false)
        //         })
        //     });
    }
    compare: boolean = false
    dataTrigger() {
        this.compare = !(this.compare)
        console.log(this.compare)
    }




    flag1: boolean = false
    flag2: boolean = false

    checkedRes: string[] = []
    isCheckCompared: boolean = false
    OnCheck(title: string) {

        if (!this.flag1) {
            //1 not checked
            this.flag1 = true
            this.checkedRes.push(title)
        }
        else {
            //1 checked

            if (this.flag2) {
                //2 checked
            }
            else {
                //2 not checked

                if (title == this.checkedRes[0]) {
                    this.checkedRes.pop()
                    this.flag1 = false
                }
                else {
                    this.flag2 = true
                    this.checkedRes.push(title)
                }

            }
        }
        console.log(this.checkedRes)
    }

    Compare2Projects() {
        this._projectService.getUserID().subscribe((result: any) => {
            this._internalService.Compare(result, this.checkedRes[0], this.checkedRes[1]).subscribe((result: any) => {
                console.log(result)
            })
        })


    }

    EstimateUCP(id, status, tit, des) {
        this._router.navigate(['/app/ucp'], { queryParams: { id: id, status: status, title: tit, description: des } }) //router query param not param!

    }
}
