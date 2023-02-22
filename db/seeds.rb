# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# name image_url attack speed defense
# pet_archs = PetArchetype.create([
#     {name: "Turtle", image_url: "https://i.imgur.com/nrroLdf.png", attack: 0.2, speed: 0.2, defense: 0.6},
#     {name: "Spider", image_url: "https://i.imgur.com/nW6DHIG.png", attack: 0.6, speed: 0.2, defense: 0.2},
#     {name: "Hummingbird", image_url: "https://i.imgur.com/YJkY0yW.png", attack: 0.2, speed: 0.6, defense: 0.2},
#     {name: "Panther", image_url: "https://i.imgur.com/wRGubIy.png", attack: 0.4, speed: 0.4, defense: 0.2},
#     {name: "Gorilla", image_url: "https://i.imgur.com/X9MjNip.png", attack: 0.4, speed: 0.2, defense: 0.4},
#     {name: "Armadillo", image_url: "https://i.imgur.com/GiVL61K.png", attack: 0.2, speed: 0.4, defense: 0.4}
# ])

# enemy_archs = EnemyArchetype.create([
#     {name: "Balanced", image_url: "https://i.imgur.com/g83RlWm.png", hp_modifier: 0.25, attack_modifer: 0.25, speed_modifier: 0.25, defense_modifier: 0.25},
#     {name: "Ranged", image_url: "https://i.imgur.com/duyXXyx.png", hp_modifier: 0.10, attack_modifer: 0.55, speed_modifier: 0.25, defense_modifier: 0.10},
#     {name: "Critter", image_url: "https://i.imgur.com/wxSdjEU.png", hp_modifier: 0.05, attack_modifer: 0.25, speed_modifier: 0.65, defense_modifier: 0.05},
#     {name: "Mage", image_url: "https://i.imgur.com/ki1ys3g.png", hp_modifier: 0.20, attack_modifer: 0.60, speed_modifier: 0.10, defense_modifier: 0.10},
#     {name: "Healer", image_url: "https://i.imgur.com/2qrIrIJ.png", hp_modifier: 0.20, attack_modifer: 0.50, speed_modifier: 0.10, defense_modifier: 0.20},
#     {name: "Tank", image_url: "https://i.imgur.com/MsiU7FP.png", hp_modifier: 0.40, attack_modifer: 0.05, speed_modifier: 0.05, defense_modifier: 0.50}
# ])

EnemyArchetype.find_by_name("Balanced").update(description: "Balanced enemies have evenly distributed stats and don't specialize in any one area.")
EnemyArchetype.find_by_name("Ranged").update(description: "Ranged fighters are skilled in dealing high physical damage, but are not great at taking hits.")
EnemyArchetype.find_by_name("Critter").update(description: "Critters are extremely quick and easy to take down, but will deal a lot of damage if forgotten about.")
EnemyArchetype.find_by_name("Mage").update(description: "A mage uses offensive spells to keep attackers at bay, but struggles with defense.")
EnemyArchetype.find_by_name("Healer").update(description: "The healers will continue to restore health and buff defense of its fellow enemies.")
EnemyArchetype.find_by_name("Tank").update(description: "Tanks are built for defense and absorbing damage in exchange for speed and attack power.")

PetArchetype.find_by_name("Turtle").update(description: "Turtles excel in defense but are slow while not being particularly useful damage dealers.")
PetArchetype.find_by_name("Spider").update(description: "Spiders may be small and defenseless, but their attacks really pack a venomous punch.")
PetArchetype.find_by_name("Hummingbird").update(description: "If you're looking for a speed boost hummingbirds are your best bet.")
PetArchetype.find_by_name("Panther").update(description: "Panthers offer a decent combination of attack and speed.")
PetArchetype.find_by_name("Gorilla").update(description: "These apes are strong as they are tough but are not known for their quickness.")
PetArchetype.find_by_name("Armadillo").update(description: "Utilize an armadillo's spikey shield and speed to really frustrate your enemy's attempts to hit you.")