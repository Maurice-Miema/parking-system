export interface User {
    _id: string;
    nom: string;
    postnom: string;
    prenom: string;
    email: string;
    role: "admin" | "recepteur" | "comptable"; // tu peux élargir si tu veux
    fonction: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
