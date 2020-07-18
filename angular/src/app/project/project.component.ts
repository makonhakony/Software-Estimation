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

export interface ProjectListLoad extends ProjectListDto{
    isCalculating : boolean
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
        private _planService : PlanServiceProxy,
        public dialog: MatDialog,
        private http:HttpClient,
        private _internalService: InternalProjectService,
        private _router : Router,
    ) {
        //super(injector);
        
    }
    userID :string
    ngOnInit(){
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
    planList: PlanListDto[] = [];
    projectListLoad: ProjectListLoad[] =[]

    panelOpenState1:boolean[]=[];
    panelOpenState2:boolean[]=[];
    projectId:string =''

    isCalculating:boolean =false
    createProject() {
        this.project = new ProjectInput()
        
        const dialogRef = this.dialog.open(CreateProjectComponent, {
            width: '550px',
            data: {title: this.project.title, description:this.project.description, type:this.project.type, linkURL:this.project.linkURL, ProjectId:this.projectId}
        });
        dialogRef.afterClosed().subscribe(async result => {
            
            console.log('after close:',result)
            this.projectId=result.projectId
            //START UCC HERE
            this.projectload = await this._internalService.load(this.userID, result.data.title)
            this.isCalculating = true
            debugger
            if (this.projectload){
            this.projectload.request.subscribe((result2)=>{
                
                this._projectService.modifySlocValue(this.projectId,result2.SLOC).subscribe(()=>{
                    console.log(this.projectId,result2.SLOC)
                })
                
            })
            this.loadProject()
            
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

        this._planService.getListProject()
        .subscribe((result: ListResultDtoOfPlanListDto) => {
            this.planList = result.items;
            this.planList.forEach(()=>{
                this.panelOpenState1.push(false)
                this.panelOpenState2.push(false)
            })
        });
    }
    compare:boolean = false
    dataTrigger(){
        this.compare = !(this.compare)
        console.log(this.compare)
    }

    
    

    flag1:boolean =false
    flag2:boolean = false

    checkedRes:string[] =[]
    isCheckCompared:boolean =false
    OnCheck(title: string){
        
        if (!this.flag1){
            //1 not checked
            this.flag1 = true
            this.checkedRes.push(title)
        }
        else{
            //1 checked
            
            if (this.flag2){
                //2 checked
            }
            else{
                //2 not checked
                
                if (title == this.checkedRes[0]){
                    this.checkedRes.pop()
                    this.flag1 =false
                }
                else{
                    this.flag2 =true
                    this.checkedRes.push(title)
                }
                
            }
        }
        console.log(this.checkedRes)
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
            'Something bad happened: ',error.error.message);
    };
    Compare2Projects(){
        this._projectService.getUserID().subscribe((result:any)=>{
            this._internalService.Compare(result,this.checkedRes[0],this.checkedRes[1]).subscribe((result:any)=>{
                console.log(result)
            })  
        })
        
              
    }

    EstimateUCP(id,status,tit,des){
        this._router.navigate(['/app/ucp'], {queryParams: {id:id, status: status, title: tit, description : des}}) //router query param not param!
           
    }
}
