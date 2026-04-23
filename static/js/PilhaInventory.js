class PilhaInventory {
    constructor() {
        this.items = [];
    }

    // ADICIONA ITEM NA PILHA
    insert(itemElement, itemName) {
        this.items.push({ html: itemElement, name: itemName });
        this.render();
    }

    // REMOVE ITEM NA PILHA
    remove() {
        if (this.items.length === 0) {
            alert("A Pilha está vazia!");
            return null;
        }
        const removedItem = this.items.pop();
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

    // RENDERIZA PILHA
    render() {
        const container = document.getElementById('inventory-container');
        container.innerHTML = '';
        
        for (let i = this.items.length - 1; i >= 0; i--) {
            container.appendChild(this.items[i].html);
        }
    }

}