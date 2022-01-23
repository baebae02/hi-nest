import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { NotFoundError } from 'rxjs';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should be 4', () => {
    expect(2+2).toEqual(4);
  });

  describe('getAll', () => {
    it('it should return array', () => {

      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    
    it('it should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Romance'],
        year: 2021,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual('Test Movie');
    });

    it('it shoule throw 404 error', () => {
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999: Not Found');
      }
    });
  });

  describe('deleteOne', () => {
    it('it deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Romance'],
        year: 2021,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1)
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('it should return 404 error', () => {
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('it should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['Romance'],
        year: 2021,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('it should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Romance'],
        year: 2021,
      });
      service.update(1, {title: 'Updated Movie'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Movie');
    });
    it('it should throw new NotFoundException', () => {
      try{
        service.update(999, {});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
