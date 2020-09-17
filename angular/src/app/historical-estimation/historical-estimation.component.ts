import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateNewHistoricalComponent } from './create-new-historical/create-new-historical.component';
import { MatDialog } from '@angular/material';
import { HistoDto, HistoEstimationServiceProxy, HistoInput, HistoList } from '@shared/service-proxies/service-proxies';
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
    editMode :boolean[]=[]
    loadHisto(){
        this._histService.getListHisto().subscribe(result => {
            this.histoList = result.items
            this.histoList.forEach(()=>{
                this.editMode.push(false)
            })
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
    Update(i,title, description, type, effort, time, staff, point,id){
        var histo = new HistoDto()
        histo.title = title
        histo.description = description
        histo.type = type
        histo.effort = effort
        histo.time = time
        histo.staff = staff
        histo.point = point
        histo.id = id
        this.histoList[i].effort = effort
        histo.pf = histo.effort/histo.point
        this._histService.update(histo).subscribe(()=>{
            this.notify.info("Information changed!")
        })
    }
}
