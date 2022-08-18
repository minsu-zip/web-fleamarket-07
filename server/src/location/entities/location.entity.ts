import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class LocationEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 10 })
  region: string;
}
