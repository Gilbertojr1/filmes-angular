export interface Filmes {
  _id: string;
  nome: string;
  data_lancamento: Date;
  diretor: string;
  duracao: number;
  sinopse: string;
  estudio: object;
  categoria: object;
}
