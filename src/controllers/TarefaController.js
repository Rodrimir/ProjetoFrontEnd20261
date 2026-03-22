export class TarefaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.inicializar();
    }

    inicializar() {
        const listaTarefas = this.model.getTodasAsTarefas();
        const totalTarefas = this.model.getTotalTarefas();

        this.view.render(listaTarefas, totalTarefas);
    }
}