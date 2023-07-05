import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(private http: HttpClient) { }
  API = environment.apiUrl;
  tokenDetails: any;

  public isAuthenticated(): boolean {
    let token = localStorage.getItem("token");
    if (token) return !this.tokenExpired(token);
    if (token) return true;
    else return false;
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  authenticateUser(username: any, password: any) {
    let user = {
      userName: username,
      password: password,
    };
    return this.http.post('http://localhost:3000/auth/login', user)
  }
  getAppNameList() {
    let appNameArray = ['my-app', 'my-library', 'awsome-library', 'gold-gym']
    return appNameArray;
  }

  getAdminDetails(adminId: any) {
    return this.http.get(`http://localhost:3000/admin/${adminId}`);
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
  getAppName() {
    const token: any = localStorage.getItem("token");
    if (token) {
      this.tokenDetails = jwt_decode(token);
      let appName = this.tokenDetails.appName;
      return appName;
    } else {
      return null
    }
  }
  getUserRole() {
    return this.tokenDetails.role;
  }
  getUserID() {
    return localStorage.getItem("userId");
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

}
