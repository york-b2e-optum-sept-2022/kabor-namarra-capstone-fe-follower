import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ProcessService} from "../../process.service";
import {IProcessAnswering} from "../../interface/IProcessAnswering";
import {IStageAnswering} from "../../interface/IStageAnswering";
import {STAGE_TYPES} from "../../enum/STAGE_TYPES";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {arrow} from "@popperjs/core";

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnDestroy{

  process!: IProcessAnswering;
  stage!: IStageAnswering;
  onDestroy = new Subject();
  arr: number[] = [];
  canGoUp: boolean = false;
  canGoDown: boolean = false;
  starting: boolean = true;

  constructor(public processService: ProcessService) {
    this.processService.$process.pipe(takeUntil(this.onDestroy)).subscribe( process => {
      this.process = process;
      if(this.starting) {
        this.stage = this.process.stages[0]
        if (process.stages.length > 0) {
          this.canGoUp = true;
        }
        this.starting = false;
      }
    })
    this.processService.$finishedProcess.pipe(takeUntil(this.onDestroy)).subscribe( process => {
      this.arr = [];
      console.log("hello")

      this.process.stages[this.stage.stageOrder-1] = {...this.stage};

      if(this.stage) {
        if (this.stage.stageOrder) {
          this.stage = this.process.stages[this.stage.stageOrder]
          this.canGoDown = true;
        }
      }

      if(this.stage){
        if(this.stage.stage_type) {
          if (this.stage.stage_type === STAGE_TYPES.MULTIPLE_CHECKBOX) {
            for (let i in this.stage.response) {
              if (this.stage.response[i].response !== "") {
                this.arr.push(this.stage.response.indexOf(this.stage.response[i]) + 1);
              }
            }
          }
        }
      }
      if(this.stage) {
        if (this.stage.stageOrder) {
          if (this.process.stages.length > this.stage.stageOrder) {
            this.canGoUp = true;
          } else {
            this.canGoUp = false;
          }
        }
      }
      console.log(this.arr)
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


  onResponseClick(response: string, index: number){
    if(this.stage.stage_type === "MULTIPLE_CHOICE"){
      for(let choice of this.stage.response) {
        choice.response = "";
      }
      this.stage.response[index].response = response;
    }
    if(this.stage.stage_type === "MULTIPLE_CHECKBOX") {
      if (this.arr.find(element => element === index + 1)) {
        this.arr.splice(this.arr.indexOf(index + 1), 1)
        this.stage.response[index].response = "";
        return;
      } else {
        this.stage.response[index].response = response;
        this.arr.push(index + 1)
      }
    }
    console.log(this.stage.response)
  }

  onPreviousClick(){
    if(this.stage) {
      if (this.stage.stageOrder) {
        this.stage = this.process.stages[this.stage.stageOrder-2]
        this.canGoUp = true;
      }
    }
    if(this.stage.stageOrder){
      if(1 < this.stage.stageOrder){
        this.canGoDown = true;
      }else {
        this.canGoDown = false;
      }
    }
  }
  onSaveClick(){

    if(this.stage.stage_type === "TEXT_ANSWER"){
      for(let response of this.stage.response){
        if(response.response === ""){
          alert("a response is empty")
          return;
        }
      }

    }

    if(this.stage.stage_type === "MULTIPLE_CHOICE"){
      for(let response of this.stage.response){
        if(response.response !== ""){
          this.processService.onNextStage(this.stage);
          return;
        }
      }
      alert("a response is empty")
      return;
    }


    this.processService.onNextStage(this.stage)

  }
}
