import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Components} from '../../classes/components';
import {Prepare} from '../../classes/prepare';
import {Recipe} from '../../classes/recipe';
import {HttpClientService} from '../../Services/HttpClientService';
import {Category} from '../general.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AddPhotoComponent} from './add-photo/add-photo.component';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.less', '../../share/share.component.less']
})

export class ItemCreateComponent implements OnInit {

  form = new FormGroup({});

  recipe: Recipe = new Recipe();
  category: Category[] = [];
  pathType;
  itemCategory;

  types: string[] = ['гр', 'кг', 'мл', 'л', 'ч. лож', 'ст. лож.', 'шт'];
  defaultImg = '../../../assets/default_img.svg';


  constructor(private http: HttpClientService,
              private router: Router,
              private ar: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  openAddDialog(component, index: number = null) {
    switch (component) {
      case 'recipe': {
        this.dialog.open(AddPhotoComponent, {
          width: '550px',
          height: '350px',
          data: {recipe: this.recipe}
        });
        break;
      }
      case 'item': {
        this.dialog.open(AddPhotoComponent, {
          width: '550px',
          height: '350px',
          data: {recipe: this.recipe.prepare[index]}
        });
        break;
      }
    }
  }

  getErrorMessage(message: string, type: string = '') {
    switch (message) {
      case 'title': {
        return 'Поле назви неможе бути порожнім';
        break;
      }
      case 'titleSelect': {
        return 'Поле вибору неможе бути порожнім';
        break;
      }
      case 'count': {
        return this.form.get(type).hasError('required') ? 'Поле кількості неможе бути порожнім' : '';
        break;
      }
      case 'componentTitle': {
        return this.form.get(type).hasError('required') ? 'Поле назви неможе бути порожнім' : '';
        break;
      }
      case 'select': {
        return this.form.get(type).hasError('required') ? 'Поле вибору неможе бути порожнім' : '';
        break;
      }
    }
  }

  addTemplate(type: string) {
    switch (type) {
      case 'prepare': {
        this.recipe.prepare.push(new Prepare());
        break;
      }
      case 'component' : {
        this.recipe.component.push(new Components());
        this.addFormControl(this.recipe.component.length - 1);
        break;
      }
    }
  }

  delTemplate(type: string, index: number = null) {
    switch (type) {
      case 'prepare': {
        this.recipe.prepare.splice(index, 1);
        break;
      }
      case 'component' : {
        this.recipe.component.pop();
        this.delFormControl(this.recipe.component.length);
        break;
      }
    }
  }

  addFormControl(index: number) {
    this.form.addControl(`name${index}`, new FormControl('', [Validators.required]));
    this.form.addControl(`count${index}`, new FormControl('', [Validators.required]));
    this.form.addControl(`type${index}`, new FormControl('', [Validators.required]));
  }

  delFormControl(index: number) {
    this.form.removeControl(`name${index}`);
    this.form.removeControl(`count${index}`);
    this.form.removeControl(`type${index}`);
  }

  save() {
    this.recipe.component.forEach((item, index) => {
      item.name = this.form.get(`name${index}`).value;
      item.count = this.form.get(`count${index}`).value;
      item.type = this.form.get(`type${index}`).value;
    });
    switch (this.pathType) {
      case 'create': {
        this.http.newRecord(this.itemCategory, this.recipe).subscribe(
          () => {
            this.router.navigate([`/home/${this.itemCategory}`]);
            this.snackBar.open('Запис успішно додано', null, {duration: 2000});
          },
          () => {
            alert('Помилка під-час додавання рецепту');
            this.router.navigateByUrl(`/home/${this.itemCategory}`);
          }
        );
        break;
      }
      case 'edit': {
        this.http.update(this.itemCategory, this.recipe.id, this.recipe).subscribe(
          () => {
            this.router.navigate([`/home/${this.itemCategory}`]);
            this.snackBar.open('Запис успішно редаговано', null, {duration: 2000});
          },
          () => {
            alert('Помилка під-час додавання рецепту');
            this.router.navigateByUrl(`/home/${this.itemCategory}`);
          }
        );
        break;
      }
    }
  }

  close() {
    this.router.navigateByUrl(`/home/${this.itemCategory}`);
  }

  createPage() {
    this.recipe.prepare.push(new Prepare());
    this.recipe.component.push(new Components());
    this.addFormControl(this.recipe.component.length - 1);
  }

  editPage(id: number) {
    this.http.httpGet(this.itemCategory, id).subscribe((data: Recipe) => {
      this.recipe = data;
      this.recipe.component.forEach((item, index) => {
        this.addFormControl(index);
        this.form.get(`name${index}`).setValue(item.name);
        this.form.get(`count${index}`).setValue(item.count);
        this.form.get(`type${index}`).setValue(item.type);
      },
        () => this.router.navigate(['/home/404']));
    });
  }

  ngOnInit() {
    this.http.httpGet().subscribe((data: Category[]) => {
      this.category = data;
      this.ar.params.subscribe(path => {
        if (!this.category.find(item => item.category === path.category)) {
          this.router.navigate(['404']);
        }
        this.itemCategory = path.category;
        this.pathType = path.type;
        switch (this.pathType) {
          case 'create': {
            this.createPage();
            break;
          }
          case 'edit': {
            this.editPage(path.id);
            break;
          }
          default : {
            this.router.navigate(['404']);
          }
        }
      });
    });

  }

}

