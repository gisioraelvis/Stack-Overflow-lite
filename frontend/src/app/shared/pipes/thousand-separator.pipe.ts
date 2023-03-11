import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator',
  standalone: true,
})
export class ThousandSeparatorPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }

    // convert the number to a string and split the integer and decimal parts
    const [integerPart, decimalPart] = value.toString().split('.');

    // insert commas every three digits in the integer part
    const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // combine the integer and decimal parts back into a string
    const formattedNumber =
      decimalPart !== undefined
        ? `${integerWithCommas}.${decimalPart}`
        : integerWithCommas;

    return formattedNumber;
  }
}
