import { Company } from "src/companys/company.entity";

export class CreateJobDto {
    office: string;
    company: Company;
    description: string;
    skills: string;
    salary: number;
    end_date: Date;
}
