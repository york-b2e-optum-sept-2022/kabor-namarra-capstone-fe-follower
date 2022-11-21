import {Component, OnDestroy} from '@angular/core';
import {ProcessService} from "../../process.service";
import {Subject, takeUntil} from "rxjs";
import {IProcess} from "../../interface/IProcess";
import {IProcessAnswering} from "../../interface/IProcessAnswering";

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnDestroy{

  processList!: IProcessAnswering[];
  onDestroy = new Subject();


  constructor(public processService: ProcessService) {
    this.processService.$processList.pipe(takeUntil(this.onDestroy)).subscribe( processList => {
      this.processList = processList;
      console.log(processList)
    })
  }

  ngOnInit(): void {
    this.processService.getProcessList()
  }
  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
