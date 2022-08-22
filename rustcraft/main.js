
'use strict';
/*global require, __plugin, exports, events, setTimeout */
/*************************************************************************/
 
const BUKKIT = org.bukkit;
const JAVA = java.util;
const UUID = JAVA.UUID;

exports.Rustcraft = 
{
    
    init : function ()
    {
        alert('RustCraft Mod Loaded.');
    },

    createAmmoItem : function ()
    {
        // Create the item stack
        let ammoItemStack = new BUKKIT.inventory.ItemStack(BUKKIT.Material.ARROW);

        // Get the item data
        let metadata = ammoItemStack.getItemMeta();

        // Set the custom model data defined in the resource pack
        metadata.setCustomModelData(1);

        // Set the display name (in 'cyan')
        metadata.setDisplayName(BUKKIT.ChatColor.translateAlternateColorCodes('&', "&a&l556 Ammo"));
        // Create a lore array
        let lore = [];
        
        // Insert 1 lore entry into the array (can take several, each is it's own line)
        lore.push("Ammo for a high-powered rifle.");

        // Set the lore to the metadata
        metadata.setLore(lore);

        // Set the metadata to the item
        ammoItemStack.setItemMeta(metadata);

        return ammoItemStack;
    },

    createSniperItem : function ()
    {
         // Create the item stack
         let sniperItemStack = new BUKKIT.inventory.ItemStack(BUKKIT.Material.BOW);

         // Get the item data
         let metadata = sniperItemStack.getItemMeta();
 
         // Set the custom model data defined in the resource pack
         metadata.setCustomModelData(1);
 
         // Set the display name (in 'cyan')
         metadata.setDisplayName("Sniper");
 
         // Get a UUID for the new modifier
         let uuid = UUID.randomUUID();
 
         // Instantiate the modifier
         let modifier = new BUKKIT.attribute.AttributeModifier
         (
             // UUID
             uuid, 
 
             // Name
             'GENERIC_ATTACK_DAMAGE', 
 
             // Modifier Integer
             50, 
 
             // Modifier Opeartion
             BUKKIT.attribute.AttributeModifier.Operation.ADD_NUMBER, 
 
             // Inventory Slot
             BUKKIT.inventory.EquipmentSlot.HAND
         );
 
         // Apply the modifier that only affects the mainhand to the 'GENERIC_ATTACK_SPEED' property 
         metadata.addAttributeModifier(BUKKIT.attribute.Attribute.GENERIC_ATTACK_DAMAGE, modifier);
 
         // Create a lore array
         let lore = [];
 
         // Insert 1 lore entry into the array (can take several, each is it's own line)
         lore.push("A long-range, high-powered rifle.");
 
         // Set the lore to the metadata
         metadata.setLore(lore);
 
         // Set the metadata to the item
         sniperItemStack.setItemMeta(metadata);

         return sniperItemStack;
    },

    giveSniperItem : function (player)
    {
        // Create a sniper item
        let sniperItem = this.createSniperItem();
        echo('Gave player sniper')

        // Put the item into the player's (the function argument, passed as 'self' (no quotes) ingame)
        player.getInventory().addItem(sniperItem);
    },

    giveAmmoItem : function (player)
    {
        // Create a sniper item
        let ammoItem = this.createAmmoItem();
        echo('Gave player ammo')

        // Put the item into the player's (the function argument, passed as 'self' (no quotes) ingame)
        player.getInventory().addItem(ammoItem);
    }
};

events.projectileLaunch(function (event)
{
    let entity = event.getEntity();
    let ARROW = BUKKIT.entity.Arrow;
    if(entity instanceof ARROW)
    {        
        // Make arrows shoot 5x
        entity.setVelocity(entity.getVelocity().multiply(5.0));
    }
})
