export interface Event {
  id: string;
  match_id: string;
  title: string;
  odds: {
    [key: string]: number;
  };
  betting_enabled: boolean;
  created_at: any;
}

export interface Bet {
  id: string;
  match_id: string;
  user_id: string;
  choice: string;
  amount: number;
  odd: number;
  potential_return: number;
  placed_at: any; 
  status: "pendente" | "ganha" | "perde" | "cancelada";
}
