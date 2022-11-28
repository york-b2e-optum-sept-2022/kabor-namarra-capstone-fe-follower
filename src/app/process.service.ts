import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IProcess} from "./interface/IProcess";
import {IStageAnswering} from "./interface/IStageAnswering";
import {IProcessAnswering} from "./interface/IProcessAnswering";
import {IChoice} from "./interface/IChoice";
import {IStage} from "./interface/IStage";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  $viewingProcess = new Subject<boolean>();
  $processList = new Subject<IProcessAnswering[]>()
  $process = new Subject<IProcessAnswering>();
  $finishedProcess = new Subject<IProcessAnswering>();


  private processList: IProcessAnswering[] = [];
  private process!: IProcessAnswering;

  private finishedProcess!: IProcessAnswering;



  private viewingProcess: boolean = false;


  constructor(public http: HttpService) { }



  getProcessList(){
    this.processList = [];
    this.http.getProcessList().pipe(first()).subscribe({
      next: (processList) => {
        for(let process of processList) {
          process.stages.sort((p1, p2) =>
            (p1.stageOrder > p2.stageOrder) ? 1 : (p1.stageOrder < p2.stageOrder) ? -1 : 0);
        }
        for(let process of processList){
          let getStageList: IStageAnswering[] = [];
          for(let stage of process.stages){
            let choiceList: IChoice[] = [];
            if(stage.stage_type && stage.stageOrder && stage.choiceText && stage.question){
              for (let stageChoice of stage.choiceText) {
                choiceList.push({choiceText: stageChoice, response: ""})
              }
            getStageList.push({response:choiceList, stage_type: stage.stage_type, stageOrder: stage.stageOrder, question:stage.question})
            }
          }
          this.processList.push({name: process.name, stages: getStageList});
        }
        this.$processList.next(this.processList);
      },
      error: (err) => {
        alert("Server is having an issue. Please try again later.")
        console.error(err);
      }
    })
  }


  onProcessClick(process: IProcessAnswering){
    this.process = process;
    this.finishedProcess = {...process}
    this.finishedProcess.stages = [];
    this.onViewing()
  }

  getProcess(){
    this.$process.next(this.process);
  }

  onViewing(){
    this.viewingProcess = !this.viewingProcess;
    this.$viewingProcess.next(this.viewingProcess);
  }

  onNextStage(stage: IStageAnswering){
    if(this.finishedProcess.stages.findIndex(finishedStage => finishedStage.stageOrder === stage.stageOrder) >(-1)){
      this.finishedProcess.stages.splice(this.finishedProcess.stages.findIndex(finishedStage => finishedStage.stageOrder === stage.stageOrder), 1)
    }
    this.finishedProcess.stages.push(stage)


    if(stage.stageOrder === (this.process.stages.length) && this.finishedProcess.stages.length === this.process.stages.length){
      this.onFinishProcess();
    }
    this.$finishedProcess.next(this.finishedProcess);
    // this.$process.next(this.finishedProcess);
  }


  onFinishProcess(){
    let submitProcess: IProcess = {name: "", stages: []}

    if(this.finishedProcess.name){
      submitProcess.name = this.finishedProcess.name
    }

    if(this.finishedProcess.stages){
      for(let stage of this.finishedProcess.stages){
        let choiceList: string[] = []
        let responseList: string[] = []

        for(let choice of stage.response){
          choiceList.push(choice.choiceText)
          responseList.push(choice.response)
        }

        if(stage.stageOrder && stage.stage_type && stage.question){
          submitProcess.stages.push({
            choiceText: choiceList,
            response: responseList,
            stage_type: stage.stage_type,
            stageOrder: stage.stageOrder,
            question: stage.question})
        }
      }
    }

    this.http.postFinishedProcess(submitProcess).pipe(first()).subscribe({
      next: (submittedProcess) => {
        this.onViewing();
        console.log(submittedProcess)
      },
      error: (err) => {
        alert("Server is having an issue. Please try again later.")
        console.error(err)
      }
    })

  }





}
