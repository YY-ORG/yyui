import { Component,  OnInit,  } from '@angular/core';

import { INglDatatableSort, INglDatatableRowClick } from 'ng-lightning/ng-lightning';
import { SpinnerComponent } from '../../../components'
import { PageClass } from '../../../class/page/page.class'

import {
	TimeService
   } from "./time.service"
   

@Component({
	selector: 'time',
	styleUrls: ["./time.scss"],
	
	templateUrl: "./time.template.html"
})
export class TimeComponent extends PageClass implements OnInit {
	constructor(
		public service: TimeService
	) {
		super()
	}

	editModalOpen: boolean = false;
	timeList: any[] = []

	ngOnInit() {
		this.getTimeList()
	}

	getTimeList () {
		this.service.fetAssesspaperTimelist().then(res => {
			this.timeList = res[1]
		})
	}

	onTimeChanged ($event, time, code: string, isStart) {
		time[code] = $event.formatted + (isStart ? ' 00:00:00' : ' 23:59:59')
	}

	getTime (timeString) {
		return timeString ? timeString.split(' ')[0] : ''
	}

	saveConfig () {
		this.service.setAssesspaperTimelist(this.timeList).then(res => {
			this.alert.open('保存成功！')
		})
	}
	

}

