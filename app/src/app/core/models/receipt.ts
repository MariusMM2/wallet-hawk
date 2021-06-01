export interface Receipt {
    id: string;
    galleryId: string;
    description: string;
    date: Date;
    image: string;
    budgetItemIds: string[];
}
