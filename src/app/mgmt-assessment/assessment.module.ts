
import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../components/common.module';
import { PipeModule } from '../../pipe';

//routing
import { AssessmentRouting } from './assessment.routing';

//component
import { ContinueEducationeComponent } from './continue-educatione/continue-educatione.component'
import { ExaminationPaperComponent } from './examination-paper/examination-paper.component'
import { PersonalDescriptionComponent } from './personal-description/personal-description.component'
import { DeEducationeComponent } from './de-educatione/de-educatione.component'
import { CanReviewComponent } from './can-review/can-review.component'
import { DemocraticTestComponent } from './democratic-test/democratic-test.component'
import { OrdinaryTimesComponent } from './ordinary-times/ordinary-times.component'
import { ForProjectComponent } from './for-project/for-project.component'
import { SendingManuscriptComponent } from './sending-manuscript/sending-manuscript.component'

//service
import { ExaminationPaperService } from './examination-paper/examination-paper.service'


@NgModule({
    imports: [
        AssessmentRouting,
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        ContinueEducationeComponent,
        ExaminationPaperComponent,
        PersonalDescriptionComponent,
        DeEducationeComponent,
        CanReviewComponent,
        DemocraticTestComponent,
        OrdinaryTimesComponent,
        ForProjectComponent,
        SendingManuscriptComponent
    ],
    exports: [
    ],
    providers: [
        ExaminationPaperService
    ]

})
export class AssessmentModule { }