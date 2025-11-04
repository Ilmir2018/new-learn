import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

describe('ReviewsService', () => {
  let service: ReviewsService;

  const exec = { exec: jest.fn() }
  const reviewRepositoryFactory = () => ({
    find: () => exec
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          useFactory: reviewRepositoryFactory, provide: getModelToken('ReviewModel')
        }
      ]
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('sould be find', () => {
    expect(service).toBeDefined();
  });

  it('findByProductId work', async () => {
    const id = new Types.ObjectId().toHexString();
    reviewRepositoryFactory().find().exec.mockReturnValueOnce([{ productId: id }])
    const res = await service.findByProductId(id);
    expect(res[0].productId).toBe(id);
  });
}); 
