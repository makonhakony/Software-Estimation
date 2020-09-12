import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    moduleId: module.id,
    selector: 'custom-sloc',
    templateUrl: 'custom-sloc.component.html',
    styleUrls: ['custom-sloc.component.scss']
})
export class CustomSlocComponent {
    constructor(
        public dialogRef: MatDialogRef<CustomSlocComponent>,
    ){

    }
    sloc: number
    save(){
        this.close();
    }
    close(): void {
        this.dialogRef.close({data:this.sloc})
    }
    onNoClick(){
        this.dialogRef.close()
    }
}
