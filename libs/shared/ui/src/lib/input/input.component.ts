import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'cloudy-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputComponent implements OnInit {

  @Input() labelName = "Label";
  @Input() controlName = "";

  @Input() error = "error";

  @Input() type = "text";

  ngOnInit(): void {}

}
