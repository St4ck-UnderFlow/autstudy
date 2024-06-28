export type SupportLevel = "SLIGHT" | "MODERATE" | "SEVERE"

export type Student = {
  supportLevel: SupportLevel,
  user:{
    name: string;
    cpf: string;
    email: string;
    password: string;
    userType: string;
  }
}