// *************** Third-Party Library Imports ***************
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// *************** Application Models and Settings Imports ***************
import { UserData } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // *************** Private Variables ***************
  private readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';
  private usersSubject = new BehaviorSubject<UserData[]>([]);
  users$ = this.usersSubject.asObservable();

  private editingUserSubject = new BehaviorSubject<UserData | null>(null);
  editingUser$ = this.editingUserSubject.asObservable();

  // *************** State Variables ***************
  filteredUserName = '';

  constructor(private http: HttpClient) {}

  // *************** Function For Fetching All Users Data From JSON Placeholder API Then Push It To userSubject 
  fetchUsers(): void {
    if (this.usersSubject.getValue().length === 0) {
      this.http.get<UserData[]>(`${this.ROOT_URL}/users`).subscribe(users => {
        this.usersSubject.next(users);
      });
    }
  }

  // *************** Function For Fetching All Users Data In userSubject
  getUsers(): Observable<UserData[]> {
    return this.users$;
  }

  // *************** Function For Get A Certain User Data In userSubject
  getUser(id: number): Observable<UserData | undefined> {
    return this.usersSubject.pipe(
      map(users => users.find(user => user.id === id))
    );
  }

  // *************** Function For Add A New User Data In userSubject
  addUser(newUser: UserData): void {
    const currentUsers = this.usersSubject.getValue();
    const newId = currentUsers.length > 0 ? Math.max(...currentUsers.map(user => user.id)) + 1 : 1;
    const userWithId = { ...newUser, id: newId };
    this.usersSubject.next([...currentUsers, userWithId]);
  }

  // *************** Function For Update A Certain User Data In userSubject
  updateUser(id: number, updatedUser: Partial<UserData>): void {
    const currentUsers = this.usersSubject.getValue();
    const updatedUsers = currentUsers.map(user =>
      user.id === id ? { ...user, ...updatedUser } : user
    );

    this.usersSubject.next(updatedUsers);
  }

  // *************** Function For Setting EditingTask
  setEditingUser(user: UserData | null): void {
    this.editingUserSubject.next(user);
  }

  // *************** Function For Resetting EditingTask
  resetEditingUser(): void {
    this.editingUserSubject.next(null);
  }

  // *************** Function For Deleting A Certain User
  deleteUser(id: number): void {
    const currentUsers = this.usersSubject.getValue();
    const updatedUsers = currentUsers.filter(user => user.id !== id);
    this.usersSubject.next(updatedUsers);
  }

  // *************** Function For Get Total Users in userSubject
  getTotalUsers(): number {
    return this.usersSubject.getValue().length;
  }
}
