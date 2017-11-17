import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpinnerService {
    public spinnerActive: EventEmitter<Boolean>;

    constructor() {
        this.spinnerActive = new EventEmitter();
    }


    activate() {
        this.spinnerActive.emit(true);
    }

    deactivate() {
        this.spinnerActive.emit(false);
    }


}