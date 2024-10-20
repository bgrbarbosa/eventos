import { Evento } from "./Evento";

export class Convidado {
    idConvidado?:number;
    nomeConvidado?:string;
    cpfConvidado?:string;
    telConvidado?:string;
    emailConvidado?:string;
    eventos?:Evento[]
}
