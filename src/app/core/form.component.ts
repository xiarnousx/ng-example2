import {Component, Inject} from '@angular/core';
import {Product} from '../model/product.model';
import {Model} from '../model/repository.model';
import {MODES, SHARED_STATE, SharedState} from './SharedState.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'paForm',
    templateUrl: './form.component.html',
    styleUrls: ['form.component.css']
})
export class FormComponent {
    product: Product = new Product();
    lastId: number;
    editing: boolean = false;

    constructor(
        private model: Model,
        @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>,
        private activeRoute: ActivatedRoute,
        private router: Router
    ) {
        this.editing = activeRoute.snapshot.params['mode'] == 'edit';
        const id = activeRoute.snapshot.params['id'];
        activeRoute.params.subscribe(params => {
           this.editing = params['mode'] == 'edit';
           const id = params['id'];
           if (id != null) {
               Object.assign(this.product, model.getProduct(id) || new Product());
           }
        });
        /*if (id != null) {
            const name = activeRoute.snapshot.params['name'];
            const category = activeRoute.snapshot.params['category'];
            const price = activeRoute.snapshot.params['price'];

            if (
                name != null
                && category != null
                && price != null
            ) {
                this.product.id = id;
                this.product.name = name;
                this.product.category = category;
                this.product.price = price;
            } else {
                Object.assign(this.product, this.model.getProduct(id) || new Product());
            }
        }*/
      /*  stateEvents.subscribe((update) => {
            this.product = new Product();
            if (update.id != null) {
                Object.assign(this.product, this.model.getProduct(update.id));
            }

            this.editing = update.mode == MODES.EDIT;
        });*/
    }

    submitForm(form: NgForm) {
        if (form.valid) {
            this.model.saveProduct(this.product);
            this.product = new Product();
            form.reset();
            this.router.navigateByUrl('/');
        }
    }

    resetForm() {
        this.product = new Product()
    }
}
