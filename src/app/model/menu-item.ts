import { Time } from "@angular/common";

export class MenuItem {
    itemId: number = 0;
    restaurantId: number;
    name: string|null;
    price: number|null;
    category: string;
    description: string;
    path: any;
    disabled: boolean;
}
