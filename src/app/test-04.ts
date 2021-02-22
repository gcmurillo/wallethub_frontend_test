/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule, ElementRef, HostListener, Host } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2>
                First name: <input type="text" [(ngModel)]="first_name" /> <br/>
                Last name: <input type="text" [(ngModel)]="last_name" /> <br/>
                Username: {{ username }}
                <div>
                </div>
                `,
    styles : []
})
export class UserNameComponent {
    
    first_name: string = "";
    last_name: string = "";
    username: string = "";

    @HostListener('document:click', ['$event'])
    clickout(e) {
        if (!this.eRef.nativeElement.contains(e.target)) {
            if (this.first_name.replace(/\s/g, "") != "" && this.last_name.replace(/\s/g, "") != "") {
                this.username = this.first_name.toLocaleLowerCase() + "_" + this.last_name.toLocaleLowerCase() + "_" + this.getRandomInt(1, 9);
            }
        } 
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    constructor(private eRef: ElementRef) {} 

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ]),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};