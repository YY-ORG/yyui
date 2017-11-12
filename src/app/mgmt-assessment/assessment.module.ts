
import { NgModule } from '@angular/core';

// common

import { CommonComponentModule } from '../../components/common.module';
import { PipeModule } from '../../pipe';

//routing
import { AssessmentRouting } from './assessment.routing';

//component
import { ContinueEducationeComponent } from './continue-educatione/continue-educatione.component'
import { ExaminationPaperComponent } from './examination-paper/examination-paper.component'
import { ExaminationAssessComponent } from './examination-assess/examination-assess.component'
import { PersonalDescriptionComponent } from './personal-description/personal-description.component'
import { DeEducationeComponent } from './de-educatione/de-educatione.component'
import { CanReviewComponent } from './can-review/can-review.component'
import { DemocraticTestComponent } from './democratic-test/democratic-test.component'
import { OrdinaryTimesComponent } from './ordinary-times/ordinary-times.component'
import { ForProjectComponent } from './for-project/for-project.component'
import { SendingManuscriptComponent } from './sending-manuscript/sending-manuscript.component'
import { ExaminationTemplateComponent } from './examination-template/examination-template.component'
import { ExaminationAssesspaperComponent } from './examination-assesspaper/examination-assesspaper.component'

//service
import { ExaminationPaperService } from './examination-paper/examination-paper.service'
import { ExaminationAssessService } from './examination-assess/examination-assess.service'
import { ExaminationTemplateService } from './examination-template/examination-template.service'
import { ExaminationAssesspaperService } from './examination-assesspaper/examination-assesspaper.service'

// module
import { AssessTemplateModule } from '../components/assess-template/assess-template.module'
import { AssessQuestionsModule } from '../components/assess-questions/assess-questions.module'
import { AssessPaperModule } from '../components/assess-paper/assess-paper.module'


@NgModule({
    imports: [
        AssessmentRouting,
        CommonComponentModule,
        PipeModule,
        AssessTemplateModule,
        AssessQuestionsModule,
        AssessPaperModule
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
        SendingManuscriptComponent,
        ExaminationAssessComponent,
        ExaminationTemplateComponent,
        ExaminationAssesspaperComponent
    ],
    exports: [
    ],
    providers: [
        ExaminationPaperService,
        ExaminationAssessService,
        ExaminationTemplateService,
        ExaminationAssesspaperService
    ]

})
export class AssessmentModule { }