import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IProcess} from "./interface/IProcess";
import {IStageAnswering} from "./interface/IStageAnswering";
import {IProcessAnswering} from "./interface/IProcessAnswering";
import {IChoice} from "./interface/IChoice";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  $viewingProcess = new Subject<boolean>();
  $processList = new Subject<IProcessAnswering[]>()
  $process = new Subject<IProcessAnswering>();


  private processList: IProcessAnswering[] = [];
  private process!: IProcessAnswering;



  private viewingProcess: boolean = false;


  constructor(public http: HttpService) { }



  getProcessList(){
    this.processList = [];
    this.http.getProcessList().pipe(first()).subscribe({
      next: (processList) => {
        for(let process of processList){
          let getStageList: IStageAnswering[] = [];
          for(let stage of process.stages){
            let choiceList: IChoice[] = [];
            if(stage.stage_type && stage.stageOrder && stage.choiceText && stage.question){
              for (let stageChoice of stage.choiceText) {
                choiceList.push({choiceText: stageChoice, response: ""})
              }
            }
            getStageList.push({response:choiceList, stage_type: stage.stage_type, stageOrder: stage.stageOrder, question:stage.question})
          }
          this.processList.push({name: process.name, stages: getStageList});
        }
        this.$processList.next(this.processList);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  onProcessClick(process: IProcessAnswering){
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
