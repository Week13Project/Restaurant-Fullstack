import { Time } from "@angular/common";

export class Restaurant {
    user_id: number = 0;
    owner: number = 0;
    name: string = "";
    price: string = "";
    address: string = "";
    phone: string = "";
    created_at!: Time;
    removed_at!: Time;
}
