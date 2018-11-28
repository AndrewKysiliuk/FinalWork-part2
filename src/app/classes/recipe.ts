import { Components } from './components';
import { Prepare } from './prepare';

export class Recipe {

  constructor(
      public id: number = null,
      public title: string = '',
      public description: string = '',
      public img: string = '',
      public date: string = '',
      public component: Components[] = [],
      public prepare: Prepare[] = []
  ) {}

}
