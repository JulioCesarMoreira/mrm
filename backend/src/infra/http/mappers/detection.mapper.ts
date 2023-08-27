import {
  DeleteDetectionResponseDto,
  FetchDetectionsResponseDto,
} from '@infra/http/dtos/detection';
import { Detection } from '@application/core/entities';

export class DetectionMapper {
  public static fetchDetectionToController(
    detectionsEntity: Detection[],
  ): FetchDetectionsResponseDto {
    const fetchDetectionsResponseDto = new FetchDetectionsResponseDto();
    fetchDetectionsResponseDto.detections = [];

    for (const detectionEntity of detectionsEntity) {
      fetchDetectionsResponseDto.detections.push({
        id: detectionEntity.id,
        accuracy: detectionEntity.accuracy,
        sality: detectionEntity.sality,
        maximumDepth: detectionEntity.maximumDepth,
        minimumDepth: detectionEntity.minimumDepth,
        proposalServiceId: detectionEntity.proposalServiceId,
      });
    }

    return fetchDetectionsResponseDto;
  }

  public static deleteDetectionToController(
    resultDelete: boolean,
  ): DeleteDetectionResponseDto {
    const deleteDetectionResponseDto = new DeleteDetectionResponseDto();

    deleteDetectionResponseDto.sucess = resultDelete;

    return deleteDetectionResponseDto;
  }
}
