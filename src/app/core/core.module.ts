import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ModelModule} from '../model/model.module';
import {TableComponent} from './table.component';
import {FormComponent} from './form.component';
import {SHARED_STATE, SharedState} from './SharedState.model';
import {Subject} from 'rxjs';
import {RouterModule} from '@angular/router';
import {ProductCountComponent} from './productCount.component';
import {CategoryCountComponent} from './categoryCount.component';
import {NotFoundComponent} from './notFound.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModelModule,
        RouterModule
    ],

    declarations: [
        TableComponent,
        FormComponent,
        ProductCountComponent,
        CategoryCountComponent,
        NotFoundComponent
    ],
    providers: [
        {provide: SHARED_STATE, useValue: new Subject<SharedState>()}
    ],
    exports: [
        ModelModule,
        TableComponent,
        FormComponent
    ]
})
export class CoreModule {}
