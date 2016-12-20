export interface ICliente {
    id: number;
    nome: string;
    sexo: Sexo;
    cadastro: string;
    alteracao: string
}

export enum Sexo {
    Masculino=0, Feminino=1
}