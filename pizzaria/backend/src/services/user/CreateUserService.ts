interface userRequest {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    execute({ name, email, password }: userRequest) {
        return { name: name };
    }
}

export { CreateUserService };