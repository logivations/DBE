import { Test, TestingModule } from '@nestjs/testing';
import { DxDbeService } from './dx.dbe.service';

describe('DxDbeService', () => {
  let service: DxDbeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DxDbeService],
    }).compile();

    service = module.get<DxDbeService>(DxDbeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
