export class TarefaModel {
    constructor() {
        this.tarefas = [
            { id: 1, titulo: "tarefa 1" },
            { id: 2, titulo: "tarefa 2" },
            { id: 3, titulo: "tarefa 3" },
            { id: 4, titulo: "tarefa 4" }
        ];
    }

    getTodasAsTarefas() {
        return this.tarefas;
    }

    getTotalTarefas() {
        return this.tarefas.length;
    }
}