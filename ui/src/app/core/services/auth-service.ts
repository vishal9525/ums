import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  
  constructor(private http: HttpClient) {}
  API = environment.apiUrl;

  /*   public isAuthenticated(): boolean {
    let token = localStorage.getItem("token");
    if (token) return !this.tokenExpired(token);
    else return false;
  }
 */
  public isAuthenticated(): boolean {
    let token = localStorage.getItem("token");
    /*     if (token) return !this.tokenExpired(token); */
    if (token) return true;
    else return false;
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  /*   authenticateUser(email: any, password: any) {
    let user = {
      email: email,
      password: password,
    };
    return this.http.post(`${this.API}/userDetails/login`, user);
  } */

  getAppName(){
    let appName:any=localStorage.getItem("appName");
    return appName;
  }
  saveUserData(user: any) {
    return this.http.post(`${this.API}/userDetails/createUser`, user);
  }

  submitUserMember(members: any) {
    return this.http.post(`${this.API}/members/addMembers`, members, {
      responseType: "text",
    });
  }
  authenticateUser(email: any, password: any) {
    let user = {
      email: email,
      password: password,
    };
    return this.http.get(
      `https://run.mocky.io/v3/eb3807da-a739-4713-ad9e-078a8ffe4215`
    );
  }
  getAppNameList(){
   let appNameArray=['my-app','my-library','awsome-library','gold-gym']
   return appNameArray;
   }

  getUserDetails() {
    return this.http.get(
      `https://run.mocky.io/v3/1c88acf3-243b-4c65-beb1-0114f9046fff`
    );
  }

  /*  getUserDetails() {
    return this.http.get(`${this.API}/userDetails/${this.getUserID()}`);
  } */

  getAllUsers() {
    return this.http.get(`${this.API}/userDetails`);
  }

  getDesignations() {
    return this.http.get(`${this.API}/designations`);
  }

  getPeople() {
    return this.http.get(`${this.API}/members/status/${this.getUserID()}`);
  }
  getmorePeople(leader_id: any) {
    return this.http.get<any[]>(`${this.API}/members/status/${leader_id}`);
  }
  getMembers(leader_id: any) {
    return this.http.get(`${this.API}/members/${leader_id}`);
  }
  getRemainingUsers() {
    return this.http.get(`${this.API}/members/filteredUsers`);
  }
  updateFormStatus(status: string) {
    return this.http.put(`${this.API}/userDetails/configs/form_status`, {
      form_status: status,
      user_id: "",
    });
  }
  updateIndividualFormStatus(status: string) {
    return this.http.put(`${this.API}/userDetails/configs/form_status`, {
      form_status: status,
      user_id: this.getUserID(),
    });
  }
  updateRoleStatus(status: string, user_id: string) {
    return this.http.put(`${this.API}/userDetails/configs/role_status`, {
      role_status: status,
      user_id: user_id,
    });
  }

  getUserFormStatus() {
    return this.http.get(`${this.API}/userDetails/configs/${this.getUserID()}`);
  }

  appraisalProcess(data: any) {
    return this.http.post(`${this.API}/appraisal`, data, {
      responseType: "text",
    });
  }
  getActiveAppraisla() {
    return this.http.get(`${this.API}/appraisal`, {
      responseType: "text",
    });
  }
  getShortName(customerName: any) {
    let size = customerName.split(" ").length;
    let shortName;
    if (size === 1) {
      shortName = customerName.slice(0, 2);
    } else if (size === 2) {
      shortName =
        customerName.split(" ")[0].slice(0, 1) +
        customerName.split(" ")[1].slice(0, 1);
    } else {
      shortName =
        customerName.split(" ")[0].slice(0, 1) +
        customerName.split(" ")[2].slice(0, 1);
    }
    return shortName;
  }
  getUserRole() {
    return localStorage.getItem("role");
  }

  getUserID() {
    return localStorage.getItem("user_id");
  }

  getUserName() {
    return localStorage.getItem("user_name");
  }
}
