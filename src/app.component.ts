import {Component, Input, Output,EventEmitter,OnChanges,SimpleChange,OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
					<router-outlet></router-outlet>
               `,
})
export class AppComponent {}
