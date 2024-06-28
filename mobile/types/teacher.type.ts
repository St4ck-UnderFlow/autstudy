export type DeggreeLevel = "ASSOCIATE" | "BACHELORS"  | "BACHELORS" |  "MASTERS" 
| "GRADUATE"  | "PROFESSIONAL" 

export type Teacher = {
  deggreeLevel: DeggreeLevel,
  user:{
    name: string;
    cpf: string;
    email: string;
    password: string;
    userType: string;
  }
}