
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
import { FirstCommentComponent } from './first-comment/first-comment.component'
import { FirstCommentPaperComponent } from './first-comment-paper/first-comment-paper.component'
import { CanReviewComponent } from './can-review/can-review.component'
import { DemocraticTestComponent } from './democratic-test/democratic-test.component'
import { OrdinaryTimesComponent } from './ordinary-times/ordinary-times.component'
import { ForProjectComponent } from './for-project/for-project.component'
import { SendingManuscriptComponent } from './sending-manuscript/sending-manuscript.component'
import { ExaminationTemplateComponent } from './examination-template/examination-template.component'
import { ExaminationAssesspaperComponent } from './examination-assesspaper/examination-assesspaper.component'
import { ExaminationCategoryComponent } from './category/category.component'
import { ExaminationTemplateitemComponent } from './templateitem/templateitem.component'
import { SetScoringComponent } from './set-scoring/set-scoring.component'
import { SetScoringCategoryComponent } from './set-scoring-category/set-scoring-category.component'

//service
import { ExaminationPaperService } from './examination-paper/examination-paper.service'
import { ExaminationAssessService } from './examination-assess/examination-assess.service'
import { ExaminationTemplateService } from './examination-template/examination-template.service'
import { ExaminationAssesspaperService } from './examination-assesspaper/examination-assesspaper.service'
import { AssessCategoryService } from './category/category.service'
import { TemplateitemService } from './templateitem/templateitem.service'
import { FirstCommentPaperService } from './first-comment-paper/first-comment-paper.service'
import { FristCommentService } from './first-comment/first-comment.service'
import { SetScoringService } from './set-scoring/set-scoring.service'
import { SetScoringCategoryService } from './set-scoring-category/set-scoring-category.service'

// module
import { AssessTemplateModule } from '../components/assess-template/assess-template.module'
import { AssessQuestionsModule } from '../components/assess-questions/assess-questions.module'
import { AssessPaperModule } from '../components/assess-paper/assess-paper.module'
import { AssessCategoryModule } from '../components/assess-category/assess-category.module'
import { TemplateitemModule } from '../components/assess-templateitem/assess-templateitem.module'
import { ExaminationAssessModule } from '../components/examination-assess/examination-assess.module'
import { ExaminationTableModule } from '../components/examination-table/examination-table.module'


@NgModule({
    imports: [
        AssessmentRouting,
        CommonComponentModule,
        PipeModule,
        AssessTemplateModule,
        AssessQuestionsModule,
        AssessPaperModule,
        AssessCategoryModule,
        AssessCategoryModule,
        TemplateitemModule,
        ExaminationAssessModule,
        ExaminationTableModule
    ],
    declarations: [
        ContinueEducationeComponent,
        ExaminationPaperComponent,
        PersonalDescriptionComponent,
        FirstCommentComponent,
        FirstCommentPaperComponent,
        CanReviewComponent,
        DemocraticTestComponent,
        OrdinaryTimesComponent,
        ForProjectComponent,
        SendingManuscriptComponent,
        ExaminationAssessComponent,
        ExaminationTemplateComponent,
        ExaminationAssesspaperComponent,
        ExaminationCategoryComponent,
        ExaminationTemplateitemComponent,
        SetScoringComponent,
        SetScoringCategoryComponent
    ],
    exports: [
    ],
    providers: [
        ExaminationPaperService,
        ExaminationAssessService,
        ExaminationTemplateService,
        ExaminationAssesspaperService,
        AssessCategoryService,
        TemplateitemService,
        FristCommentService,
        FirstCommentPaperService,
        SetScoringService,
        SetScoringCategoryService
    ]

})
export class AssessmentModule { }