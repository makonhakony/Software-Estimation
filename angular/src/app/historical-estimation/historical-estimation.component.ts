import { Component } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateNewHistoricalComponent } from './create-new-historical/create-new-historical.component';
import { MatDialog } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'historical-estimation',
    templateUrl: 'historical-estimation.component.html',
    styleUrls: ['historical-estimation.component.scss'],
    animations: [appModuleAnimation()]
})
export class HistoricalEstimationComponent {
    constructor(
        public dialog: MatDialog,
    ){

    }

    createOldEstimation(){
        const dialogRef = this.dialog.open(CreateNewHistoricalComponent, {
            width: '1000px'
        });
        dialogRef.afterClosed().subscribe(async result => {

        })
    }
}
