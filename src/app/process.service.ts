import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IProcess} from "./interface/IProcess";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  $viewingProcess = new Subject<boolean>();
  $processList = new Subject<IProcess[]>()
  $process = new Subject<IProcess>();


  private processList: IProcess[] = [];
  private process!: IProcess;



  private viewingProcess: boolean = false;


  constructor(public http: HttpService) { }



  getProcessList(){
    this.http.getProcessList().pipe(first()).subscribe({
      next: (processList) => {
        this.processList = processList;
        this.$processList.next(this.processList);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  onProcessClick(process: IProcess){
    this.process = process;
    this.onViewing()
  }

  getProcess(){
    this.$process.next(this.process);
  }

  onViewing(){
    this.viewingProcess = !this.viewingProcess;
    this.$viewingProcess.next(this.viewingProcess);
  }





}
