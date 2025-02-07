// *************** Third-Party Library Imports ***************
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserData } from './user.model';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';

  usersSubject = new BehaviorSubject<UserData[]>([]);
  users$ = this.usersSubject.asObservable();

  private editingUserSubject = new BehaviorSubject<UserData[]>(null);
  editingUser$ = this.editingUserSubject.asObservable();

  private newUsers = new BehaviorSubject<UserData[]>([]);
  newUsers$ = this.newUsers.asObservable();

  usersSubs: Subscription;

  constructor(private http: HttpClient) {}

  fetchUsers(): void {
    this.usersSubs = this.http
      .get<UserData[]>(`${this.ROOT_URL}/users`)
      .subscribe((users) => {
        this.usersSubject.next(users);
      });
  }

  getUsers(): Observable<UserData[]> {
    return this.users$;
  }

  getUser(id: number): Observable<UserData> {
    return new Observable((observer) => {
      const user = this.usersSubject.getValue().find((u) => u.id === id);
      observer.next(user);
      observer.complete();
    });
  }

  addUser(newUser: {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: { street: string; suite: string; city: string };
  }) {
    return this.http
            .post(`${this.ROOT_URL}/users`, newUser)
  }

  updateUser(id: number, updatedUser: UserData): Observable<UserData> {
    return this.http.put<UserData>(`${this.ROOT_URL}/users/${id}`, updatedUser);
  }

  setEditingUser(user: UserData[]) {
    this.editingUserSubject.next(user);
  }

  resetEditingUser(): void {
    this.editingUserSubject.next(null);
  }
}
