export type Recipe = {
    id: number;
    name: string;
    description: string;
    ingredients: string[];
    directions: string[];
    thumbnail?: string;
    user_id: number;
}