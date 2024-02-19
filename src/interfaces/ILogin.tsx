
export interface LoginResponse {
    user: User;
    token: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    image: Image;
}

export interface Image {
    public_id: string;
    image_url: string;
}

export interface LoginData {
    email: string;
    password: string;
}
export interface RegisterData {
    email: string;
    password: string;
    username: string;
}


