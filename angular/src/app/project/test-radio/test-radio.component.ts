import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'test-radio',
    templateUrl: 'test-radio.component.html',
    styleUrls: ['test-radio.component.scss']
})
export class TestRadioComponent {
    //testtttttttttttttttttttttttttttt
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

            
            initDonutChart1();
            initDonutChart2();
        });
        function initDonutChart1() {
            ((window as any).Morris).Donut({
                element: 'file_chart',
                data: [{
                        label: 'haha',
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

        function initDonutChart2(){
            ((window as any).Morris).Donut({
                element: 'function_chart',
                data: [{
                        label: 'hoho',
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
