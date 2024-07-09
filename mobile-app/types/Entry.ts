export type EntryType = {
    id: number;
    title: string;
    content: string;
    category: {
        id: number;
        title: string;
    };
    date: string;
}

export interface EntryCardProps {
    title: string;
    content: string;
    category: string;
    date: string;
}

export type CategoryType = {
    id: number;
    title: string;
}

export interface CategoryCardProps {
    categories: CategoryType[];
    onSelectCategory: (category: string) => void;
    selectedCategory: string | null;
}
