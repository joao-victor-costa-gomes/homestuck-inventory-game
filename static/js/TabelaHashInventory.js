class TabelaHashInventory {
    constructor() {
        this.items = {}; 
    }

    insert(itemElement, itemName, key) {
        let replacedItemName = null;

        if (this.items[key]) {
            replacedItemName = this.items[key].name;
        }

        this.items[key] = { html: itemElement, name: itemName };
        this.render();

        return replacedItemName; 
    }

    remove() {
        const key = prompt("Digite a chave (número) do item que deseja remover:");
        if (this.items[key]) {
            const removed = this.items[key];
            delete this.items[key];
            this.render();
            return removed;
        }
        alert("Chave não encontrada!");
        return null;
    }

    clear() {
        const removed = Object.values(this.items);
        this.items = {};
        this.render();
        return removed;
    }

    render() {
        const container = document.getElementById('inventory-container');
        container.innerHTML = '';
        
        for (let key in this.items) {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.alignItems = 'center';
        
            const badge = document.createElement('span');
            badge.className = 'hash-key-badge';
            badge.innerText = `Key: ${key}`;
            
            wrapper.appendChild(this.items[key].html);
            wrapper.appendChild(badge);
            container.appendChild(wrapper);
        }
    }
}