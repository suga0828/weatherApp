
export interface Weather {
  name, icon, main, descripcion: string;
  id, cod, temp: number;
  minMaxTemp: minMaxTemp;
}

export interface minMaxTemp {
  date, day, month, min, max: number;
}
