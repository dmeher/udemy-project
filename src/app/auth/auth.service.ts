import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    signUp(email: string, password: string) {
        console.log('Email: '+ email, 'Password: '+ password)
    }

    login(email: string, password: string) {
        console.log('Email: '+ email, 'Password: '+ password)
    }
}