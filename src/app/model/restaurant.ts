import { Time } from "@angular/common";

export interface Restaurant {
    user_id?: number
    owner?: number
    name: string
    price: string
    address?: string
    phone?: string
    created_at?: Time
    removed_at?: Time
}
