import {Injectable} from '@angular/core';

import {Brand} from './brand.model';
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ResponseWrapper} from "../response-wrapper.model";

@Injectable()
export class BrandService {

  private resourceUrl = 'api/v1/brands';

  constructor(private http: HttpClient) {
  }

  create(brand: Brand): Observable<Brand> {
    const copy = this.convert(brand);
    return this.http.post(this.resourceUrl, copy).pipe(map((res) => {
      return res;
    }))
  }

  query(req?: any): Observable<ResponseWrapper> {
    return this.http.get(this.resourceUrl)
      .pipe(map((res: Response) => this.convertResponse(res)));
  }

  private convertResponse(res: Response): ResponseWrapper {
    return new ResponseWrapper(res, res.status);
  }

  private convert(brand: Brand): Brand {
    const copy: Brand = Object.assign({}, brand);
    return copy;
  }
}
