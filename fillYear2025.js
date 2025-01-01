import CommitManager from './commitManager.js';
import moment from 'moment';

async function fillYear2025() {
  console.log('🌱 Iniciando llenado del año 2025 con commits...');
  
  const manager = new CommitManager('./commitData.json');
  
  // Definir el rango de fechas para todo el año 2025
  const startDate = '2025-01-01';
  const endDate = '2025-12-31';
  
  console.log(`📅 Generando commits desde ${startDate} hasta ${endDate}`);
  
  // Calcular el número total de días en 2025
  const start = moment(startDate);
  const end = moment(endDate);
  const totalDays = end.diff(start, 'days') + 1;
  
  console.log(`📊 Total de días a llenar: ${totalDays}`);
  
  let currentDate = moment(startDate);
  let totalCommits = 0;
  
  try {
    while (currentDate.isSameOrBefore(end)) {
      const dateStr = currentDate.format('YYYY-MM-DD');
      
      // Generar entre 1 y 5 commits por día para hacer el gráfico más verde
      const commitsPerDay = Math.floor(Math.random() * 5) + 1;
      
      console.log(`📝 Generando ${commitsPerDay} commits para ${dateStr}`);
      
      for (let i = 0; i < commitsPerDay; i++) {
        // Generar hora aleatoria del día
        const randomHour = Math.floor(Math.random() * 24);
        const randomMinute = Math.floor(Math.random() * 60);
        const randomSecond = Math.floor(Math.random() * 60);
        
        const commitDateTime = `${dateStr}T${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}:${randomSecond.toString().padStart(2, '0')}+01:00`;
        
        const commitMessage = `Daily contribution ${dateStr} #${i + 1}`;
        
        try {
          await manager.makeCommit(commitMessage, commitDateTime);
          totalCommits++;
          
          // Pequeña pausa para evitar problemas de rendimiento
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.error(`❌ Error creando commit para ${dateStr}:`, error.message);
        }
      }
      
      // Avanzar al siguiente día
      currentDate.add(1, 'day');
      
      // Mostrar progreso cada 30 días
      if (totalCommits % 150 === 0) {
        console.log(`🚀 Progreso: ${totalCommits} commits creados hasta ${dateStr}`);
      }
    }
    
    console.log(`✅ ¡Completado! Se crearon ${totalCommits} commits para todo el año 2025`);
    console.log(`📈 Tu gráfico de contribuciones estará completamente verde!`);
    
    // Mostrar estadísticas finales
    const stats = manager.getCommitStats();
    console.log('\n📊 Estadísticas finales:');
    console.log(`- Total de commits: ${stats.totalCommits}`);
    console.log(`- Primer commit: ${stats.firstCommit}`);
    console.log(`- Último commit: ${stats.lastCommit}`);
    
    console.log('\n🚀 Para enviar todos los commits a GitHub, ejecuta:');
    console.log('git push origin main');
    
  } catch (error) {
    console.error('❌ Error durante la generación de commits:', error);
    throw error;
  }
}

// Función para llenar solo algunos meses específicos
async function fillSpecificMonths(months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
  console.log('🌱 Llenando meses específicos del 2025...');
  
  const manager = new CommitManager('./commitData.json');
  let totalCommits = 0;
  
  for (const month of months) {
    const startDate = `2025-${month.toString().padStart(2, '0')}-01`;
    const endDate = moment(startDate).endOf('month').format('YYYY-MM-DD');
    
    console.log(`📅 Llenando ${moment(startDate).format('MMMM YYYY')}`);
    
    let currentDate = moment(startDate);
    const monthEnd = moment(endDate);
    
    while (currentDate.isSameOrBefore(monthEnd)) {
      const dateStr = currentDate.format('YYYY-MM-DD');
      const commitsPerDay = Math.floor(Math.random() * 4) + 1;
      
      for (let i = 0; i < commitsPerDay; i++) {
        const randomHour = Math.floor(Math.random() * 24);
        const randomMinute = Math.floor(Math.random() * 60);
        const commitDateTime = `${dateStr}T${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}:00+01:00`;
        
        try {
          await manager.makeCommit(`Monthly contribution ${dateStr} #${i + 1}`, commitDateTime);
          totalCommits++;
          await new Promise(resolve => setTimeout(resolve, 50));
        } catch (error) {
          console.error(`Error en commit ${dateStr}:`, error.message);
        }
      }
      
      currentDate.add(1, 'day');
    }
  }
  
  console.log(`✅ Completado! ${totalCommits} commits creados para los meses seleccionados`);
}

// Función para crear patrones específicos
async function createPattern(pattern = 'full') {
  const manager = new CommitManager('./commitData.json');
  
  switch (pattern) {
    case 'full':
      await fillYear2025();
      break;
    case 'weekdays':
      await fillWeekdaysOnly();
      break;
    case 'intense':
      await fillIntensePattern();
      break;
    default:
      console.log('Patrones disponibles: full, weekdays, intense');
  }
}

async function fillWeekdaysOnly() {
  console.log('🌱 Llenando solo días laborables del 2025...');
  
  const manager = new CommitManager('./commitData.json');
  let currentDate = moment('2025-01-01');
  const endDate = moment('2025-12-31');
  let totalCommits = 0;
  
  while (currentDate.isSameOrBefore(endDate)) {
    // Solo días laborables (lunes a viernes)
    if (currentDate.day() >= 1 && currentDate.day() <= 5) {
      const dateStr = currentDate.format('YYYY-MM-DD');
      const commitsPerDay = Math.floor(Math.random() * 6) + 2; // 2-7 commits
      
      for (let i = 0; i < commitsPerDay; i++) {
        const workHour = Math.floor(Math.random() * 9) + 9; // 9 AM - 6 PM
        const randomMinute = Math.floor(Math.random() * 60);
        const commitDateTime = `${dateStr}T${workHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}:00+01:00`;
        
        try {
          await manager.makeCommit(`Work day contribution ${dateStr} #${i + 1}`, commitDateTime);
          totalCommits++;
          await new Promise(resolve => setTimeout(resolve, 75));
        } catch (error) {
          console.error(`Error en commit ${dateStr}:`, error.message);
        }
      }
    }
    
    currentDate.add(1, 'day');
  }
  
  console.log(`✅ Completado! ${totalCommits} commits en días laborables`);
}

async function fillIntensePattern() {
  console.log('🌱 Creando patrón intenso para 2025...');
  
  const manager = new CommitManager('./commitData.json');
  let currentDate = moment('2025-01-01');
  const endDate = moment('2025-12-31');
  let totalCommits = 0;
  
  while (currentDate.isSameOrBefore(endDate)) {
    const dateStr = currentDate.format('YYYY-MM-DD');
    // Patrón intenso: más commits en ciertos días
    const dayOfWeek = currentDate.day();
    let commitsPerDay;
    
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Fines de semana
      commitsPerDay = Math.floor(Math.random() * 3) + 1; // 1-3 commits
    } else { // Días laborables
      commitsPerDay = Math.floor(Math.random() * 8) + 3; // 3-10 commits
    }
    
    for (let i = 0; i < commitsPerDay; i++) {
      const randomHour = Math.floor(Math.random() * 24);
      const randomMinute = Math.floor(Math.random() * 60);
      const commitDateTime = `${dateStr}T${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}:00+01:00`;
      
      try {
        await manager.makeCommit(`Intense pattern ${dateStr} #${i + 1}`, commitDateTime);
        totalCommits++;
        await new Promise(resolve => setTimeout(resolve, 50));
      } catch (error) {
        console.error(`Error en commit ${dateStr}:`, error.message);
      }
    }
    
    currentDate.add(1, 'day');
  }
  
  console.log(`✅ Patrón intenso completado! ${totalCommits} commits creados`);
}

// Ejecutar según argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🌱 Script para llenar el año 2025 con commits

Uso:
  node fillYear2025.js                    # Llenar todo el año
  node fillYear2025.js --weekdays         # Solo días laborables
  node fillYear2025.js --intense          # Patrón intenso
  node fillYear2025.js --months 1,2,3     # Meses específicos
  node fillYear2025.js --help             # Mostrar esta ayuda

Ejemplos:
  node fillYear2025.js --months 6,7,8     # Solo verano
  node fillYear2025.js --weekdays          # Simular trabajo regular
  `);
} else if (args.includes('--weekdays')) {
  fillWeekdaysOnly().catch(console.error);
} else if (args.includes('--intense')) {
  fillIntensePattern().catch(console.error);
} else if (args.includes('--months')) {
  const monthsIndex = args.indexOf('--months');
  if (monthsIndex !== -1 && args[monthsIndex + 1]) {
    const months = args[monthsIndex + 1].split(',').map(m => parseInt(m.trim()));
    fillSpecificMonths(months).catch(console.error);
  } else {
    console.error('❌ Especifica los meses: --months 1,2,3');
  }
} else {
  // Por defecto, llenar todo el año
  fillYear2025().catch(console.error);
}