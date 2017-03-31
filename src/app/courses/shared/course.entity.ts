import * as faker from 'Faker';

export interface ICourse {
  id: number;
  title: string;
  dateCreated: Date;
  durationMinutes: number;
  description: string;
}

export class Course implements ICourse {
  private static idCounter = 0;

  public id: number;

  constructor(
    public title: string = faker.Lorem.words(2).join(' '),
    public dateCreated: Date = faker.Date.recent(500),
    public durationMinutes: number = faker.random.number(300) + 30,
    public description: string = faker.Lorem.sentence(),
  ) {
    this.id = Course.idCounter++;
  }
}
