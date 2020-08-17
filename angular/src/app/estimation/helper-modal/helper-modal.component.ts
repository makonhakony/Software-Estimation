import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface HelperDetail{
    title: string
    description: string
}
@Component({
    moduleId: module.id,
    selector: 'helper-modal',
    templateUrl: 'helper-modal.component.html',
    
})
export class HelperModalComponent {
    constructor(
        
        @Inject(MAT_DIALOG_DATA) public data: HelperDetail,
        
        public dialogRef: MatDialogRef<HelperModalComponent>,
    ){
        
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    
}
