import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpAuthDto {
  @IsString()
  @MinLength(2, { message: 'name must have at least 2 characters' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsInt()
  age: number;
}
