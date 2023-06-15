import { Time } from "@angular/common";

export interface Restaurant {
    restaurantId?: number
    owner?: number
    name: string
    price: number
    address?: string
    phone?: number
    disabled: boolean
    created_at?: Time
    removed_at?: Time
}
