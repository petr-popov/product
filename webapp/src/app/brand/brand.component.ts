import { Component } from '@angular/core';
import {Brand} from "./brand.model";
import {BrandService} from "./brand.service";
import {ResponseWrapper} from "../response-wrapper.model";

@Component({
  template:  `
    <div>
      <h2>
        <!--todo replace createFormVisible with angular router-->
        <button
          type="button" class="btn btn-primary"
          *ngIf="!createFormVisible" (click)="showCreateForm()">
          <span class="fa fa-plus"></span>
          <span >Create new Brand</span>
        </button>
      </h2>
      <form class="form" role="form" *ngIf="createFormVisible" (ngSubmit)="createBrand()">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" name="name" id="username" placeholder="Name"
                 [(ngModel)]="newBrandName">
        </div>
        <button type="submit" class="btn btn-primary">Create</button>
      </form>
      <div class="row">
      </div>
      <br/>
      <div class="table-responsive" *ngIf="brands">
        <table class="table table-striped">
          <thead>
          <tr>
            <th><span>ID</span></th>
            <th><span>Name</span></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let brand of brands ;trackBy: trackId">
            <td>{{brand.id}}</td>
            <td>{{brand.name}}</td>
            <td class="text-right">
              <div class="btn-group flex-btn-group-container">
                <button type="submit"
                        replaceUrl="true"
                        class="btn btn-danger btn-sm">
                  <span class="fa fa-remove"></span>
                  <span class="hidden-md-down">Delete</span>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class BrandComponent {
  brands: Brand[];
  createFormVisible: boolean;
  newBrandName: string;

  constructor(
    private brandService: BrandService,
  ) {
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.brandService.query().subscribe(
      (res: ResponseWrapper) => {
        this.brands = res.json;
      },
      (res: ResponseWrapper) => this.onError(res.json)
    );
  }

  trackId(index: number, item: Brand) {
    return item.id;
  }

  private onError(error) {
    console.log(error)
  }

  showCreateForm() {
    this.createFormVisible = true;
  }

  createBrand() {
    this.brandService.create(new Brand(undefined, this.newBrandName)).subscribe(
      (res: Brand) => {
        this.loadAll();
        this.createFormVisible = false;
      }
    )
  }
}
