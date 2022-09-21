export interface UserUpdateDto {
    email?: string;
    username?: string;
    password: string;
    newPassword?: string;
}