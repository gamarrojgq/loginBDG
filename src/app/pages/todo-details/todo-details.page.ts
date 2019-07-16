import { Component, OnInit } from '@angular/core';
import { TaskI } from 'src/app/entity/task.interface';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service'

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  todo: TaskI = {
    task:  "",
    priority: 0
  }

  todoId = null;
  constructor(private route: ActivatedRoute, private nav: NavController,
    private todoService: TodoService, private loadingController: LoadingController) { }

  ngOnInit() { 
    this.todoId = this.route.snapshot.params["id"];
    if (this.todoId){
      this.loadTodo();
    }
  }

  async loadTodo(){
    const loading = await this.loadingController.create({
      message: "Cargando..."
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(todo => {
      this.todo = todo; 
      loading.dismiss();
    })
  }

  async guardarTodo() {
    const loading = await this.loadingController.create({
      message: "Cargando..."
    });
    await loading.present();
    if (this.todoId){
      this.todoService.updateTodo(this.todo, this.todoId).then(()=> {
        loading.dismiss();
        this.nav.navigateForward("/admin");
      });
    }else{
      this.todoService.addTodo(this.todo).then(()=> {
        loading.dismiss();
        this.nav.navigateForward("/admin");
      });
    }
  }

}
