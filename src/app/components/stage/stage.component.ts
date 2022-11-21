import {Component, Input} from '@angular/core';
import {IStage} from "../../interface/IStage";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent {

  @Input() stage!: IStage;

  constructor() { }

}
