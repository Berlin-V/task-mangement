import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ITask } from './interfaces';

@Controller('api')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post('add-task')
	addTask(@Body() data: ITask) {
		try {
			const response = this.appService.addTask(data);
			return response;
		} catch (e) {
			return {
				status: 'Error',
				message: e.message,
			};
		}
	}

	@Post('get-all-task')
	getAllTask() {
		const response = this.appService.getAllTask();
		console.log('all task', response);
		return response;
	}

	@Post('get-task')
	getTask(@Body() data: ITask) {
		const response = this.appService.getTask(data);
		return response;
	}

	@Post('updateTask')
	 updateTask(@Body() data: ITask){
         const response = this.appService.updateTask(data)
         return response ;
         }
		
        @Post('deleteTask')
	deleteTask(@Body() data: ITask) {
		const response = this.appService.deleteTask(data);
		return response;
	}

}
