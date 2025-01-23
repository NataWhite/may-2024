import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCityAllowed(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any): Promise<boolean> | boolean {
          return validationOptions.groups.includes(value);
        },
      },
    });
  };
}
