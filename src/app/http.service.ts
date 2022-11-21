import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProcess} from "./interface/IProcess";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public httpClient: HttpClient) { }

  getProcessList(){
    return this.httpClient.get("http://localhost:8080/api/process")as Observable<IProcess[]>
  }

  postFinishedProcess(finishedProcess: IProcess){
    return this.httpClient.post("http://localhost:8080/api/finishedProcess", {name: finishedProcess.name, stages: finishedProcess.stages})as Observable<IProcess>
  }
}
