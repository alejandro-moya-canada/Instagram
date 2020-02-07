// formato de la publicacion
export interface Post {
    id: string;
    titulo: string;
    contenido: string;
    imagePath: string;
    fechaCreacion: Date;
    creator: string;
}