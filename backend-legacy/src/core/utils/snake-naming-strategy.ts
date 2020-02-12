import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

  public tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
  }

  public columnName(propertyName: string, customName: string, embeddedPrefixes: Array<string>): string {
    return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join('_'));
  }

  public columnNameCustomized(customName: string): string {
    return customName;
  }

  public relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  public joinColumnInverseSideName(joinColumnName: string, propertyName: string): string {
    return joinColumnName || this.relationName(propertyName);
  }
}