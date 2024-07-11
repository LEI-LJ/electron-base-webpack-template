import { Injectable, Logger } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";

@Injectable()
export class ScheduleService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private logger: Logger
  ){}

  addCronJob(name: string, crons: string) {
    const job: any = new CronJob(`${crons}`, () => {
      this.logger.warn(`(${crons}) for job ${name} to run!`);
    });
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
  }

  addInterval(name: string, milliseconds: number) {
    const callback = () => {
      this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
    };
  
    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);
  }

  deleteInterval(name: string) {
    this.schedulerRegistry.deleteInterval(name);
    this.logger.warn(`Interval ${name} deleted!`);
  }

  getIntervals() {
    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach(key => this.logger.log(`Interval: ${key}`));
  }

  addTimeout(name: string, milliseconds: number) {
    const callback = () => {
      this.logger.warn(`Timeout ${name} executing after (${milliseconds})!`);
    };
  
    const timeout = setTimeout(callback, milliseconds);
    this.schedulerRegistry.addTimeout(name, timeout);
  }

  deleteTimeout(name: string) {
    this.schedulerRegistry.deleteTimeout(name);
    this.logger.warn(`Timeout ${name} deleted!`);
  }

  getTimeouts() {
    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach(key => this.logger.log(`Timeout: ${key}`));
  }
}