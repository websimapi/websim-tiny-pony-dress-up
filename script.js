const items = [
    { id: 'wings', name: 'Fairy Wings', src: 'wings.png', type: 'wings' },
    { id: 'horn', name: 'Unicorn Horn', src: 'horn.png', type: 'horn' },
    { id: 'hat', name: 'Wizard Hat', src: 'hat.png', type: 'hat' },
    { id: 'amulet', name: 'Magic Amulet', src: 'amulet.png', type: 'scarf' },
    { id: 'boots', name: 'Star Boots', src: 'boots.png', type: 'socks' },
];

const ponyStage = document.getElementById('pony-stage');
const inventoryItemsContainer = document.getElementById('inventory-items');
const removeAllBtn = document.getElementById('remove-all-btn');
const emptyMessage = document.getElementById('empty-inventory-message');

// State to track what the pony is wearing
let ponyWardrobe = {};

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

function removeAllItems() {
    for (const type in ponyWardrobe) {
        if (Object.hasOwnProperty.call(ponyWardrobe, type)) {
            ponyWardrobe[type].element.remove();
            ponyWardrobe[type].inventoryButton.classList.remove('equipped');
        }
    }
    ponyWardrobe = {};
}

function createInventory() {
    if (items.length > 0 && emptyMessage) {
        emptyMessage.style.display = 'none';
    } else if (emptyMessage) {
        emptyMessage.style.display = 'block';
    }

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

    if (removeAllBtn) {
        removeAllBtn.addEventListener('click', removeAllItems);
    }
}

// Initialize the game
createInventory();