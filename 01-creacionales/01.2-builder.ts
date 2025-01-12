/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */

import { COLORS } from '../helpers/colors.ts';

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderByClause: string = '';
  private limitCount: number | null = null;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): this {
    this.fields = fields;
    return this;
  }

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: string, order: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderByClause = `${field} ${order}`;
    return this;
  }

  limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  execute(): string {
    const fields = this.fields.join(', ');
    const whereClause = this.conditions.length ? `WHERE ${this.conditions.join(' AND ')}` : '';
    const orderByClause = this.orderByClause ? `ORDER BY ${this.orderByClause}` : '';
    const limitClause = this.limitCount ? `LIMIT ${this.limitCount}` : '';
    return `SELECT ${fields} FROM ${this.table} ${whereClause} ${orderByClause} ${limitClause}`;
  }
}

function main() {
  const usersQuery = new QueryBuilder('users')
    .select('age')
    .where('age > 30')
    .where('age < 50')
    .where("country = 'COLOMBIA'") // Esto debe de hacer una condición AND
    .orderBy('age')
    .limit(10)
    .execute();

  console.log('%cConsulta:\n', 'color: violet;');
  console.log(usersQuery);
}

main();