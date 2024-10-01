import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsEiaEmailConstraint implements ValidatorConstraintInterface {
  validate(email: any, args: ValidationArguments) {
    // Verificar si el valor es un correo electrónico válido y tiene la terminación @eia.edu.co
    return (
      typeof email === 'string' &&
      /\S+@\S+\.\S+/.test(email) && // Verifica que sea un correo válido
      email.endsWith('@eia.edu.co')
    ); // Verifica la terminación
  }

  defaultMessage(args: ValidationArguments) {
    return 'El correo debe ser un correo válido con la terminación @eia.edu.co';
  }
}

export function IsEiaEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEiaEmailConstraint,
    });
  };
}
