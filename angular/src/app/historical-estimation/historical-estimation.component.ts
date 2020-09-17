import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateNewHistoricalComponent } from './create-new-historical/create-new-historical.component';
import { MatDialog } from '@angular/material';
import { HistoEstimationServiceProxy, HistoInput, HistoList } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    moduleId: module.id,
    selector: 'historical-estimation',
    templateUrl: 'historical-estimation.component.html',
    styleUrls: ['historical-estimation.component.scss'],
    animations: [appModuleAnimation()]
})
export class HistoricalEstimationComponent extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
        public dialog: MatDialog,
        private _histService : HistoEstimationServiceProxy
    ){
        super(injector)
    }
    histoList: HistoList[] = []
    ngOnInit(){

        this.loadHisto()
    }
    loadHisto(){
        this._histService.getListHisto().subscribe(result => {
            this.histoList = result.items
        })
    }
    histo: HistoInput
    createOldEstimation(){
        const dialogRef = this.dialog.open(CreateNewHistoricalComponent, {
            width: '1300px'
        });
        dialogRef.afterClosed().subscribe(async result => {
            console.log(result)
            this.notify.info(this.l('SavedSuccessfully'));
            this.histo = new HistoInput()
            this.histo.title = result.title
            this.histo.description = result.description
            this.histo.type = result.type
            this.histo.time = result.time
            this.histo.staff = result.staff
            this.histo.effort = result.effort
            this.histo.point =result.point
            this.histo.pf = result.pf
            this._histService.createHistoEst(this.histo).subscribe(()=>{
                this.loadHisto()
            })
        })
    }
    DeleteHist(id){
        this._histService.delete(id).subscribe(()=>{
            this.notify.info('Delete Successfully')
            this.loadHisto()
        })
    }
}
