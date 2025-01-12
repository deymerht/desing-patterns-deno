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
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

class Computer {
  public cpu: string = 'cpu not found';
  public ram: string = 'ram not found';
  public storage: string = 'storage not found';
  public gpu?: string;

  displayConfiguration() {
    console.log(`CPU: ${this.cpu}`);
    console.log(`RAM: ${this.ram}`);
    console.log(`Storage: ${this.storage}`);
    if (this.gpu) console.log(`GPU: ${this.gpu}`);
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  build(): Computer {
    return this.computer;
  }
}

function main(): void {
  const computer1 = new ComputerBuilder()
    .setCPU('Intel i7')
    .setRAM('16GB')
    .setStorage('1TB SSD')
    .setGPU('Nvidia RTX 3080')
    .build();

  computer1.displayConfiguration();

  const computer2 = new ComputerBuilder()
    .setCPU('AMD Ryzen 9')
    .setRAM('32GB')
    .setStorage('2TB SSD')
    .setGPU('AMD Radeon RX 6800')
    .build();

  computer2.displayConfiguration();
}

main();