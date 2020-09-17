import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CyclomaticService } from './cyclomatic.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ProjectServiceProxy, ProjectSlocDetail } from '@shared/service-proxies/service-proxies';
import { readFile } from 'fs';

export interface Ratio{
    Low : number,
    Medium: number
    High:number
}
@Component({
    moduleId: module.id,
    selector: 'cyclomatic',
    templateUrl: 'cyclomatic.component.html',
    styleUrls: ['cyclomatic.component.scss'],
    animations: [appModuleAnimation()],
})
export class CyclomaticComponent implements OnInit{

    constructor(
        private _internalService : CyclomaticService,
        private projectService: ProjectServiceProxy
    ){}
    ngOnInit(){
        
        this.projectService.getUserID().subscribe(result=>{
            this.userid=result
        })
        this.projectService.getListSlocDetail().subscribe(result =>{
            this.projects = result.items
        })       
    }   
    userid:number
    projects: ProjectSlocDetail[] =[]
    InitGraph(RFile,TFile,RFunction, TFunction){
        $(function () {
            // Widgets count
            $('.count-to').countTo();

            // Sales count to
            $('.sales-count-to').countTo({
                formatter: function (value, options) {
                    return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ',');
                }
            });

            
            initDonutChart1(RFile,TFile);
            initDonutChart2(RFunction,TFunction);
        });
        function initDonutChart1(RFile,TFile) {
            ((window as any).Morris).Donut({
                element: 'file_chart',
                data: [{
                        label: 'Low',
                        value: (RFile.Low/ TFile*100).toFixed(1)
                    }, {
                        label: 'Medium',
                        value: (RFile.Medium/ TFile*100).toFixed(1)
                    }, {
                        label: 'High',
                        value: (RFile.High/ TFile*100).toFixed(1)
                    }],
                colors: ['rgb(102, 255, 153)', 'rgb(255, 255, 102)', 'rgb(233, 30, 99)'],
                formatter: function (y) {
                    return y + '%';
                }
            });

            
        }

        function initDonutChart2(RFunction,TFunction){
            ((window as any).Morris).Donut({
                element: 'function_chart',
                data: [{
                        label: 'Low',
                        value: (RFunction.Low/ TFunction *100).toFixed(1)
                    }, {
                        label: 'Medium',
                        value: (RFunction.Medium/ TFunction *100).toFixed(1)
                    }, {
                        label: 'High',
                        value: (RFunction.High/ TFunction *100).toFixed(1)
                    }],
                colors: ['rgb(51, 204, 255)', 'rgb(102, 102, 255)', 'rgb(77, 0, 153)'],
                formatter: function (y) {
                    return y + '%';
                }
            });
        }
    }
    selectedProject : ProjectSlocDetail
    RFile : Ratio
    TFile : number
    RFunction : Ratio
    TFunction : number
    buttonDis: boolean = false
    showGraph:boolean =false
    CalCyclomatic(){
        this._internalService.CyclomaticCal(this.userid,this.selectedProject.id).subscribe(result =>{
            this.RFile = result["Ratio Result by File"]
            this.TFile = result.files
            this.RFunction = result["Ratio Result by Function"]
            this.TFunction = result.functions
            this.showGraph =true
            this.buttonDis = true
            this.InitGraph(this.RFile,this.TFile,this.RFunction,this.TFunction)
        })
    }
}
