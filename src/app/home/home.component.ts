import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	animations: [

		//first arg name of animation to trigger
		trigger('goals', [
			//first arg any wild card * to any wildcard *
			transition('* => *', [

				query(':enter', style({ opacity: 0 }), {optional : true}),

				//stagger is function allows you to take a no of element in dom, like list of instance, delay 3000ms, will delay..
				query(':enter', stagger('300ms', [
					animate('.6s ease-in', keyframes([
						style({opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
						style({opacity: .5, transform: 'translateY(35px)', offset: .3 }),
						style({opacity: 1, transform: 'translateY(0)', offset: 1 }),
				]))]), {optional : true}),

				query(':leave', stagger('300ms', [
					animate('.6s ease-in', keyframes([
						style({opacity: 1, transform: 'translateY(0)', offset: 0 }),
						style({opacity: .5, transform: 'translateY(35px)', offset: .3 }),
						style({opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
				]))]), {optional : true})
			])
		])
	]
})

export class HomeComponent implements OnInit {

	//setting property 
	// this is binded with interporlation example , {{ itemCount }} in html template
	itemCount: number = 4; 
	
	// this is binded with property binding example to button, works with single brackets around the property for 
	//example: [value]="btnText"
	btnText: string = 'Add an item'; 

	//two way data binding example 
	//example of two way binding to html template using FormsModule and using following code [(ngModel)]="goalText"
	goalText: string = 'My first life goal';

	goals = [];


	//creating instance of data service using DI in constructor so doing that
	constructor(private _data: DataService) { }

	//ngOnInit is a lifecycle hook which is initiated when this component itself loads
	ngOnInit() {
		this._data.goal.subscribe(res => this.goals = res);
		this.itemCount = this.goals.length;
		this._data.changeGoal(this.goals);
	}

	addItem(){
		if(this.goalText !== ''){
			this.goals.push(this.goalText);
			this.goalText = '';
			this.itemCount = this.goals.length;	

			this._data.changeGoal(this.goals);

		}
	}


	removeItem(i) {
		this.goals.splice(i, 1);
		this.itemCount = this.goals.length;	
		
		this._data.changeGoal(this.goals);

	}

}
