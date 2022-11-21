import {Component, OnDestroy} from '@angular/core';
import {IProcess} from "../../interface/IProcess";
import {Subject, takeUntil} from "rxjs";
import {ProcessService} from "../../process.service";
import {IProcessAnswering} from "../../interface/IProcessAnswering";

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnDestroy{

  process!: IProcessAnswering;
  onDestroy = new Subject();


  constructor(public processService: ProcessService) {
    this.processService.$process.pipe(takeUntil(this.onDestroy)).subscribe( process => {
      this.process = process;
    })
  }

  ngOnInit(): void {
    this.processService.getProcess();
  }
  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
  onBackClick(){
    this.processService.onViewing();
  }
}
