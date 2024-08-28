
export type TCar = {
    name: string;
    type: string;
    description: string;
    color: string;
    isElectric: boolean;
    features: string[];
    image: string;
    status?: 'available' | 'unavailable';
    pricePerHour: number;
    isDeleted?: boolean;
};