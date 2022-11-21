import {IStage} from "./IStage";
import {IStageAnswering} from "./IStageAnswering";

export interface IProcessAnswering{
  id?: number,
  name: string,
  stages: IStageAnswering[]
}
