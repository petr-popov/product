import {Injectable} from '@angular/core';

import {Brand} from './brand.model';
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {ResponseWrapper} from "../response-wrapper.model";

@Injectable()
export class BrandService {

  private resourceUrl = 'api/v1/brands';

  constructor(private http: Http) {
  }

  create(brand: Brand): Observable<Brand> {
    const copy = this.convert(brand);
    return this.http.post(this.resourceUrl, copy).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  update(brand: Brand): Observable<Brand> {
    const copy = this.convert(brand);
    return this.http.put(this.resourceUrl, copy).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  find(id: number): Observable<Brand> {
    return this.http.get(`${this.resourceUrl}/${id}`).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  query(req?: any): Observable<ResponseWrapper> {
    return this.http.get(this.resourceUrl)
      .pipe(map((res: Response) => this.convertResponse(res)));
  }

  delete(id: number): Observable<Response> {
    return this.http.delete(`${this.resourceUrl}/${id}`)
      .pipe(map((res: Response) => this.convertResponse(res)));
  }

  private convertResponse(res: Response): ResponseWrapper {
    const jsonResponse = res.json();
    return new ResponseWrapper(jsonResponse, res.status);
  }

  private convert(brand: Brand): Brand {
    const copy: Brand = Object.assign({}, brand);
    return copy;
  }
}
