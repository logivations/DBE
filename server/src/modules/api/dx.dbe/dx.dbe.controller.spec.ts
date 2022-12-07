import { Test, TestingModule } from '@nestjs/testing';
import { DxDbeController } from './dx.dbe.controller';

describe('DxDbeController', () => {
  let controller: DxDbeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DxDbeController],
    }).compile();

    controller = module.get<DxDbeController>(DxDbeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
