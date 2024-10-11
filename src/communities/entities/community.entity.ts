import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Community {
  @PrimaryColumn('text')
  id: string;

  @Column('text', { unique: true })
  text: string;

  @Column('text')
  imageSource: string;
}
