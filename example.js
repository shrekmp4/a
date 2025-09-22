import CommitManager from './commitManager.js';
import moment from 'moment';

// Inicializar el gestor de commits
const manager = new CommitManager('./commitData.json');

// Funciones de ejemplo de uso
async function demonstrarCommitManager() {
  try {
    console.log('=== Demo del Gestor de Commits goGreen ===\n');

    // Mostrar estadísticas actuales
    console.log('Estadísticas Actuales:');
    console.log(manager.getCommitStats());
    console.log('\n');

    // Hacer un commit de prueba
    console.log('Haciendo un commit de prueba...');
    await manager.makeCommit('Commit de prueba desde CommitManager');
    
    // Hacer un commit con fecha personalizada
    const fechaPersonalizada = moment().subtract(1, 'day').format();
    console.log('Haciendo un commit con fecha personalizada...');
    await manager.makeCommit('Commit de ayer', fechaPersonalizada);

    // Mostrar estadísticas actualizadas
    console.log('\nEstadísticas Actualizadas:');
    console.log(manager.getCommitStats());

    // Mostrar commits recientes
    manager.displayCommitHistory(5);

    console.log('¡Demo completado exitosamente!');

  } catch (error) {
    console.error('Error en el demo:', error);
  }
}

// Función para generar commits como en el goGreen original
async function generarCommitsGoGreen(cantidad = 10) {
  try {
    console.log(`\n=== Generando ${cantidad} commits estilo goGreen ===`);
    await manager.makeCommits(cantidad);
    console.log('¡Commits generados exitosamente!');
  } catch (error) {
    console.error('Error generando commits:', error);
  }
}

// Función para generar commits para un rango de fechas específico
async function generarCommitsParaRango() {
  try {
    console.log('\n=== Generando commits para la semana pasada ===');
    const fechaInicio = moment().subtract(7, 'days').format('YYYY-MM-DD');
    const fechaFin = moment().format('YYYY-MM-DD');
    
    await manager.generateCommitsForDateRange(fechaInicio, fechaFin, 2);
    console.log('¡Commits para rango de fechas generados!');
  } catch (error) {
    console.error('Error generando commits para rango:', error);
  }
}

// Ejecutar demostración si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  
  if (args.includes('--demo')) {
    demonstrarCommitManager();
  } else if (args.includes('--generate')) {
    const cantidad = parseInt(args[args.indexOf('--generate') + 1]) || 10;
    generarCommitsGoGreen(cantidad);
  } else if (args.includes('--range')) {
    generarCommitsParaRango();
  } else {
    console.log('Uso:');
    console.log('  node example.js --demo          # Ejecutar demostración');
    console.log('  node example.js --generate 20   # Generar 20 commits');
    console.log('  node example.js --range          # Generar commits para la semana pasada');
    console.log('\nEjecutando demo por defecto...\n');
    demonstrarCommitManager();
  }
}