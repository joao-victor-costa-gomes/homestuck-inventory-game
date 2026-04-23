class Node {
    constructor(html, name, weight) {
        this.html = html;
        this.name = name;
        this.weight = parseInt(weight);
        this.left = null;
        this.right = null;
    }
}

class ArvoreInventory {
    constructor() {
        this.root = null;
    }

    insert(itemElement, itemName) {
        const weight = parseInt(itemElement.dataset.weight);
        const newNode = new Node(itemElement, itemName, weight);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
        this.render();
    }

    insertNode(node, newNode) {
        if (newNode.weight < node.weight) {
            if (node.left === null) node.left = newNode;
            else this.insertNode(node.left, newNode);
        } else {
            if (node.right === null) node.right = newNode;
            else this.insertNode(node.right, newNode);
        }
    }

    // Busca o nó pelo nome para descobrir qual peso precisa deletar
    findNodeByName(node, name) {
        if (node === null) return null;
        if (node.name.toLowerCase() === name.toLowerCase()) return node;
        
        let leftSearch = this.findNodeByName(node.left, name);
        if (leftSearch) return leftSearch;
        return this.findNodeByName(node.right, name);
    }

    remove() {
        if (this.root === null) {
            alert("A Árvore está vazia!");
            return null;
        }

        const nameToRemove = prompt("Digite o NOME do item que deseja remover:");
        if (!nameToRemove) return null;

        const targetNode = this.findNodeByName(this.root, nameToRemove.trim());
        if (!targetNode) {
            alert("Item não encontrado na árvore!");
            return null;
        }

        const removedElement = { name: targetNode.name, html: targetNode.html };
        
        // Aciona a reorganização da árvore baseada no peso do item
        this.root = this.removeNode(this.root, targetNode.weight);
        this.render();
        
        return removedElement;
    }

    removeNode(node, weight) {
        if (node === null) return null;

        if (weight < node.weight) {
            node.left = this.removeNode(node.left, weight);
            return node;
        } else if (weight > node.weight) {
            node.right = this.removeNode(node.right, weight);
            return node;
        } else {
            
            // Caso 1: Folha (Sem filhos)
            if (node.left === null && node.right === null) return null;
            
            // Caso 2: Apenas um filho
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;
            
            // Caso 3: Dois filhos (Busca o menor valor da subárvore direita)
            let tempNode = this.findMinNode(node.right);
            node.weight = tempNode.weight;
            node.name = tempNode.name;
            node.html = tempNode.html;
            node.right = this.removeNode(node.right, tempNode.weight);
            return node;
        }
    }

    findMinNode(node) {
        if (node.left === null) return node;
        return this.findMinNode(node.left);
    }

    clear() {
        const items = [];
        this.collectAll(this.root, items);
        this.root = null;
        this.render();
        return items; 
    }

    collectAll(node, arr) {
        if (node !== null) {
            this.collectAll(node.left, arr);
            arr.push({ name: node.name, html: node.html });
            this.collectAll(node.right, arr);
        }
    }

    render() {
        const container = document.getElementById('inventory-container');
        container.innerHTML = '';
        if (this.root !== null) {
            const treeDOM = this.buildTreeDOM(this.root);
            container.appendChild(treeDOM);
        }
    }

    // FUNÇÃO PARA DESENHAR A ÁRVORE
    buildTreeDOM(node) {
        if (node === null) return null;

        const wrapper = document.createElement('div');
        wrapper.className = 'tree-node-wrapper';

        const nodeContent = document.createElement('div');
        nodeContent.className = 'tree-node-content';
        
        const badge = document.createElement('span');
        badge.className = 'tree-weight-badge';
        badge.innerText = `Peso: ${node.weight}`;
        
        nodeContent.appendChild(node.html);
        nodeContent.appendChild(badge);

        if (node.left !== null || node.right !== null) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'tree-children';

            const leftChild = this.buildTreeDOM(node.left);
            const rightChild = this.buildTreeDOM(node.right);

            const leftWrapper = document.createElement('div');
            leftWrapper.className = 'tree-branch left-branch';
            if (leftChild) leftWrapper.appendChild(leftChild);
            
            const rightWrapper = document.createElement('div');
            rightWrapper.className = 'tree-branch right-branch';
            if (rightChild) rightWrapper.appendChild(rightChild);

            childrenContainer.appendChild(leftWrapper);
            childrenContainer.appendChild(rightWrapper);
            
            wrapper.appendChild(childrenContainer); 
        }

        wrapper.appendChild(nodeContent);

        return wrapper;
    }
}