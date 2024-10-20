import { Convidado } from "./Convidado";

export class Evento {
    idEvento?:number;
    titleEvento?:string;
    descEvento?:string;
    dtEvento?:string;
    hrEvento?:string; 
    convidados?:Convidado[];

    
}