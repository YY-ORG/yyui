import { Component, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploadService } from  './upload-file.service'

@Component({
    selector: 'file-upload',
    template: '<input type="file" [multiple]="multiple" #fileInput>'
})
export class FileUploadComponent {
    @Input() multiple: boolean = false;
    @Output() onFileUpload=new EventEmitter();
    @ViewChild('fileInput') inputEl: ElementRef;

    constructor(
      private http: Http,
      private service: FileUploadService
    ) {}

    upload() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('file', inputEl.files[i]);
            }
            this.service.postfile(formData).subscribe(res => {
              console.log(this.onFileUpload)
              this.onFileUpload && this.onFileUpload.emit(res.json().resultContent)
            })
        }
    }
}