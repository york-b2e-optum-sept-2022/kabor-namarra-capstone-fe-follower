import {STAGE_TYPES} from "../enum/STAGE_TYPES";

export interface IStage{
  id?: number,
  choiceText: string[],
  response?: string[],
  stage_type?: STAGE_TYPES,
  stageOrder?: number,
  question: string
}
