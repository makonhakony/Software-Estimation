import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { PlanServiceProxy, PlanDetailOutput, UCPoint, SEPoint } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute, Params } from '@angular/router';
import { param } from 'jquery';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'estimation-detail',
    templateUrl: 'estimation-detail.component.html',
    styleUrls: ['estimation-detail.component.scss'],
    animations: [appModuleAnimation()]
})
export class EstimationDetailComponent extends AppComponentBase implements OnInit, AfterViewInit {
    constructor(
        injector : Injector,
        private _planService : PlanServiceProxy,
        private activatedRoute: ActivatedRoute
    ){
        super(injector)
    }
    planId :string
    plan: PlanDetailOutput
    ucpCreationTime: moment.Moment
    ngOnInit(){
        
        this.showedUCP = new UCPoint()
        this.showedSEP = new SEPoint()
        this.activatedRoute.params.subscribe((params: Params)=>{
            this.planId = params["estimationId"]
            this._planService.getPlanDetail(this.planId).subscribe((result)=>{
                this.plan = result
                
                this.showedSEP = result.sep.pop()
                this.showedUCP = result.ucp.pop()
                this.ucpCreationTime = this.showedUCP.creationTime
                console.log(this.showedSEP,this.showedUCP, this.ucpCreationTime)
                
            })
        })
    }

    showedUCP:UCPoint
    showedSEP:SEPoint

    ngAfterViewInit(){
        $(function () {
            // Widgets count
            $('.count-to').countTo();

            // Sales count to
            $('.sales-count-to').countTo({
                formatter: function (value, options) {
                    return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ',');
                }
            });

            
            initDonutChart();
            
        });
        function initDonutChart() {
            ((window as any).Morris).Donut({
                element: 'donut_chart',
                data: [{
                        label: 'Chrome',
                        value: 37
                    }, {
                        label: 'Firefox',
                        value: 30
                    }, {
                        label: 'Safari',
                        value: 18
                    }, {
                        label: 'Opera',
                        value: 12
                    },
                    {
                        label: 'Other',
                        value: 3
                    }],
                colors: ['rgb(233, 30, 99)', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', 'rgb(0, 150, 136)', 'rgb(96, 125, 139)'],
                formatter: function (y) {
                    return y + '%';
                }
            });
        }
    }

}
