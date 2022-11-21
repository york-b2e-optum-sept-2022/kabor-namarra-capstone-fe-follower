import {Component, Input} from '@angular/core';
import {IProcess} from "../../interface/IProcess";
import {ProcessService} from "../../process.service";
import {IProcessAnswering} from "../../interface/IProcessAnswering";

@Component({
  selector: 'app-process-display',
  templateUrl: './process-display.component.html',
  styleUrls: ['./process-display.component.css']
})
export class ProcessDisplayComponent {
  @Input() process!: IProcessAnswering;

  constructor(public processService: ProcessService) { }

  ngOnInit(): void {
  }

  onProcessClick(){
    this.processService.onProcessClick(this.process)
  }
}
