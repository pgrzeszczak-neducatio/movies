import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 500,
    })
    title: string;

    @Column('text')
    description: string;

    @Column('int')
    year: number;

    @Column('int')
    length: number;

    @Column({
        length: 500,
        default: 'https://via.placeholder.com/315x500?text=Obrazek znikł',
    })
    poster: string;
}
