import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('/api')
export class AppController{
  
  constructor(private appService: AppService)//делаем инъекцию 
  {}

  @Get('/users')
  getUsers(){
    return this.appService.getUsers();
  }
}