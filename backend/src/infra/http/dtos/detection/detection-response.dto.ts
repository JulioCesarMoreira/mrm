export class CreateDetectionResponseDto {
  id: number;

  accuracy: number;

  salinity: number;

  maximumDepth: number;

  minimumDepth: number;

  proposalId: number;
}

export class GetDetectionResponseDto {
  id: number;

  accuracy: number;

  salinity: number;

  maximumDepth: number;

  minimumDepth: number;

  proposalId: number;
}

export class FetchDetectionsResponseDto {
  detections: {
    id: number;

    accuracy: number;

    salinity: number;

    maximumDepth: number;

    minimumDepth: number;

    proposalId: number;
  }[];
}

export class DeleteDetectionResponseDto {
  sucess: boolean;
}

export class UpdateDetectionResponseDto {
  id: number;

  accuracy: number;

  salinity: number;

  maximumDepth: number;

  minimumDepth: number;

  proposalId: number;
}
