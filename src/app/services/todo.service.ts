import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { TaskI } from '../entity/task.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<TaskI>;
  private todo: Observable<TaskI[]>;
  constructor(private db: AngularFirestore) { 
    this.getTodos();
  }

  ////////////////////////////////////////////////
  getTodos() {
    //si no existe la colleccion la crea en firebase, cambio el nombre firebase crea otra coleccion
    //lo mejor es usar siempre el mismo nombre  
    this.todosCollection = this.db.collection<TaskI>('todos');
    //si solo se quedan los parentesis devuelve todo en un gran JSON, 
    //porl o que mejor ponemos operadores dentro de pipe
    return this.todo = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(obj=>{
          const data = obj.payload.doc.data();
          const id = obj.payload.doc.id;
          //los ... tres puntos concatena estos dos campos 
          return { id, ...data};
        })
      })
    );
  }

  getTodo(id: string)
  {
    return this.todosCollection.doc<TaskI>(id).valueChanges();
  }

  updateTodo(todo: TaskI, id: string){
    return this.todosCollection.doc(id).update(todo);
  }

  addTodo(todo: TaskI){
    return this.todosCollection.add(todo);
  }

  retmoveTodo(id: string){
    return this.todosCollection.doc(id).delete();
  }

}
