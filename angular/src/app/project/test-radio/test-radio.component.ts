import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'test-radio',
    templateUrl: 'test-radio.component.html',
    styleUrls: ['test-radio.component.scss']
})
export class TestRadioComponent {
    //testtttttttttttttttttttttttttttt
    selectedAnswers = []

    polls = [
        {
            'name': 'Question 1',
            'id': 1,
            'options': [
                { 'id': 1, 'answer': 'yes' },
                { 'id': 1, 'answer': 'no' },
            ]
        },
        {
            'name': 'Question 2',
            'id': 3,
            'options': [
                { 'id': 1, 'answer': 'india' },
                { 'id': 1, 'answer': 'uk' },
            ]
        },

    ]

    name = 'Angular';
}
