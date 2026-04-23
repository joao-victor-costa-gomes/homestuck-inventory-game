document.addEventListener('DOMContentLoaded', () => {
    
    const inventoryContainer = document.getElementById('inventory-container');
    if (!inventoryContainer) return;

    const inventoryType = inventoryContainer.dataset.type;
    let inventorySystem = null;

    if (inventoryType === 'Pilha' && typeof PilhaInventory !== 'undefined') {
        inventorySystem = new PilhaInventory();
    } 
    else if (inventoryType === 'Fila' && typeof FilaInventory !== 'undefined') {
        inventorySystem = new FilaInventory();
    }
    else if (inventoryType === 'Tabela Hash' && typeof TabelaHashInventory !== 'undefined') {
        inventorySystem = new TabelaHashInventory();
    }
    else if (inventoryType === 'Árvore' && typeof ArvoreInventory !== 'undefined') {
        inventorySystem = new ArvoreInventory();
    }

    let selectedSlot = null; // Guarda o item clicado enquanto o modal está aberto

    // ==========================================
    // EVENTO: CLICAR NO ITEM DA DIREITA (UNIFICADO)
    // ==========================================
    document.querySelectorAll('#items-grid .item-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            if (!inventorySystem) {
                alert("Sistema de inventário ainda não implementado para: " + inventoryType);
                return;
            }

            if (inventoryType === 'Tabela Hash') {
                // Abre o modal para o Dave
                selectedSlot = this;
                document.getElementById('hash-modal').style.display = 'flex';
                document.getElementById('hash-key-input').value = '';
                document.getElementById('hash-key-input').focus();
            } else {
                // Lógica normal para o John (Pilha) e Jade (Fila)
                this.style.display = 'none';
                let invItem = this.cloneNode(true);
                invItem.style.display = 'flex';
                inventorySystem.insert(invItem, this.dataset.name);
            }
        });
    });

    // ==========================================
    // CONTROLES DO INVENTÁRIO (BOTÕES DA ESQUERDA)
    // ==========================================
    const btnRemove = document.getElementById('btn-remove');
    if (btnRemove) {
        btnRemove.addEventListener('click', function() {
            if (inventorySystem) {
                const removed = inventorySystem.remove();
                
                if (removed) {
                    const originalSlot = document.querySelector(`#items-grid .item-slot[data-name="${removed.name}"]`);
                    if (originalSlot) {
                        originalSlot.style.display = 'flex';
                    }
                }
            }
        });
    }

    const btnClear = document.getElementById('btn-clear');
    if (btnClear) {
        btnClear.addEventListener('click', function() {
            if (inventorySystem) {
                const removedItems = inventorySystem.clear();

                if (removedItems && removedItems.length > 0) {
                    removedItems.forEach(item => {
                        const originalSlot = document.querySelector(`#items-grid .item-slot[data-name="${item.name}"]`);
                        if (originalSlot) {
                            originalSlot.style.display = 'flex';
                        }
                    });
                }
            }
        });
    }

    const btnSwitch = document.getElementById('btn-switch');
    if (btnSwitch) {
        btnSwitch.addEventListener('click', function() {
            window.location.href = '/';
        });
    }
    
    const btnHashAdd = document.getElementById('btn-hash-add');
    if (btnHashAdd) {
        btnHashAdd.addEventListener('click', () => {
            const key = document.getElementById('hash-key-input').value;
            if (!key) return alert("Insira um número!");

            const itemName = selectedSlot.dataset.name;
            let invItem = selectedSlot.cloneNode(true);
            invItem.style.display = 'flex';

            // O insert da Tabela Hash pode retornar um item substituído
            const replacedName = inventorySystem.insert(invItem, itemName, key);
            
            // Se houve substituição, mostramos o item antigo na direita novamente
            if (replacedName) {
                const oldSlot = document.querySelector(`#items-grid .item-slot[data-name="${replacedName}"]`);
                if (oldSlot) oldSlot.style.display = 'flex';
            }

            selectedSlot.style.display = 'none';
            document.getElementById('hash-modal').style.display = 'none';
        });
    }

    const btnHashCancel = document.getElementById('btn-hash-cancel');
    if (btnHashCancel) {
        btnHashCancel.addEventListener('click', () => {
            document.getElementById('hash-modal').style.display = 'none';
        });
    }
});