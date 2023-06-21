import { Time } from "@angular/common";

export class Restaurant {
    restaurantId?: number;
    owner?: number;
    name: string;
    price: number;
    address?: string;
    phone?: string;
    disabled: boolean;
    created_at?: Time;
    removed_at?: Time;
    imgPath: any;
    filePath: any;
    // constructor(){
    //     this.name="Restaurant";
    // }
}
