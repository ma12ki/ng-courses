import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'courseDuration' })
export class CourseDurationPipe implements PipeTransform {
  private static hourInMinutes = 60;

  public transform(totalMinutes: number, _args) {
    const hours = Math.floor(totalMinutes / CourseDurationPipe.hourInMinutes);
    const minutes = totalMinutes - (hours * CourseDurationPipe.hourInMinutes);

    const result = [];

    if (hours) {
      result.push(`${hours}h`);
    }
    if (minutes) {
      result.push(`${minutes}min`);
    }

    return result.join(' ');
  }
}
