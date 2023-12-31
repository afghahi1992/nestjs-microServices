import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {

  @IsString()
  name: string;

  @IsInt()
  age: number;
}
