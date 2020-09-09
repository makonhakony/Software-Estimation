import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProjectServiceProxy, ProjectDetailOutput, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ProjectDetailService, Pending, Status } from './project-detail.service';
import { promises } from 'dns';
export interface PieElement{
    label : string,
    value: number,
}
@Component({
    moduleId: module.id,
    selector: 'project-detail',
    templateUrl: 'project-detail.component.html',
    styleUrls: ['project-detail.component.scss'],
    animations: [appModuleAnimation()]
})

export class ProjectDetailComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        private _projectService: ProjectServiceProxy,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _internalService: ProjectDetailService,
        private _userService: UserServiceProxy
    ) {
        super(injector)
    }
    show: boolean = false
    readonly Status = Status;
    projectId: any
    projectDetail: any
    userID: any
    Pie: PieElement[] =[]
    TotalSloc: number
    ngOnInit() {
        this.project = new ProjectDetailOutput()
        this._activatedRoute.params.subscribe((params: Params) => {
            this.projectId = params['projectId'];
            this.loadProject().subscribe((result:ProjectDetailOutput) => {
                this.project =result
                this._projectService.getUserID().subscribe((result: any) => {
                    this.userID = result
                    this._internalService.GetInfo(this.userID.toString(), this.projectId).subscribe((result: any) => {
                        console.log(result)
                        this.projectDetail = result                    
                    })
                    this._internalService.GetType(this.userID.toString(), this.projectId).subscribe((result)=>{
                        this.TotalSloc = result["SLOC"]
                        result['Type'].forEach(element => {
                            this.Pie.push({label: element['Language'],value:element['detail']['LogicalSLOC'] })
                        });
                        console.log(this.Pie)
                        this.Pie.pop()
                        
                        this.Pie.forEach(element => {
                            
                            element.value = Number((element.value/this.TotalSloc * 100).toFixed(1))
                            
                        });
                        this.InitGraph(this.Pie)
                    })
                    
                    
                })


            })
        })
    }
    project: ProjectDetailOutput
    resulttest:any
    calculateProject() {
        console.log(this.project.title)
        console.log(this.userID)
    }

    deleteProject() {
        this._internalService.DeletGit(this.userID, this.projectId).subscribe((result: any) => {
            console.log(result)
            this._projectService.delete(this.projectId).subscribe(() => {
                abp.notify.info('Successfully delete the link');
                this._router.navigate(['app/project'])

            })
        })

    }
    loadProject() {


        // this._projectService.getProjectDetail(this.projectId).subscribe((result:ProjectDetailOutput)=>{
        //     this.project =result

        return this._projectService.getProjectDetail(this.projectId)
    }
    listfile:any
    toggle() {
        this.show = !(this.show)
        this._internalService.GetListFile(this.userID,this.projectId).subscribe((result:any)=>{
            this.listfile=result
        })

    }

    EditProject(){
        
    }
    DoCocomo(){
        this._router.navigate(['app/cocomo'],{queryParams: {id:this.project.id}})
    }
    projectload: Pending<any>;
    isCalculating:boolean=false
    UccAgain(){
        this.projectload = this._internalService.load(this.userID, this.projectId)
        if (this.projectload){
            this.projectload.request.subscribe(()=>{
                this.isCalculating=true
            })
        }
    }

    InitGraph(Pie){
        $(function () {
            // Widgets count
            $('.count-to').countTo();

            // Sales count to
            $('.sales-count-to').countTo({
                formatter: function (value, options) {
                    return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ',');
                }
            });

            
            initDonutChart1(Pie);
            
        });
        function initDonutChart1(Pie) {
            
            ((window as any).Morris).Donut({
                element: 'type_chart',
                data: Pie,
                // data: [{
                //         label: 'Low',
                //         value: 33
                //     }, {
                //         label: 'Medium',
                //         value: 33
                //     }, {
                //         label: 'High',
                //         value: 23
                //     }],
                colors: ['rgb(233, 30, 99)', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', 'rgb(0, 150, 136)', 'rgb(96, 125, 139)','rgb(102, 255, 153)', 'rgb(255, 255, 102)', 'rgb(233, 30, 99)'],
                formatter: function (y) {
                    return y + '%';
                }
            });      
        }
    }
}
