/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
*
* * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
*
* https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from '../helpers/colors.ts';

interface Hamburger {
  prepare(): void;
}

class ChickenBurger implements Hamburger {
  prepare(): void {
    console.log('%cChicken Burger', COLORS.blue);
  }
}

class BeefBurger implements Hamburger {
  prepare(): void {
    console.log('%cBeef Burger', COLORS.green);
  }
}

class BeansBurger implements Hamburger {
  prepare(): void {
    console.log('%cBeans Burger', COLORS.red);
  }
}

abstract class RestaurantFactory {
  protected abstract createHamburger(): Hamburger;

  orderHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenRestaurant extends RestaurantFactory {
  override createHamburger(): Hamburger {
    return new ChickenBurger();
  }
}

class BeefRestaurant extends RestaurantFactory {
  override createHamburger(): Hamburger {
    return new BeefBurger();
  }
}

class BeansRestaurant extends RestaurantFactory {
  override createHamburger(): Hamburger {
    return new BeansBurger();
  }
}

function main() { 
  let restaurant: RestaurantFactory;
  const burgerType = prompt('Ingrese el tipo de hamburguesa (pollo/res/beans): ');
  switch (burgerType) { 
    case 'pollo':
      restaurant = new ChickenRestaurant();
      break;
    case 'res':
      restaurant = new BeefRestaurant();
      break;
    case 'beans':
      restaurant = new BeansRestaurant();
      break;
    default:
      throw new Error('Tipo de hamburguesa no válido');
  }

  restaurant.orderHamburger();
}

main();