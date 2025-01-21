import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';

export class PaginatedDto<TModel> {
  @ApiProperty({ type: 'number' })
  page: number;

  @ApiProperty({ type: 'number' })
  pages: number;

  @ApiProperty({ type: 'number' })
  countItems: number;

  entities: TModel[];
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  property: string,
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          data: {
            allOf: [
              { $ref: getSchemaPath(PaginatedDto) },
              {
                properties: {
                  [`${property}`]: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            ],
          },
        },
      },
    }),
  );
};
