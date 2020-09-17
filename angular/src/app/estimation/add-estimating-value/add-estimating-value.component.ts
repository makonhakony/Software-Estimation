import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ProjectServiceProxy, ProjectSlocDetail } from '@shared/service-proxies/service-proxies';

@Component({
    moduleId: module.id,
    selector: 'add-estimating-value',
    templateUrl: 'add-estimating-value.component.html',
    styleUrls: ['add-estimating-value.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddEstimatingValueComponent {
    constructor(       
        public dialogRef: MatDialogRef<any>,
        private route: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _projectService:ProjectServiceProxy
    ){
        
    }

    SlocValue: number =null
    projects: ProjectSlocDetail[] = []
    SelectedProject:ProjectSlocDetail

    ngOnInit() {
        this.SelectedProject= new ProjectSlocDetail()
        this._projectService.getListSlocDetail().subscribe((result)=>{
            this.projects = result.items
        })  
    }
    SelectedValue:any ={
        name:'',value:'',point:0
    }
    SelectedValue2:string=''

    options : any[] = [
        {name : 'Constructive Cost Model', value: 'Cocomo' ,point: this.data.ccm},
        {name: 'Use Case Point ', value:'UCP', point: this.data.ucp},
        {name: 'Function Point ', value :'FP', point: this.data.fp}
    ]

    onNoClick(): void {
        this.dialogRef.close();
    }

    close(): void {
        this.dialogRef.close({message:'success'})
    }

    //-------------------Estimation-------------------------

    GotoEstimation(){
        if(this.SelectedValue.value=='UCP'){
            if (this.SelectedValue.point==0)
                this.route.navigate(['/app/ucp'], { queryParams: {id: this.data.id, status: false} }) //router query param not param!
            else
                this.route.navigate(['/app/ucp'], { queryParams: {id: this.data.id, status: true} }) //router query param not param!
        } else
        if(this.SelectedValue.value=='Cocomo'){
            this.route.navigate(['/app/cocomo'], { queryParams: {id: this.data.id, type:this.SelectedValue2, idP: this.SelectedProject.id, sloc: this.SlocValue|this.SelectedProject.sloc} }) //router query param not param!
        } else
        if(this.SelectedValue.value =='FP'){
            if (this.SelectedValue.point==0)
                this.route.navigate(['/app/fp'], { queryParams: {id: this.data.id, status: false} }) //router query param not param!
            else
                this.route.navigate(['/app/fp'], { queryParams: {id: this.data.id, status: true} }) //router query param not param!
        }
        this.close()

    }
    
}
