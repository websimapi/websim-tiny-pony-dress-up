const items = [
    { id: 'wings', name: 'Wings', src: 'wings.png', type: 'wings' },
    { id: 'horn', name: 'Horn', src: 'horn.png', type: 'horn' },
    { id: 'hat', name: 'Wizard Hat', src: 'hat.png', type: 'hat' },
    { id: 'scarf', name: 'Scarf', src: 'scarf.png', type: 'scarf' },
    { id: 'socks', name: 'Socks', src: 'socks.png', type: 'socks' },
];

const ponyStage = document.getElementById('pony-stage');
const inventoryItemsContainer = document.getElementById('inventory-items');

// State to track what the pony is wearing
const ponyWardrobe = {};

function toggleItem(item) {
    const isEquipped = !!ponyWardrobe[item.type];

    // If an item of the same type is on, remove it
    if (isEquipped) {
        ponyWardrobe[item.type].element.remove();
        ponyWardrobe[item.type].inventoryButton.classList.remove('equipped');
        // If it's the same item, we just remove it.
        if (ponyWardrobe[item.type].id === item.id) {
            delete ponyWardrobe[item.type];
            return;
        }
    }

    // Add the new item
    const itemElement = document.createElement('img');
    itemElement.src = item.src;
    itemElement.alt = item.name;
    itemElement.classList.add('item-on-pony');
    itemElement.id = `pony-${item.id}`; // e.g., pony-wings
    ponyStage.appendChild(itemElement);

    const inventoryButton = document.querySelector(`[data-id='${item.id}']`);
    inventoryButton.classList.add('equipped');

    ponyWardrobe[item.type] = {
        id: item.id,
        element: itemElement,
        inventoryButton: inventoryButton
    };
}


function createInventory() {
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('inventory-item');
        itemDiv.dataset.id = item.id;
        itemDiv.title = `Equip ${item.name}`;

        const itemImg = document.createElement('img');
        itemImg.src = item.src;
        itemImg.alt = item.name;
        
        itemDiv.appendChild(itemImg);
        
        itemDiv.addEventListener('click', () => toggleItem(item));
        inventoryItemsContainer.appendChild(itemDiv);
    });
}

// Initialize the game
createInventory();

