import {Component, Input} from '@angular/core';
import {IStage} from "../../interface/IStage";
import {IStageAnswering} from "../../interface/IStageAnswering";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent {

  @Input() stage!: IStageAnswering;
  arr: number[] = [];

  constructor() { }

  onResponseClick(response: string, index: number){
    if(this.arr.find(element => element === index+1)){
      this.arr.splice(this.arr.indexOf(index+1),1)
      return;
    }else {
      this.arr.push(index+1)
      console.log(response)
      console.log(this.arr)
    }
  }

  onSaveClick(){
    for(let response of this.stage.response){
      if(response.response === ""){
        console.error("a response is empty")
        return;
      }
    }

    console.log(this.stage);

  }

}
