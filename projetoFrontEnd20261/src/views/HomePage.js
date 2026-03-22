export class TarefaView {
    constructor() {
        this.app = document.getElementById('root');
    }

    render(tarefas, total) {
        this.app.innerHTML = `
            <style>
                body { 
                    font-family: sans-serif; 
                    background-color: #f4f4f4; 
                    color: #333;
                    padding: 20px; 
                }
                .painel { 
                    width: 300px;
                    height: auto;
                    border: 2px solid #000; 
                    background-color: #fff; 
                    padding: 15px; 
                    margin-bottom: 20px; 
                }
                table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin-top: 15px; 
                }
                th, td { 
                    border: 1px solid #000; 
                    padding: 8px; 
                    text-align: left; 
                }
                th { 
                    background-color: #ddd; 
                }
            </style>

            <h1>TEMPO-CLARO</h1>
            <h2>Painel Geral de Tarefas</h2>
            
            <div class="painel">
                <div class="destaque">
                    <p><strong>Total de Tarefas:</strong> ${total}</p>
                </div>
            </div>

            <div class="painel">
                <h3>Tarefas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Título da Tarefa</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tarefas.map(tarefa => `
                            <tr>
                                <td>${tarefa.titulo}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}