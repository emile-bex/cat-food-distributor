import { Injectable } from '@nestjs/common';
import { FoodServingsService } from '../food-servings/food-servings.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Distributor } from './entities/distributor.entity';
import { CreateDistributorDto } from './dto/create-distributor.dto';
import { UpdateDistributorDto } from './dto/update-distributor.dto';

@Injectable()
export class DistributorsService {

  constructor(@InjectRepository(Distributor)
              private distributorRepository: Repository<Distributor>, private foodServingsService: FoodServingsService, private jwtService: JwtService) {
  }

  create(createDistributorDto: CreateDistributorDto) {
    const distributorToCreate = this.distributorRepository.create(createDistributorDto);
    return this.distributorRepository.save(distributorToCreate);
  }

  findOneByDistributorId(distributorId: string) {
    return this.distributorRepository.findOneBy({ distributorId });
  }

  findOneBySocketId(socketId: string) {
    return this.distributorRepository.findOneBy({ socketId });
  }

  async upsertByDistributorId(createDistributorDto: CreateDistributorDto) {
    await this.distributorRepository.upsert(createDistributorDto, ['distributorId']);
    return this.findOneByDistributorId(createDistributorDto.distributorId);
  }

  async update(id: string, updateDistributorDto: UpdateDistributorDto) {
    await this.distributorRepository.update(id, updateDistributorDto);
    return this.distributorRepository.findOneBy({ id });
  }

  async removeBySocketId(socketId: string) {
    const distributorToRemove = await this.findOneBySocketId(socketId);
    await this.distributorRepository.remove(distributorToRemove);
    return distributorToRemove;
  }

  async checkIdentification(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
      const { sub }: { sub: string } = this.jwtService.decode(token);
      return sub;
    } catch (err) {
      return false;
    }
  }

  findAllFoodServingsByDistributorIdAndNotConfirmed(distributorId: string) {
    return this.foodServingsService.findAllByDistributorIdAndNotConfirmed(distributorId);
  }

  findOneFoodServingByIdAndDistributorId(foodServingId: string, distributorId: string) {
    return this.foodServingsService.findOneByIdAndDistributorId(foodServingId, distributorId);
  }

  foodServedConfirmation(foodServingId: string) {
    return this.foodServingsService.update(foodServingId, { isConfirmed: true });
  }
}
