export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface IAlert {
  id: number;
  title: string;
  type: AlertType;
  description?: string;
  counter?: number;
}

export type AlertOptions = Omit<IAlert, 'id'>;
