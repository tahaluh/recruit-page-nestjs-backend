import { User } from "src/users/user.entity";

export class CreateCompanyDto {
    name: string;
    cellphone: string;
    website?: string;
    address: string;
    user: User;
}
