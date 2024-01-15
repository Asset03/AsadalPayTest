import { ReactNode } from "react";

export interface TransactionType {
    id: number,
    name: string,
    date: string,
    amount: number,
    type: string
}

export interface CardProps {
  title?: string;
  toolbar: boolean;
  children: ReactNode[];
  myClass?: string
}
export interface SearchFormType {
  onSearch: (searchText: string, startDate: string, endDate: string) => void;
  transactions: TransactionType[];
}
export enum Headers{
  id='id',
  name='name',
  date='date',
  amount='amount',
  type='type'
}