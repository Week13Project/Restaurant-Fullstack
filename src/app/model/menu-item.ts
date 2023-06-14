import { Time } from "@angular/common";

export class MenuItem {
    user_id: number = 0;
    location: number = 0;
    name: string = "";
    price: string = "";
    created_at!: Time;
    removed_at!: Time;
}