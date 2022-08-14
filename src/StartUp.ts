import { User } from "@entities/User";
import { ApplicationError } from "@providers/error/ApplicationError";
import { HttpErrorCode } from "@providers/error/ErrorTypes";
import { Report } from "@providers/error/Report.Provider";

let USERDB: User[] = [
    new User("Akira", "akira@email.com"),
    new User("Dornelles", "dornelles@email.com"),
    new User("Ola", "ola@email.com"),
];

// repository pattern
function Create(user: User): User {
    USERDB.push(user);
    return user;
}

function Find(email: string): User | undefined {
    return USERDB.find(user => user.Email === email);
}

function CreateUserUseCase(data: User): void | ApplicationError {

    const { Id, Name, Email } = data;

    let userFound = Find(Email);

    if (userFound) {
        const error = Report.Error(new ApplicationError(HttpErrorCode.BadRequest, "User already exists"), true) as ApplicationError;
        return error;
    }


    // threat this error in controller
    /*  if (userFound) {
         throw new Error("User already exists");
     } */

    /*  try {
         if (userFound) {
             throw new Error("User already exists");
         }
     } catch (error: any) {
         console.log(error.message);
     }
  */

    /* 
    if (userFound) {
        console.log("User already exists");
        return;
    }
 */
    let newUser: User = Create(data);
    console.log(`User created successfully: ${newUser.Id} - ${newUser.Name} - ${newUser.Email}`);
}

function CreateUserController(data: User): void {
    let error = CreateUserUseCase(data);

    if (error) {
        console.log(error.Message);
        console.log(error.ErrorType);
    }
}

let testUser: User = new User("Test", "test@email.com");
let userExist: User = new User("New User", "akira@email.com");

//CreateUserUseCase(userExist);

CreateUserController(userExist);