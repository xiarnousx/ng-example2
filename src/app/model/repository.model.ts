import {Injectable} from '@angular/core';
import {StaticDatasource} from './static.datasource';
import {Product} from './product.model';
import {RestDatasource} from './rest.datasource';
import {Observable} from 'rxjs';

@Injectable()
export class Model {
    private products: Product[] = new Array<Product>();
    private locator = (p: Product, id: number) => p.id == id;

    constructor(private dataSource: RestDatasource) {
        this.dataSource.getData().subscribe(data => this.products = data);
    }


    getProducts(): Product[] {
        return this.products;
    }

    getProduct(id: number): Product {
        return this.products.find(p => this.locator(p, id));
    }

    saveProduct(product: Product) {
        if (product.id == 0 || product.id == null) {
            this.dataSource.saveProduct(product).subscribe(p => this.products.push(p))
        } else {
            this.dataSource.updateProduct(product).subscribe( p => {
               const index = this.products.findIndex(item => this.locator(item, p.id));
               this.products.splice(index, 1, p);
            });
        }
    }

    deleteProduct(id: number) {
        this.dataSource.deleteProduct(id).subscribe(p => {
            const index = this.products.findIndex(item => this.locator(item, id));
            if (index > -1) {
                this.products.splice(index, 1);
            }
        })
    }

    getNextProductId(id: number): number {
        const index = this.products.findIndex( p => this.locator(p, id));
        if (index <= -1) {
            return id || 0;
        }

        const next = (this.products.length > index + 2) ? index + 1 : 0;
        return this.products[next].id;
    }

    getPreviousProductId(id: number): number {
        const index = this.products.findIndex(p => this.locator(p, id));

        if(index <= -1) {
            return id || 0;
        }

        const prev = (index > 0) ? index - 1 : this.products.length - 1;
        return this.products[prev].id;
    }
}
