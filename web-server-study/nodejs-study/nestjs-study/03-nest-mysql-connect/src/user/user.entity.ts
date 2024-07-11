import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', name: 'name'})
    name: string;

    // @Column({type: 'varchar', name: 'phone'})
    // phone: string;
    //
    // @Column({type: 'varchar', name: 'password'})
    // password: string;


}