import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class CategoryResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;
  
  @ApiProperty({ example: 'frutas' })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'Plant-based foods that are sweet and rich in simple carbohydrates.',
    nullable: true,
  })
  @Expose()
  description?: string;

  @Exclude()
  @ApiProperty({example: '2025-11-09T09:00:00.000Z', description: 'Date when the category was created'})
  created_at: Date;

  @Exclude()
  @ApiProperty({example: '2025-11-09T09:30:00.000Z', description: 'Date when the category was last updated'})
  updated_at: Date;
}


