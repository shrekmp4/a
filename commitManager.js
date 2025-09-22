import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import fs from 'fs';

class CommitManager {
  constructor(dataFilePath = './commitData.json') {
    this.dataFilePath = dataFilePath;
    this.git = simpleGit();
    this.initializeDataFile();
  }

  // Inicializar el archivo de datos si no existe
  initializeDataFile() {
    if (!fs.existsSync(this.dataFilePath)) {
      const initialData = {
        commits: [],
        lastUpdated: moment().format(),
        totalCommits: 0,
        metadata: {
          version: "1.0.0",
          description: "Datos de timestamp de commits para goGreen",
          created: moment().format()
        }
      };
      jsonfile.writeFileSync(this.dataFilePath, initialData, { spaces: 2 });
      console.log(`Archivo de datos inicializado: ${this.dataFilePath}`);
    }
  }

  // Cargar datos de commits existentes
  loadCommitData() {
    try {
      return jsonfile.readFileSync(this.dataFilePath);
    } catch (error) {
      console.error('Error cargando datos de commits:', error);
      return { commits: [], lastUpdated: null, totalCommits: 0 };
    }
  }

  // Guardar datos de commits al archivo JSON
  saveCommitData(data) {
    try {
      jsonfile.writeFileSync(this.dataFilePath, data, { spaces: 2 });
      console.log('Datos de commits guardados exitosamente');
    } catch (error) {
      console.error('Error guardando datos de commits:', error);
    }
  }

  // Agregar un nuevo registro de commit
  addCommitRecord(message, customDate = null) {
    const commitData = this.loadCommitData();
    const timestamp = customDate || moment().format();
    
    const newCommit = {
      id: Date.now().toString(),
      message: message,
      timestamp: timestamp,
      date: moment(timestamp).format('YYYY-MM-DD'),
      time: moment(timestamp).format('HH:mm:ss'),
      iso: moment(timestamp).toISOString()
    };

    commitData.commits.push(newCommit);
    commitData.totalCommits = commitData.commits.length;
    commitData.lastUpdated = moment().format();

    this.saveCommitData(commitData);
    return newCommit;
  }

  // Hacer un commit de git con seguimiento de timestamp
  async makeCommit(message, customDate = null) {
    try {
      const timestamp = customDate || moment().format();
      
      // Agregar registro de commit a nuestros datos
      const commitRecord = this.addCommitRecord(message, timestamp);
      
      // Agregar todos los cambios al stage
      await this.git.add('.');
      
      // Hacer el commit con fecha personalizada si se proporciona
      const commitOptions = customDate ? { '--date': customDate } : {};
      await this.git.commit(message, commitOptions);
      
      console.log(`Commit creado: ${message}`);
      console.log(`Timestamp: ${timestamp}`);
      
      return commitRecord;
    } catch (error) {
      console.error('Error haciendo commit:', error);
      throw error;
    }
  }

  // Hacer push de commits al repositorio remoto
  async pushCommits() {
    try {
      await this.git.push();
      console.log('Commits enviados exitosamente');
    } catch (error) {
      console.error('Error enviando commits:', error);
      throw error;
    }
  }

  // Obtener estadísticas de commits
  getCommitStats() {
    const data = this.loadCommitData();
    const commits = data.commits;
    
    if (commits.length === 0) {
      return { 
        totalCommits: 0, 
        firstCommit: null, 
        lastCommit: null, 
        commitsToday: 0,
        commitsByDate: {}
      };
    }

    const today = moment().format('YYYY-MM-DD');
    const commitsToday = commits.filter(commit => commit.date === today).length;
    
    return {
      totalCommits: commits.length,
      firstCommit: commits[0],
      lastCommit: commits[commits.length - 1],
      commitsToday: commitsToday,
      commitsByDate: this.groupCommitsByDate(commits)
    };
  }

  // Agrupar commits por fecha para análisis
  groupCommitsByDate(commits) {
    return commits.reduce((acc, commit) => {
      const date = commit.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(commit);
      return acc;
    }, {});
  }

  // Generar commits para un rango de fechas (útil para gráficos de contribución)
  async generateCommitsForDateRange(startDate, endDate, commitsPerDay = 1) {
    const start = moment(startDate);
    const end = moment(endDate);
    const commits = [];

    console.log(`Generando commits desde ${start.format('YYYY-MM-DD')} hasta ${end.format('YYYY-MM-DD')}`);

    while (start.isSameOrBefore(end)) {
      for (let i = 0; i < commitsPerDay; i++) {
        const commitDate = start.clone().add(Math.random() * 24, 'hours').format();
        const message = `Commit automatizado para ${start.format('YYYY-MM-DD')} (${i + 1}/${commitsPerDay})`;
        
        try {
          const commit = await this.makeCommit(message, commitDate);
          commits.push(commit);
          console.log(`✓ Commit creado para ${start.format('YYYY-MM-DD')}`);
        } catch (error) {
          console.error(`✗ Falló crear commit para ${start.format('YYYY-MM-DD')}:`, error);
        }
      }
      start.add(1, 'day');
    }

    return commits;
  }

  // Mostrar historial de commits
  displayCommitHistory(limit = 10) {
    const data = this.loadCommitData();
    const recentCommits = data.commits.slice(-limit).reverse();
    
    console.log(`\n=== Commits Recientes (${recentCommits.length}/${data.totalCommits}) ===`);
    recentCommits.forEach(commit => {
      console.log(`${commit.date} ${commit.time} - ${commit.message}`);
    });
    console.log('=====================================\n');
  }

  // Función compatible con el código existente de goGreen
  async markCommit(x, y) {
    const date = moment()
      .subtract(1, "y")
      .add(1, "d")
      .add(x, "w")
      .add(y, "d")
      .format();

    const message = `goGreen commit para semana ${x}, día ${y}`;
    return await this.makeCommit(message, date);
  }

  // Función compatible para hacer múltiples commits como en goGreen
  async makeCommits(n) {
    if (n === 0) {
      return await this.pushCommits();
    }

    const x = Math.floor(Math.random() * 54); // 0-53 semanas
    const y = Math.floor(Math.random() * 7);  // 0-6 días
    
    try {
      await this.markCommit(x, y);
      console.log(`Commits restantes: ${n - 1}`);
      
      // Recursivamente hacer el siguiente commit
      return await this.makeCommits(n - 1);
    } catch (error) {
      console.error('Error en makeCommits:', error);
      throw error;
    }
  }
}

export default CommitManager;

// Ejemplo de uso si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const manager = new CommitManager('./commitData.json');
  
  // Mostrar estadísticas actuales
  console.log('Estadísticas de Commits:', manager.getCommitStats());
  
  // Mostrar commits recientes
  manager.displayCommitHistory();
}