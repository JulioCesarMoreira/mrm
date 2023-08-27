import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DetectionRepository } from '@application/core/repositories';
import { Detection } from '@application/core/entities';

@Injectable()
export class PrismaDetectionRepository implements DetectionRepository {
  prisma = new PrismaClient();

  async create(detection: Omit<Detection, 'id'>): Promise<Detection> {
    const createdDetection = await this.prisma.detection.create({
      data: {
        accuracy: detection.accuracy,

        sality: detection.sality,

        maximumDepth: detection.maximumDepth,

        minimumDepth: detection.minimumDepth,

        proposalServiceId: detection.proposalServiceId,
      },
    });

    return createdDetection;
  }

  async get(id: number): Promise<Detection> {
    const getDetection = await this.prisma.detection.findUnique({
      where: {
        id: id,
      },
    });

    return getDetection;
  }

  async fetch({
    accuracy,
    sality,
    maximumDepth,
    minimumDepth,
    proposalServiceId,
  }: Omit<Detection, 'id'>): Promise<Detection[]> {
    const fetchDetection = await this.prisma.detection.findMany({
      where: {
        ...(accuracy && { accuracy }),
        ...(sality && { sality }),
        ...(maximumDepth && { maximumDepth }),
        ...(minimumDepth && { minimumDepth }),
        ...(proposalServiceId && { proposalServiceId }),
      },
    });

    return fetchDetection;
  }

  async update(
    entityId: number,
    {
      accuracy,
      sality,
      maximumDepth,
      minimumDepth,
    }: Omit<Detection, 'id' | 'proposalServiceId'>,
  ): Promise<Detection> {
    const updatedDetection = await this.prisma.detection.update({
      where: {
        id: entityId,
      },
      data: {
        ...(accuracy && { accuracy }),
        ...(sality && { sality }),
        ...(maximumDepth && { maximumDepth }),
        ...(minimumDepth && { minimumDepth }),
      },
    });

    return updatedDetection;
  }

  async delete(id: number): Promise<boolean> {
    const detection = await this.prisma.detection.delete({
      where: {
        id,
      },
    });

    return !!detection || false;
  }
}
