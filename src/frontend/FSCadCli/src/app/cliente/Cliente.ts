export interface ICliente {
    id: number;
    nome: string;
    sexo: Sexo;
    cadastro: Date;
    alteracao: Date
}

export enum Sexo {
    Masculino=0, Feminino=1
}