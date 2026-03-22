import { TarefaModel } from './models/TarefaModel.js';
import { TarefaView } from './views/HomePage.js';
import { TarefaController } from './controllers/TarefaController.js';

new TarefaController(new TarefaModel(), new TarefaView());