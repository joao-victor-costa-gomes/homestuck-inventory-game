document.addEventListener('DOMContentLoaded', () => {
    
    const inventoryContainer = document.getElementById('inventory-container');
    if (!inventoryContainer) return;

    const inventoryType = inventoryContainer.dataset.type;
    let inventorySystem = null;

    if (inventoryType === 'Pilha' && typeof PilhaInventory !== 'undefined') {
        inventorySystem = new PilhaInventory();
    } 

    // Evento: Adicionar item ao inventário
    document.querySelectorAll('#items-grid .item-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            if (!inventorySystem) {
                alert("Sistema de inventário ainda não implementado para: " + inventoryType);
                return;
            }

            this.style.display = 'none';

            let invItem = this.cloneNode(true);
            invItem.style.display = 'flex';
            
            inventorySystem.insert(invItem, this.dataset.name);
        });
    });

    // Evento: Remover item do inventário
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

    // Evento: Trocar de Personagem
    const btnSwitch = document.getElementById('btn-switch');
    if (btnSwitch) {
        btnSwitch.addEventListener('click', function() {
            window.location.href = '/';
        });
    }
    
    // Evento: Botão "Limpar Inventário"
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
});