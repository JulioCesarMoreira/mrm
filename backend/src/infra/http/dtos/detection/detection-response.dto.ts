export class CreateDetectionResponseDto {
  id: number;

  accuracy: number;

  sality: number;

  maximumDepth: number;

  minimumDepth: number;

  proposalServiceId: number;
}

export class GetDetectionResponseDto {
  id: number;

  accuracy: number;

  sality: number;

  maximumDepth: number;

  minimumDepth: number;

  proposalServiceId: number;
}

export class FetchDetectionsResponseDto {
  detections: {
    id: number;

    accuracy: number;

    sality: number;

    maximumDepth: number;

    minimumDepth: number;

    proposalServiceId: number;
  }[];
}

export class DeleteDetectionResponseDto {
  sucess: boolean;
}

export class UpdateDetectionResponseDto {
  id: number;

  accuracy: number;

  sality: number;

  maximumDepth: number;

  minimumDepth: number;

  proposalServiceId: number;
}
