// *************** Third-Party Library Imports ***************
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserData } from './user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';

  usersSubject = new BehaviorSubject<UserData[]>([]);
  users$ = this.usersSubject.asObservable();

  private editingUserSubject = new BehaviorSubject<any>(null);
  editingUser$ = this.editingUserSubject.asObservable();

  private newUsers = new BehaviorSubject<UserData[]>([]);
  newUsers$ = this.newUsers.asObservable();

  usersSubs: Subscription;

  constructor(private http: HttpClient) {}

  filteredUserName = '';

  fetchUsers(): void {
    if (this.usersSubject.getValue().length === 0) {
      this.http.get<UserData[]>(`${this.ROOT_URL}/users`).subscribe(users => {
        this.usersSubject.next(users);
      });
    }
  }

  getUsers() {
    return this.users$;
  }

  getUser(id: number): Observable<UserData> {
    return this.usersSubject.pipe(
      map(users => users.find(user => user.id === id)!)
    );
  }

  addUser(newUser: UserData) {
    const currentUsers = this.usersSubject.getValue();
    const newId = currentUsers.length > 0 ? Math.max(...currentUsers.map(user => user.id)) + 1 : 1;
    const userWithId = { ...newUser, id: newId };
    this.usersSubject.next([...currentUsers, userWithId]);
  }

  updateUser(id: number, updatedUser: UserData): void {
    const currentUsers = this.usersSubject.getValue();
    const updatedUsers = currentUsers.map(user =>
      user.id === id ? { ...user, ...updatedUser } : user
    );
  
    this.usersSubject.next(updatedUsers);
  }
  setEditingUser(user: UserData[]) {
    this.editingUserSubject.next(user);
  }

  resetEditingUser(): void {
    this.editingUserSubject.next(null);
  }

  deleteUser(id: number): void {
    const currentUsers = this.usersSubject.getValue();
    const updatedUsers = currentUsers.filter(user => user.id !== id);
    this.usersSubject.next(updatedUsers);
  }

  getTotalUsers() {
    return this.usersSubject.getValue().length;
  }
}
