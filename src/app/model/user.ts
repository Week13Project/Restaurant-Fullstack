import { Time } from "@angular/common";

export class User {
    user_id: number = 0;
    username: string = "";
    password: string ="";
    role: string="";
    created_at!: Time;
}
