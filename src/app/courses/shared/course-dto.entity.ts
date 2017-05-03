import * as faker from 'Faker';
import * as moment from 'moment';

export interface ICourseDto {
  id: number;
  title: string;
  date: string;
  durationSeconds: number;
  description: string;
  topRated: boolean;
  authors: number[]
}

export class CourseDto implements ICourseDto {
  private static idCounter = 0;

  public id: number;

  constructor(
    public title: string = faker.Lorem.words(2).join(' '),
    public date: string = moment(faker.Date.recent(500)).toDate().toISOString(),
    public durationSeconds: number = faker.random.number(6000) + 300,
    public description: string = faker.Lorem.sentence(),
    public topRated: boolean = Math.random() > 0.5,
    public authors: number[] = [faker.random.number(5), faker.random.number(5) + 5],
  ) {
    this.id = CourseDto.idCounter++;
  }
}
