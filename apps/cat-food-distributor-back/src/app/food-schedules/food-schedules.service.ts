import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CronJob, CronTime } from 'cron';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FoodServingsService } from '../food-servings/food-servings.service';
import { FoodSchedule } from './entities/food-schedule.entity';
import { UpdateFoodScheduleDto } from './dto/update-food-schedule.dto';
import { CreateFoodScheduleDto } from './dto/create-food-schedule.dto';
import { DistributorsService } from '../distributors/distributors.service';

const SERVE_FOOD = 'serve-food' as const;

@Injectable()
@WebSocketGateway()
export class FoodSchedulesService implements OnModuleInit {
  private readonly logger = new Logger(FoodSchedulesService.name);

  @WebSocketServer() server: Server;

  constructor(
    @InjectRepository(FoodSchedule)
    private foodScheduleRepository: Repository<FoodSchedule>,
    private schedulerRegistry: SchedulerRegistry,
    private distributorsService: DistributorsService,
    private foodServingsService: FoodServingsService) {
  }

  async createFoodServing(distributorId: string) {
    const distributor = await this.distributorsService.findOneByDistributorId(distributorId);
    if (distributor && distributor.isAuthorized) {
      await this.foodServingsService.create({ distributorId });
      const distributorSocket = this.server.sockets.sockets.get(distributor.socketId);
      if (distributorSocket) {
        distributorSocket.emit(SERVE_FOOD);
      }
    }
  }

  getCronId({ id, distributorId }: Pick<FoodSchedule, 'id' | 'distributorId'>) {
    return `${distributorId}_${id}`;
  }

  createJob({ id, distributorId, cron }: FoodSchedule) {
    const cronId = this.getCronId({ id, distributorId });
    const job = new CronJob(cron, async () => {
      this.logger.warn(`Time for job ${cronId} to run`);
      await this.createFoodServing(distributorId);
    });
    this.schedulerRegistry.addCronJob(cronId, job);
    job.start();
    this.logger.warn(
      `Job for ${cronId} added : ${cron}`
    );
  }

  updateJob({ id, distributorId, cron, isActive }: FoodSchedule) {
    const cronId = this.getCronId({ id, distributorId });

    const distributorJob = this.schedulerRegistry.getCronJob(cronId);

    if (!isActive) {
      distributorJob.stop();
    }

    if (cron) {
      const cronTime = new CronTime(cron);
      distributorJob.setTime(cronTime);
    }
  }

  deleteJob({ id, distributorId }: FoodSchedule) {
    const cronId = this.getCronId({ id, distributorId });

    this.schedulerRegistry.deleteCronJob(cronId);
  }

  async onModuleInit() {
    const foodSchedules = await this.findAll();
    foodSchedules.map((foodSchedule) => {
      if (foodSchedule.isActive) {
        this.createJob(foodSchedule);
      }
    });
  }

  create(createFoodScheduleDto: CreateFoodScheduleDto & { distributorId: string }) {
    const foodScheduleToCreate = this.foodScheduleRepository.create(createFoodScheduleDto);
    return this.foodScheduleRepository.save(foodScheduleToCreate);
  }

  findAll() {
    return this.foodScheduleRepository.find();
  }

  findAllByDistributorId(distributorId: string) {
    return this.foodScheduleRepository.findBy({
      distributorId
    });
  }

  findOne(id: string) {
    return this.foodScheduleRepository.findOneBy({
      id
    });
  }

  update(id: string, updateFoodScheduleDto: UpdateFoodScheduleDto) {
    const foodScheduleToUpdate = this.foodScheduleRepository.create({ ...updateFoodScheduleDto, id });
    return this.foodScheduleRepository.save(foodScheduleToUpdate);
  }

  async remove(id: string) {
    const foodScheduleToRemove = this.foodScheduleRepository.create({ id });
    await this.foodScheduleRepository.remove(foodScheduleToRemove);
    return foodScheduleToRemove
  }
}
