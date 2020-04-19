import { Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn, Column } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

export enum UserRole {
    ADMIN = "admin",
    SPORTER = "sporter",
    TRAINER = "trainer"
}


export enum Gender {
    FEMALE = "female",
    MALE = "male"
}

@Entity()
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column({
        type: "enum",
        enum: ["admin", "sporter", "trainer"]
    })
    @IsNotEmpty()
    role: UserRole;

    @Column({ default: 0 })
    age: number;

    @Column({
        type: "enum",
        enum: ["female", "male"]
    })
    gender: Gender;


    @Column({ default: 'test.jpg' })
    imageName: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @Length(4, 100)
    password: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
