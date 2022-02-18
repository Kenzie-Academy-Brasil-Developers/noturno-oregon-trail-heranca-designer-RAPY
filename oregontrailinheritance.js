class Traveler {
    constructor(name) {
            this._name = name;
            this._food = 1; // Inicializada com 1
            this._isHealthy = true; // Boolean - default = true
        }
        // O principal objetivo do Traveler é racionar seus 
        // mantimentos através de caçadas e refeições para que
        // ele não fique doente durante sua viagem.

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }

    get food() {
        return this._food;
    }

    set food(newFood) {
        this._food = newFood;
    }

    get isHealthy() {
        return this._isHealthy;
    }

    set isHealthy(newIsHealthy) {
            this._isHealthy = newIsHealthy;
        }
        // Para racionar seus mantimentos, o Traveler poderá:

    // hunt(Caçar): Quando o Traveler sair para caçar, a 
    // quantidade de comida deve aumentar em 2.
    hunt() {
        this.food += 2;
    }

    // eat(Comer): Quando o Traveler tentar comer, caso a 
    // quantidade de comida for maior que 0, então o Traveler 
    // perde 1 comida, e continua saudável. Caso a quantidade 
    // for 0, então o Traveler não consegue comer e fica doente.
    eat() {
        if (this.food > 0) {
            this.food -= 1;
        } else {
            this.isHealthy = false;
        }
    }
}

class Hunter extends Traveler {
    constructor(name, food, isHealthy) {
        super(name, food, isHealthy)

        this._food = 2;

    }


    hunt() {
        this.food += 5;
    }
    eat() {
        if (this.food >= 2) {
            this.food -= 2;
        } else {
            this.food = 0;
            this.isHealthy = false;
        }
    }
    giveFood(pessoa, numOfFoodUnits) {
        if (numOfFoodUnits <= this.food) {
            pessoa.food += numOfFoodUnits;
            this.food -= numOfFoodUnits;
        }
    }
}

class Doctor extends Traveler {
    constructor(name, food, isHealthy) {
        super(name, food, isHealthy)



    }

    heal(pessoa) {
        pessoa.isHealthy = true;
    }

}

class Wagon {
    constructor(capacity) {
        this._capacity = capacity;
        this._passageiros = []; // Array vazio
    }

    get capacity() {
        return this._capacity;
    }

    set capacity(newCapacity) {
        this._capacity = newCapacity;
    }

    get passageiros() {
        return this._passageiros;
    }

    set passageiros(newPassageiro) {
        this._passageiros.push(newPassageiro);
    }

    // O pricipal objetivo do Cocheiro (Piloto da carroça) 
    // é monitorar os assentos e estado de saúde de todos 
    // os viajantes para que ele possa decidir seguir viagem 
    // ou manter a quarentena.

    // Para monitorar seus assentos e seus viajantes, o cocheiro 
    // poderá:

    // getAvailableSeatCount: Retorna o número de assentos vazios,
    // determinado pela capacidade que foi estipulada quando a 
    // carroça foi criada comparado com o número de passageiros a 
    // bordo no momento.
    getAvailableSeatCount() {
            const assVazio = this.capacity - this.passageiros.length
            return assVazio
        }
        // join: Adicione um viajante à carroça se tiver espaço. 
        // Se a carroça já estiver cheia, não o adicione.
    join(newPassageiro) {
            if (this.getAvailableSeatCount() > 0) {
                this.passageiros = newPassageiro
            }
        }
        // shouldQuarantine: Retorna true se houver pelo menos uma 
        // pessoa não saudável na carroça. Retorna false se não 
        // houver.
    shouldQuarantine() {
        let quarentena = false;
        if (this.passageiros.filter(passageiro => passageiro.isHealthy === false).length > 0) {
            quarentena = true;
        }

        return quarentena;
    }

    // totalFood: Retorna o número total de comida de todos os 
    // ocupantes da carroça.
    totalFood() {
        let total = 0;
        this._passageiros.forEach((value) => {
            total += value.food
        });
        return total;
    }

}

// ------------------- teste --------------
// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);