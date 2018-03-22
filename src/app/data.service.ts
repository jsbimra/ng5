import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; //for to communicate between difference ng5 components

@Injectable()


export class DataService {

    //behaviorSubject goals of type any (<any> and set initital value )
    private goals = new BehaviorSubject<any>(['The inital goal', 'Another silly life goal']);

    goal = this.goals.asObservable(); //another property called goal equals to behaviorSubject goals as Observable

    constructor() { }

    changeGoal(goal) {
        this.goals.next(goal);
    }

}
