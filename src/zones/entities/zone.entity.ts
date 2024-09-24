import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Zone {
  @PrimaryColumn('text')
  id: string;

  @Column('text', { unique: true })
  text: string;

  @Column('text')
  imageSource: string;
}
