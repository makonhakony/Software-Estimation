import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'create-new-historical',
    templateUrl: 'create-new-historical.component.html',
    styleUrls: ['create-new-historical.component.scss']
})
export class CreateNewHistoricalComponent {
    constructor(
        public dialogRef : MatDialogRef<CreateNewHistoricalComponent>
    ){}
    title:string
    description :string

    save(){
        this.dialogRef.close({title:this.title,description:this.description})
    }

    onNoClick(){
        this.dialogRef.close()
    }
}
