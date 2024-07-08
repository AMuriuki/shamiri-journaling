export type EntryType = {
    id: number;
    title: string;
    content: string;
    category: string;
    date: string;
}

export interface EntryCardProps {
    title: string;
    content: string;
    category: string;
    date: string;
}