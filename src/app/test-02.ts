/**
 * Update the following components to meet the requirements : 
 * * Bind [field] of [textfield] component to its text input
 * * Pass value of [field] from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule, Input, Output, EventEmitter  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'textfield',
    template : '<input #fieldText type="text" (input)="changeInput(fieldText.value)"/> {{ field }}'
})
export class TextField {
    @Output() onChangeField = new EventEmitter<string>();

    changeInput(e) {
        this.onChangeField.emit(e);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield (onChangeField)="changeTextField($event)"></textfield>`
})
export class ChildComponent {

    @Output() onChangeChild = new EventEmitter<string>();

    changeTextField(value) {
        this.onChangeChild.emit(value);
    }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (onChangeChild)="changeChild($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";

    changeChild(value) {
        this.title = value;
    }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};