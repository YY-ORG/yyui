import { Component,  OnInit, ViewEncapsulation  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'


@Component({
	selector: 'personal-description',
	styleUrls: ["./personal-description.scss"],
	templateUrl: "./personal-description.template.html",
	encapsulation: ViewEncapsulation.None
})
export class PersonalDescriptionComponent extends PageClass implements OnInit {
	constructor(
	) {
		super()
	}

	public editor;
  public editorContent: string;
  public editorOptions = {
		placeholder: "请输入个人述职...",
		modules: {
			toolbar: [
				['bold', 'italic', 'underline'],
				['code-block'],
				[{ 'list': 'ordered'}, { 'list': 'bullet' }],
				[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
				[{ 'direction': 'rtl' }],                         // text direction
				[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
				[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
			
				[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
				[{ 'align': [] }],
			
				['clean']                                         // remove formatting button
			]
		},
  };

	willDeleteUser;
	editModalOpen: boolean = false;

  ngOnInit() {
   
  }

  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    console.log('quill content is changed!', quill, html, text);
  }
	
	deleteUser(d) {
		this.willDeleteUser = d;
		this.confirm.open("确定要删除此用户吗？")
	}

	editUser(d) {
		this.editModalOpen = true
	}

	onConfirm() {
		this.confirm.close()

		setTimeout(() => {
			this.alert.open("删除成功")
		}, 1000)
		console.log("23")
	}

}

