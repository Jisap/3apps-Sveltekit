export interface Quiz {
    id: number;
    name: string;
    imageUrl: string;
    questions: Question[];
}

export interface Question {
    id: number;
    question: string;
    options: Option[];
    answer: string;
}

export interface Option {
    id: number;
    label: string;
    text: string;
}

