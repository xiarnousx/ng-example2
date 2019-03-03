import {NgModule} from '@angular/core';
import {Model} from './repository.model';
import {HttpClientModule} from '@angular/common/http';
import {REST_URL, RestDatasource} from './rest.datasource';


@NgModule({
    imports: [HttpClientModule],
    providers: [
        Model,
        RestDatasource,
        {provide: REST_URL, useValue: `http://${location.hostname}:3500/products`}
    ]
})
export class ModelModule {}
