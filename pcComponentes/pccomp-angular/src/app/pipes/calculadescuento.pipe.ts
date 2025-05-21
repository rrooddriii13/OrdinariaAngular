import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculadescuento'
})
export class CalculadescuentoPipe implements PipeTransform {

  transform(value: number, descuento:number): number {
    let _descuento:number=value*(1-(descuento/100));
    return Math.round(_descuento*100)/100;
  }

}
