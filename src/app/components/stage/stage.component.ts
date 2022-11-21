import {Component, Input} from '@angular/core';
import {IStage} from "../../interface/IStage";
import {IStageAnswering} from "../../interface/IStageAnswering";
import {ProcessService} from "../../process.service";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent {

  @Input() stage!: IStageAnswering;
  arr: number[] = [];

  constructor(public processService: ProcessService) { }

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

  onSaveClick(){
    if(this.stage.stage_type === "TEXT_ANSWER"){
      for(let response of this.stage.response){
        if(response.response === ""){
          console.error("a response is empty")
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
      console.error("a response is empty")
      return;
    }

    this.processService.onNextStage(this.stage)

  }

}
