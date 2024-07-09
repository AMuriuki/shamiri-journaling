export type EntryType = {
    id: number;
    title: string;
    content: string;
    category: {
        id: number;
        title: string;
    };
    timestamp: string;
}

export interface EntryCardProps {
    id: number;
    title: string;
    content: string;
    category: string;
    date: string;
    onLongPress: (id: number) => void;
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
