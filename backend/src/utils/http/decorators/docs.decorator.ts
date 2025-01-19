import { applyDecorators, Type } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function Docs(params: IDocsParams) {
  const { summary, status, description, isArray, type } = params;

  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({ status, description, isArray, type }),
  );
}