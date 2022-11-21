import {STAGE_TYPES} from "../enum/STAGE_TYPES";
import {IChoice} from "./IChoice";

export interface IStageAnswering{
  id?: number,
  response: IChoice[],
  stage_type?: STAGE_TYPES,
  stageOrder?: number,
  question: string
}
