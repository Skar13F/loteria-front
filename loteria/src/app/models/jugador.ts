export interface Jugador {
  idJugador: string;
  nombre: string;
  carton: Carton;
  ganado: boolean;
}

export interface Carton {
  cartasEnCarton: Carta[];
  matrizMarcado: boolean[][];
}

export interface Carta {
  idCarta: number;
  nombre: string;
  rutaCarta: string;
}
