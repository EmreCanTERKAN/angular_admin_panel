export interface CreateUserModel {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    role: string;
    signature?: string;
    status: 'active' | 'pasive';
  }