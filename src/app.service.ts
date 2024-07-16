import { Injectable } from "@nestjs/common";

@Injectable()//провайдер - внедряется в контроллер
export class AppService {
  getUsers(){
    return [{id: 1, name: 'p1x1n1'}, {id:2, name: 'p1n1x1'}]
  }
}