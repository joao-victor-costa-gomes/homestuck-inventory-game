class FilaInventory {
    constructor() {
        this.items = [];
    }

    // ADICIONA ITEM NA PILHA
    insert(itemElement, itemName) {
        this.items.push({ html: itemElement, name: itemName });
        this.render();
    }

    // REMOVE ITEM DA FILA
    remove() {
        if (this.items.length === 0) {
            alert("A Fila está vazia!");
            return null;
        }
        // FIFO: O primeiro elemento a entrar é o primeiro a sair
        const removedItem = this.items.shift();
        this.render();
        return removedItem;
    }

    // LIMPA INVETÁRIO
    clear() {
        if (this.items.length === 0) {
            alert("O inventário já está vazio!");
            return [];
        }
        
        const removedItems = [...this.items];
        this.items = [];
        this.render();
        
        return removedItems;
    }

    // RENDERIZA FILA
    render() {
        const container = document.getElementById('inventory-container');
        container.innerHTML = '';
        
        for (let i = 0; i < this.items.length; i++) {
            // Adiciona o item
            container.appendChild(this.items[i].html);
            
            // Se não for o último item da fila, adiciona a setinha "-->"
            if (i < this.items.length - 1) {
                const arrow = document.createElement('span');
                arrow.className = 'queue-arrow';
                arrow.innerText = ' <-- ';
                container.appendChild(arrow);
            }
        }
    }
}