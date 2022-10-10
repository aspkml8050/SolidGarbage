import { Injectable } from "@angular/core";

@Injectable()
export class AuthServiceToken{
    getAuthToken(): any {
        return  localStorage.getItem("access_token");
    }
}

 