import { positionType } from '@models/positionType.enum';
import { schedule } from '@models/schedule.enum';
import { yesNo } from '@models/yesNo.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class Job {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column({unique: true, type: "int"})
    jobCode: number;

    @Column("varchar", { length: 500 })
    jobCategory: string;

    @Column("varchar", { length: 500 })
    location: string;

    @Column({ type: "enum", enum: schedule, default: schedule.FullTime})
    schedule: string;

    @Column({ type: "enum", enum: yesNo, default: yesNo.No})
    remote: string;

    @Column({ type: "enum", enum: yesNo, default: yesNo.No})
    relocation: string;

    @Column({ type: "enum", enum: positionType, default: positionType.NonManagement})
    positionType: string;

    @Column("varchar", { length: 5000 })
    positionSummary: string;
}