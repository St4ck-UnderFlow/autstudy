export type DegreeLevel = 
"BACHELORS" | 
"MASTERS"   | 
"PHD"       |  
"POSTDOC" 

export type Teacher = {
  degreeLevel: DegreeLevel,
  user:{
    name: string;
    cpf: string;
    email: string;
    password: string;
    userType: string;
  }
}