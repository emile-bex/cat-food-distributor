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
    const distributorToUpdate = this.distributorRepository.create({...updateDistributorDto, id})
    return this.distributorRepository.save(distributorToUpdate);
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
      console.error(err);
      return false;
    }
  }

  foodServedConfirmation(id: string) {
    return this.foodServingsService.update(id, { isConfirmed: true });
  }
}
