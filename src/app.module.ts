import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonComponentModule } from './components/common.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NglModule } from 'ng-lightning/ng-lightning';

import { routing } from './app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        // BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        CoreModule,
        CommonComponentModule,
        routing,
    ],
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
