import { Component, OnInit, Input, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ProjectCalInfoService } from './project-cal-info.service';
import { AppComponentBase } from '@shared/app-component-base';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'project-cal-info',
    templateUrl: 'project-cal-info.component.html',
    styleUrls: ['project-cal-info.component.scss'],
    animations: [appModuleAnimation()]
})
export class ProjectCalInfoComponent extends AppComponentBase implements OnInit 
{

    
    constructor(
        injector: Injector,
        private _internalService : ProjectCalInfoService,
        private _activatedRoute: ActivatedRoute,
    ){
        super(injector)
    }
    userID:any
    Title:any
    result:any
    BlockOfResult:Array<any>
    projectID:any
    ngOnInit(){
        this._activatedRoute.params.subscribe((params: Params) => {
            this.BlockOfResult= []
            this.Title = params['projectTitle'];
            this.userID = params['userId'];
            this.projectID = params['projectId'];
            //debugger
            this._internalService.ShowUCC(this.userID, this.projectID).subscribe((result: any) => {
                console.log(result)
                this.result = result
                
                //console.log(this.resulttest[0]["                                    USC Unified CodeCount (UCC)                                    "])
                this.ResultGenerator()
                //debugger
                console.log(this.BlockOfResult)
            })
            
        });
        
    }
    

    ResultGenerator(){
        
        let block=0,line=0
        this.BlockOfResult.push([])
        for(let i=0; i<this.result.length;i++){
            
            if (this.result[i][0]==null){
                //this is the break
                
                this.BlockOfResult.push([])
                block++
                line=0
            }
            else {
                this.BlockOfResult[block].push([])
                for(let j=0;j<Object.keys(this.result[i]).length;j++){
                    this.BlockOfResult[block][line].push(this.result[i][j])              
                }
                line++
                
            }
            
        }
    }


}
