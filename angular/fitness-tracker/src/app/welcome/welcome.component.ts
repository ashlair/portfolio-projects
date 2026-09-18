import { Component } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css'],
    standalone: true,
    imports: [FlexModule]
})
export class WelcomeComponent {

}
