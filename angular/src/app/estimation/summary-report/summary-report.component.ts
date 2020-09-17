import { Component, OnInit, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PlanServiceProxy, PlanDetailOutput, UCPoint, Cocomo, FPoint } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute, Params } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    moduleId: module.id,
    selector: 'summary-report',
    templateUrl: 'summary-report.component.html',
    styleUrls: ['summary-report.component.scss'],
    animations: [appModuleAnimation()]
})
export class SummaryReportComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        private _planService: PlanServiceProxy,
        private activatedRoute: ActivatedRoute
    ) {
        super(injector)
    }

    planId: string
    plan: PlanDetailOutput

    showedUCP: UCPoint
    showedCCM: any
    showedFP: FPoint

    ucpSizeShowed: any
    fpSizeShowed: any
    ccmSizeShowed: any
    ngOnInit() {
        this.plan = new PlanDetailOutput
        this.showedUCP = new UCPoint()
        this.showedCCM = new Cocomo()
        this.showedFP = new FPoint()
        this.activatedRoute.params.subscribe((params: Params) => {
            this.planId = params["estimationId"]
            this._planService.getPlanDetail(this.planId).subscribe((result) => {
                this.plan = result


                this.showedCCM = result.ccm.slice(-1)[0]
                this.showedUCP = result.ucp.slice(-1)[0]
                this.showedFP = result.fp.slice(-1)[0]
                //debugger
                if (this.showedFP) {
                    this.showedFP.caf = Number(this.showedFP.caf.toFixed(1))
                    this.showedFP.fp = Number(this.showedFP.fp.toFixed(1))
                    this.showedFP.effort = Number(this.showedFP.effort.toFixed(1))
                    this.showedFP.time = Number(this.showedFP.time.toFixed(1))
                    this.fpSizeShowed = this.showedFP.fp
                } else {
                    this.fpSizeShowed = 0
                }
                if (this.showedCCM) {
                    this.showedCCM.effort = Number(this.showedCCM.effort.toFixed(1))
                    this.showedCCM.time = Number(this.showedCCM.time.toFixed(1))
                    this.ccmSizeShowed = this.showedCCM.sloc
                } else {
                    this.ccmSizeShowed = 0
                }
                if (this.showedUCP) {
                    this.showedUCP.ucp = Number(this.showedUCP.ucp.toFixed(1))
                    this.showedUCP.ef = Number(this.showedUCP.ef.toFixed(1))
                    this.showedUCP.tf = Number(this.showedUCP.tf.toFixed(1))
                    this.showedUCP.effort = Number(this.showedUCP.effort.toFixed(1))
                    this.showedUCP.time = Number(this.showedUCP.time.toFixed(1))
                    this.ucpSizeShowed = this.showedUCP.ucp
                } else {
                    this.ucpSizeShowed = 0
                }
                // debugger
            })

        })

    }
    textMessage: any
    msgHideAndShow: boolean = false
    // Text Message   
    textMessageFunc(msgText) {
        this.textMessage = msgText + " Copied to Clipboard";
        this.msgHideAndShow = true;
        setTimeout(() => {
            this.textMessage = "";
            this.msgHideAndShow = false;
        }, 1000);
    }
    CopyClipboard(summary) {
        summary.select()
        document.execCommand('copy')
        summary.setSelectionRange(0, 0)
        this.textMessageFunc('Date');
        this.notify.info(this.l('Copied!'));
    }

    generatePdf(action: string) {
        const documentDefinition = this.getDocumentDefinition();
        switch (action) {
            case 'open': pdfMake.createPdf(documentDefinition).open(); break;
            case 'print': pdfMake.createPdf(documentDefinition).print(); break;
            case 'download': pdfMake.createPdf(documentDefinition).download(); break;
            default: pdfMake.createPdf(documentDefinition).open(); break;
        }
    }
    getDocumentDefinition() {

        sessionStorage.setItem('resume', JSON.stringify(this.plan));
        var result: any = {
            content: [
                {
                    text: 'ESTIMATION RESULT SUMMARY',
                    bold: true,
                    fontSize: 20,
                    alignment: 'center',
                    margin: [0, 0, 0, 20]
                },
                {
                    columns: [
                        [{
                            text: this.plan.title,
                            style: 'name'
                        },
                        {
                            text: 'Description: ' + this.plan.description
                        },

                        
                        ]
                    ]
                },

            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 20, 0, 10],
                    decoration: 'underline'
                },
                name: {
                    fontSize: 16,
                    bold: true
                },
                jobTitle: {
                    fontSize: 14,
                    bold: true,
                    italics: true
                },
                tableHeader: {
                    bold: true,
                }
            }
        };
        if (this.showedUCP) {
            var title = {
                text: 'Use Case Point Model Estimation',
                style: 'header'
            }
            var u = this.getUCP()
            result.content.push(title, u)
        }
        if (this.showedFP) {
            var title = {
                text: 'Function Point Model Estimation',
                style: 'header'
            }
            var f = this.getFP()
            result.content.push(title, f)
        }
        if (this.showedCCM) {
            var title = {
                text: 'Constructive Cost Model (COCOMO) Estiamtion',
                style: 'header'
            }
            var c = this.getCCM()
            result.content.push(title, c)
            var git ={
                text: 'GitHub link: ' + (this.showedCCM) ? this.showedCCM.projects.linkURL : '',
                link: (this.showedCCM) ? this.showedCCM.projects.linkURL : '',
                color: 'blue',
            }
            result.content.columns[0].push(git)
        }
        var title = {
            text: 'Summary',
            style: 'header'
        }
        var sum = this.getTotal()
        result.content.push(title, sum)
        return result
    }

    getUCP() {
        return {
            table: {
                widths: ['*', '*'],
                body: [
                    [{
                        text: 'Detail',
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    {
                        text: 'Value',
                        style: 'tableHeader',
                        alignment: 'center'
                    }
                    ],
                    [{
                        text: 'Total Use Case Point'
                        
                    },
                    {
                        text: this.showedUCP.ucp,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Unadjusted use case point'

                    },
                    {
                        text: this.showedUCP.uucp,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Technical Complexity Factors'

                    },
                    {
                        text: this.showedUCP.tf,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Environmental Complexity Factors'

                    },
                    {
                        text: this.showedUCP.ef,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Effort (Person-Month)'

                    },
                    {
                        text: this.showedUCP.effort,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Time (Month)'

                    },
                    {
                        text: this.showedUCP.time,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Staff (Person)'

                    },
                    {
                        text: this.showedUCP.staff,
                        alignment: 'right'
                    }
                    ]
                ]
            }
        }
    }
    getFP() {
        return {
            table: {
                widths: ['*', '*'],
                body: [
                    [{
                        text: 'Detail',
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    {
                        text: 'Value',
                        style: 'tableHeader',
                        alignment: 'center'
                    }
                    ],
                    [{
                        text: 'Total Function point'

                    },
                    {
                        text: this.showedFP.fp,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Unadjusted use case point'

                    },
                    {
                        text: this.showedFP.ufp,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Technical Complexity Factors'

                    },
                    {
                        text: this.showedFP.caf,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Effort (Person-Month)'

                    },
                    {
                        text: this.showedFP.effort,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Time (Month)'

                    },
                    {
                        text: this.showedFP.time,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Staff (Person)'

                    },
                    {
                        text: this.showedFP.staff,
                        alignment: 'right'
                    }
                    ]
                ]
            }
        }
    }
    getCCM() {
        return {
            table: {
                widths: ['*', '*'],
                body: [
                    [{
                        text: 'Detail',
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    {
                        text: 'Value',
                        style: 'tableHeader',
                        alignment: 'center'
                    }
                    ],
                    [{
                        text: 'Total Size (Sloc)'

                    },
                    {
                        text: this.showedCCM.sloc,
                        alignment: 'right'
                    }
                    ],

                    [{
                        text: 'Effort (Person-Month)'

                    },
                    {
                        text: this.showedCCM.effort,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Time (Month)'

                    },
                    {
                        text: this.showedCCM.time,
                        alignment: 'right'
                    }
                    ],
                    [{
                        text: 'Staff (Person)'

                    },
                    {
                        text: this.showedCCM.staff,
                        alignment: 'right'
                    }
                    ]
                ]
            }
        }
    }
    getTotal() {
        return {
            table: {
                widths: ['*', '*', '*', '*', '*', '*'],
                body: [
                    [{
                        text: 'Size (Sloc)',
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    {
                        text: 'UCP',
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    {
                        text: 'FP',
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    {
                        text: 'Total Effort',
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    {
                        text: 'Duration',
                        style: 'tableHeader',
                        alignment: 'center'
                    },
                    {
                        text: 'Number of staff',
                        style: 'tableHeader',
                        alignment: 'center'
                    }
                    ],
                    //value
                    [{
                        text: this.ccmSizeShowed,
                        alignment: 'center'
                    },
                    {
                        text: this.ucpSizeShowed,
                        alignment: 'center'
                    },
                    {
                        text: this.fpSizeShowed,
                        alignment: 'center'
                    },
                    {
                        text: this.plan.totalEffort,
                        alignment: 'center'
                    },
                    {
                        text: this.plan.totalTime,
                        alignment: 'center'
                    },
                    {
                        text: this.plan.totalStaff,
                        alignment: 'center'
                    }
                    ]

                ]
            }
        }
    }
}
