import { Component, Injector, AfterViewInit, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PlanServiceProxy, PlanListDto, UserServiceProxy, ProjectServiceProxy, ProjectListDto } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash';
import * as moment from 'moment';

@Component({
    templateUrl: './home.component.html',
    animations: [appModuleAnimation()]
})
export class HomeComponent extends AppComponentBase implements OnInit {

    constructor(
        injector: Injector,
        private _planService: PlanServiceProxy,
        private _projectService: ProjectServiceProxy
    ) {
        super(injector);

    }

    number_estimation: number = 0
    number_project: number = 0
    number_ucp: number = 0
    number_ccm: number = 0
    number_fp: number = 0
    planList: PlanListDto[] = []
    userid: any
    name: string
    surname: string
    progressValue: number[] = []
    projectList: ProjectListDto[] = []
    languageDictionary: string[] =[]
    ngOnInit() {

        this._planService.generalInformation().subscribe((result) => {
            this.number_estimation = result.nPlan
            this.number_project = result.nProject
            this.number_ucp = result.nUCP
            this.number_ccm = result.nCcm
            this.number_fp = result.nFP
            this.planList = result.allPlan
            this.planList.forEach(estimation => {
                this.EstimationMoment(estimation)
            })

            this.name = result.name
            this.surname = result.surname
            console.log(this.planList)

            this.planList.forEach(p => {
                var i = 0
                if (p.ucpLatest)
                    i += 1
                if (p.ccmLatest)
                    i += 1
                if (p.fpLatest)
                    i += 1
                this.progressValue.push(i)
            })
            this.CreateView(name, this.surname)

        })
        this._projectService.getListProject().subscribe(async result => {
            this.projectList = result.items
            await this.projectList.forEach(project => {
                this.ProjectMoment(project)
                //this.PushToLanguageDict(this.TakeLanguage(project.languages))
            })
            
            console.log(this.languageDictionary)
        })

    }
    ne_today: number = 0
    ne_yesterday: number = 0
    ne_lastweek: number = 0
    EstimationMoment(e: PlanListDto) {

        var date = e.creationTime
        var now = moment()
        var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(date, "DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        if (d.days() == 0)
            this.ne_today += 1
        else if (d.days() == 1)
            this.ne_yesterday += 1
        else this.ne_lastweek += 1

    }
    np_recently: number = 0
    np_fewdays: number = 0
    np_fewweeks: number = 0
    np_fewmonths: number = 0
    np_fewyears: number = 0
    ProjectMoment(p: ProjectListDto) {

        var date = p.creationTime
        var now = moment()
        var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(date, "DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        if (d.days() == 0 && d.days() == 1)
            this.np_recently += 1
        else if (d.days() > 1 && d.days() <= 7)
            this.np_fewdays += 1
        else if (d.days() > 7 && d.days() <= 30)
            this.np_fewweeks += 1
        else if (d.months() > 1 && d.months() < 12)
            this.np_fewmonths += 1
        else this.np_fewyears += 1

    }

    TakeLanguage(language: string): string[] {
        var languageArray = []
        languageArray.push(language.split(','))
       
        return languageArray
    }
    PushToLanguageDict(array: string[]) {
        array.forEach(element => {
            if (this.languageDictionary.length == 0)
                this.languageDictionary.push(element)
            else
                for (let lang in this.languageDictionary) {
                    if (lang != element) {
                        this.languageDictionary.push(element)
                    }
                }
        })
        

    }
    CreateView(name, surname) {


        $(function () {
            // Widgets count
            $('.count-to').countTo();

            //         // Sales count to
            //         $('.sales-count-to').countTo({
            //             formatter: function (value, options) {
            //                 return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ',');
            //             }
            //         });

            //         initRealTimeChart();
            //         initDonutChart();
            initSparkline();
        });

        //     let realtime = 'on';
        //     function initRealTimeChart() {
        //         // Real time ==========================================================================================
        //         const plot = ($ as any).plot('#real_time_chart', [getRandomData()], {
        //             series: {
        //                 shadowSize: 0,
        //                 color: 'rgb(0, 188, 212)'
        //             },
        //             grid: {
        //                 borderColor: '#f3f3f3',
        //                 borderWidth: 1,
        //                 tickColor: '#f3f3f3'
        //             },
        //             lines: {
        //                 fill: true
        //             },
        //             yaxis: {
        //                 min: 0,
        //                 max: 100
        //             },
        //             xaxis: {
        //                 min: 0,
        //                 max: 100
        //             }
        //         });

        //         function updateRealTime() {
        //             plot.setData([getRandomData()]);
        //             plot.draw();

        //             let timeout;
        //             if (realtime === 'on') {
        //                 timeout = setTimeout(updateRealTime, 320);
        //             } else {
        //                 clearTimeout(timeout);
        //             }
        //         }

        //         updateRealTime();

        //         $('#realtime').on('change', function () {
        //             realtime = (this as any).checked ? 'on' : 'off';
        //             updateRealTime();
        //         });
        //         // ====================================================================================================
        //     }

        function initSparkline() {
            $('.sparkline').each(function () {
                const $this = $(this);
                $this.sparkline('html', $this.data());
            });
        }

        //     function initDonutChart() {
        //         ((window as any).Morris).Donut({
        //             element: 'donut_chart',
        //             data: [{
        //                     label: 'Chrome',
        //                     value: 37
        //                 }, {
        //                     label: 'Firefox',
        //                     value: 30
        //                 }, {
        //                     label: 'Safari',
        //                     value: 18
        //                 }, {
        //                     label: 'Opera',
        //                     value: 12
        //                 },
        //                 {
        //                     label: 'Other',
        //                     value: 3
        //                 }],
        //             colors: ['rgb(233, 30, 99)', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', 'rgb(0, 150, 136)', 'rgb(96, 125, 139)'],
        //             formatter: function (y) {
        //                 return y + '%';
        //             }
        //         });
        //     }

        //     let data = [];
        //     const totalPoints = 110;

        //     function getRandomData() {
        //         if (data.length > 0) { data = data.slice(1); }

        //         while (data.length < totalPoints) {
        //             const prev = data.length > 0 ? data[data.length - 1] : 50;
        //             let y = prev + Math.random() * 10 - 5;
        //             if (y < 0) { y = 0; } else if (y > 100) { y = 100; }

        //             data.push(y);
        //         }

        //         const res = [];
        //         for (let i = 0; i < data.length; ++i) {
        //             res.push([i, data[i]]);
        //         }

        //         return res;
        //     }
    }

}
