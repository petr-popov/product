import { Headers } from '@angular/http';

export class ResponseWrapper {
    constructor(
        public json: any,
        public status: number
    ) { }
}
