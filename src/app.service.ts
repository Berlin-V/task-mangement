import { Injectable } from '@nestjs/common';
import { ITask } from './interfaces';

@Injectable()
export class AppService {
	task: ITask[] = [];

	addTask(data: ITask) {
		console.log('run', data);
		if (data.title && data.subtitle) {
			//Checking the data that we given has title and subtitle
			console.log('do', data, this.task);
			// Title already exists check can be done only if task is already present
			// first check if the array has anything, if No, just push to the array,
			// else go through the elements of array and then check if the title already exists

			if (this.task.length < 1) {
				//if we got the first data that length is greater than one run this function
				console.log('No tasks present already');
				this.task.push(data);
				//Telling to push the data
				return this.task;
			} else {
				this.task.forEach((t) => {
					//using for each to check every data in array
					console.log('value', t);
					if (t.title === data.title) {
						//checking the titlt is already present in array or not
						throw new Error(
							'Title already exist',
						);
					}
					if (t.id === data.id) {
						throw new Error('Id already exit')
					}
				});
				this.task.push(data);
				return this.task;
			}
		} else {
			throw new Error('required perameters are missing');
		}
	}

	getAllTask(): ITask[] {
		const data = this.task;
		return data;
	}

	getTask(data: ITask) {
		return this.task.filter((v) => v.id === data.id);
		//using filter to find the id that we given
	}

	updateTask(data: ITask) {
		const id = data.id;
               const foundTask = this.task.find((t) => t.id === data.id)
		if(!foundTask){
			return "No data found"
		}

		const taskToUpdate = this.task.map((task: ITask) => {
			if (task.id === id) {
				task.title = data.title;
				task.subtitle = data.subtitle;
			}
			console.log(task)
			return task;
		});
		return taskToUpdate
	}

	deleteTask(data: ITask) {
		const task = this.task;
		const no = data.id;
		const idIndex = task.map((v) => v.id).indexOf(no);
		//using map we are taking the id from the array and checking with the data id we want to delete ,using intexof finding its poistion
		return task.splice(idIndex, 1);
		//using the splice deleting the data that we want
	}
}
