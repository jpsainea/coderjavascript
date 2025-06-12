// Base de datos de items para tanques
const itemsTanque = [
    {
        nombre: "Cursed Helmet",
        hp: 1200,
        armadura: 0,
        resMagica: 25,
        precio: 1760,
        efecto: "Quema enemigos cercanos (1.5% HP enemigo como daño mágico por segundo)"
    },
    {
        nombre: "Athena's Shield",
        hp: 900,
        armadura: 0,
        resMagica: 62,
        precio: 2150,
        efecto: "Escudo mágico que absorbe daño (se recarga después de no recibir daño por 5s)"
    },
    {
        nombre: "Antique Cuirass",
        hp: 1220,
        armadura: 54,
        resMagica: 0,
        precio: 2170,
        efecto: "Reduce el daño físico recibido de ataques repetidos del mismo enemigo"
    },
    {
        nombre: "Blade Armor",
        hp: 0,
        armadura: 90,
        resMagica: 0,
        precio: 1660,
        efecto: "Refleja el 25% del daño físico recibido de ataques básicos"
    },
    {
        nombre: "Dominance Ice",
        hp: 700,
        armadura: 70,
        resMagica: 0,
        precio: 2010,
        efecto: "Reduce la velocidad de ataque y regeneración de HP de enemigos cercanos"
    },
    {
        nombre: "Immortality",
        hp: 800,
        armadura: 40,
        resMagica: 0,
        precio: 2120,
        efecto: "Revive con 15% HP después de morir (enfriamiento 180s)"
    },
    {
        nombre: "Brute Force Breastplate",
        hp: 770,
        armadura: 45,
        resMagica: 45,
        precio: 1870,
        efecto: "Aumenta movilidad y resistencia después de usar habilidades"
    }
];

// Variables globales
let equipamiento = [];
let totalHP = 0;
let totalArmadura = 0;
let totalResMagica = 0;
let precioTotal = 0;
let efectosUnicos = [];
let estadoActual = 'menu';

// Función para imprimir en la consola
function imprimir(texto) {
    console.log(texto);
}

// Función para limpiar la consola
function limpiarConsola() {
    console.clear();
}

// Función para mostrar el menú principal
function mostrarMenu() {
    limpiarConsola();
    imprimir("=== CALCULADORA DE EQUIPAMIENTO TANQUE (MLBB) ===");
    imprimir(`Items equipados: ${equipamiento.length}/5\n`);

    imprimir("=== ESTADÍSTICAS TOTALES ===");
    imprimir(`HP: ${totalHP}`);
    imprimir(`Armadura Física: ${totalArmadura}`);
    imprimir(`Resistencia Mágica: ${totalResMagica}`);
    imprimir(`Precio total: ${precioTotal} oro\n`);

    if (efectosUnicos.length > 0) {
        imprimir("=== EFECTOS ÚNICOS ===");
        efectosUnicos.forEach(efecto => imprimir(`• ${efecto}`));
        imprimir("");
    }

    imprimir("=== OPCIONES ===");
    imprimir("1. Agregar item");
    imprimir("2. Eliminar item");
    imprimir("3. Ver equipamiento actual");
    imprimir("4. Reiniciar equipamiento");
    imprimir("5. Salir");

    solicitarInput();
}

// Función para mostrar la lista de items
function mostrarItems() {
    limpiarConsola();
    imprimir("=== ITEMS DISPONIBLES ===");
    itemsTanque.forEach((item, index) => {
        imprimir(`${index + 1}. ${item.nombre}`);
        imprimir(`   HP: ${item.hp} | Armadura: ${item.armadura} | Resistencia Mágica: ${item.resMagica} | Precio: ${item.precio}`);
        imprimir(`   Efecto: ${item.efecto}\n`);
    });
    imprimir("0. Volver al menú principal");
    solicitarInput();
}

// Función para mostrar el equipamiento actual
function mostrarEquipamiento() {
    limpiarConsola();
    if (equipamiento.length === 0) {
        imprimir("No hay items en el equipamiento.");
    } else {
        imprimir("=== EQUIPAMIENTO ACTUAL ===");
        equipamiento.forEach((item, index) => {
            imprimir(`${index + 1}. ${item.nombre}`);
            imprimir(`   HP: ${item.hp} | Armadura: ${item.armadura} | Resistencia Mágica: ${item.resMagica} | Precio: ${item.precio}`);
            imprimir(`   Efecto: ${item.efecto}\n`);
        });
    }
    imprimir("\n0. Volver al menú principal");
    solicitarInput();
}

// Función para eliminar un item
function eliminarItem() {
    limpiarConsola();
    if (equipamiento.length === 0) {
        imprimir("No hay items para eliminar.");
        setTimeout(() => {
            estadoActual = 'menu';
            mostrarMenu();
        }, 1500);
        return;
    }

    imprimir("=== ELIMINAR ITEM ===");
    equipamiento.forEach((item, index) => {
        imprimir(`${index + 1}. ${item.nombre}`);
    });
    imprimir("0. Volver al menú principal");
    imprimir("\nIngresa el número del item que deseas eliminar:");

    const input = prompt("Ingresa tu elección:");
    if (input !== null) {
        if (input === '0') {
            estadoActual = 'menu';
            mostrarMenu();
            return;
        }

        const num = parseInt(input);
        if (!isNaN(num) && num >= 1 && num <= equipamiento.length) {
            const itemEliminado = equipamiento.splice(num - 1, 1)[0];
            actualizarEstadisticas(itemEliminado, 'restar');
            efectosUnicos = efectosUnicos.filter(efecto => !efecto.startsWith(itemEliminado.nombre));
            imprimir(`¡${itemEliminado.nombre} eliminado!`);
            setTimeout(() => {
                estadoActual = 'menu';
                //mostrarMenu();
            eliminarItem();

            }, 1500);
        } else {
            alert("Número inválido");
            eliminarItem();
        }
    }
}

// Función para reiniciar el equipamiento
function reiniciarEquipamiento() {
    equipamiento = [];
    totalHP = 0;
    totalArmadura = 0;
    totalResMagica = 0;
    precioTotal = 0;
    efectosUnicos = [];
    imprimir("Equipamiento reiniciado.");
    setTimeout(() => {
        estadoActual = 'menu';
        mostrarMenu();
    }, 1500);
}

// Función para solicitar entrada del usuario
function solicitarInput() {
    const input = prompt("Ingresa el número de opción:");
    if (input !== null) {
        manejarComando(input);
    }
}

// Función principal para manejar comandos
function manejarComando(comando) {
    comando = comando.trim();

    switch (estadoActual) {
        case 'menu':
            switch (comando) {
                case '1':
                    estadoActual = 'agregar';
                    mostrarItems();
                    break;
                case '2':
                    estadoActual = 'eliminar';
                    eliminarItem();
                    break;
                case '3':
                    estadoActual = 'ver-equipamiento';
                    mostrarEquipamiento();
                    break;
                case '4':
                    reiniciarEquipamiento();
                    break;
                case '5':
                    imprimir("¡Gracias por usar la calculadora!");
                    return;
                default:
                    alert("Opción no válida");
                    mostrarMenu();
            }
            break;

        case 'agregar':
            if (comando === '0') {
                estadoActual = 'menu';
                mostrarMenu();
            } else {
                const num = parseInt(comando);
                if (!isNaN(num) && num >= 1 && num <= itemsTanque.length) {
                    if (equipamiento.length >= 5) {
                        alert("¡Máximo de 5 items alcanzado!");
                        mostrarMenu();
                        return;
                    }

                    const item = itemsTanque[num - 1];
                    equipamiento.push(item);
                    actualizarEstadisticas(item, 'sumar');
                    efectosUnicos.push(`${item.nombre}: ${item.efecto}`);
                    alert(`¡${item.nombre} agregado!`);
                    //mostrarMenu();
                    mostrarItems();
                } else {
                    alert("Número inválido");
                    mostrarItems();
                }
            }
            break;

        case 'ver-equipamiento':
            if (comando === '0') {
                estadoActual = 'menu';
                mostrarMenu();
            } else {
                alert("Opción no válida");
                mostrarEquipamiento();
            }
            break;

        default:
            estadoActual = 'menu';
            mostrarMenu();
    }
}

// Función para actualizar estadísticas
function actualizarEstadisticas(item, operacion) {
    const factor = operacion === 'sumar' ? 1 : -1;
    totalHP += item.hp * factor;
    totalArmadura += item.armadura * factor;
    totalResMagica += item.resMagica * factor;
    precioTotal += item.precio * factor;
}

// Iniciar la aplicación
console.log("=== INSTRUCCIONES ===");
console.log("1. Usa los números para navegar");
console.log("2. Los prompts aparecerán para entrada");
console.log("3. Usa '0' para volver al menú\n");

mostrarMenu();
