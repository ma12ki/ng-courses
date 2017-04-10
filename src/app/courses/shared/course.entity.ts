import * as faker from 'Faker';
import * as moment from 'moment';

export interface ICourse {
  id: number;
  title: string;
  date: Date;
  durationMinutes: number;
  description: string;
  topRated: boolean;
}

export class Course implements ICourse {
  private static idCounter = 0;

  public id: number;

  constructor(
    public title: string = faker.Lorem.words(2).join(' '),
    public date: Date = moment(faker.Date.recent(500)).toDate(),
    public durationMinutes: number = faker.random.number(300) + 30,
    public description: string = faker.Lorem.sentence(),
    public topRated: boolean = Math.random() > 0.5,
  ) {
    this.id = Course.idCounter++;
  }
}
