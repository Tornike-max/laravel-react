export type LoginType = {
    email: string;
    password: string;
};

export type SignUpType = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export type UserType = {
    id: number;
    name: string;
    email: string;
    email_verified_at: null;
    created_at: string;
    updated_at: string;
};

export type UserFormType = {
    id?: string | number;
    name: string;
    email: string;
    password: string;
    passwordConfirm?: string;
};
