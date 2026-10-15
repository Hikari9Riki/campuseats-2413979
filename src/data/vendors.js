const vendors = [
{
id: 'taka-yo',
name: 'TakaYoooo',
location: 'Mahallah Uthman, Ground Floor',
openHours: '12:00 pm - 10:00 pm',
isOpen: true,
menu: [
{ id: 'ta-1', name: 'Karagee Hokage', description: 'Crispy fried chicken with special sauce', price: 12, category: 'Chicken',
available: true },
{ id: 'ta-2', name: 'TakaTakamen', description: 'Delicious noodles with special sauce', price: 10, category: 'Noodles', available: true },
{ id: 'ta-3', name: 'TakaDrink', description: 'Refreshing drink', price: 2.5, category: 'Drinks', available: true },
],
},
{
id: 'kafe-aminah',
name: 'Kafe Mahallah Aminah',
location: 'Mahallah Aminah, Ground Floor',
openHours: '8:00 am - 9:00 pm',
isOpen: true,
menu: [
{ id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
{ id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price: 3, category: 'Drinks', available: true },
],
},
{
id: 'Himar',
name: 'Himar Jannah',
location: 'Mahallah Bilal, Underground Floor',
openHours: '5:00 am - 8:00 pm',
isOpen: true,
menu: [
{ id: 'hi-1', name: 'Himar wa padi', description: 'Crispy donkey with rice', price: 21, category: 'Rice',
available: true },
{ id: 'hi-2', name: 'Himar wa padi', description: 'Crispy donkey', price: 6, category:
'Meat', available: true },
{ id: 'hi-3', name: 'Himar Halib', description: 'Creamy donkey\'s milk', price: 2.5, category:
'Drinks', available: false },
],
},
{
id: 'chinese-muslim-restaurant',
name: 'Chinese Muslim Restaurant',
location: 'Mahallah Siddiq, First Floor',
openHours: '10:00 am - 6:00 pm',
isOpen: true,
menu: [
{ id: 'ch-1', name: 'Ba ku teh Halal', description: 'A halal version of Ba ku teh', price: 12, category: 'Rice',
available: true },
{ id: 'ch-2', name: 'Chicken Dumpling', description: 'Delicious 8 pcs chicken dumplings ', price: 8, category:
'Dumplings', available: true },
{ id: 'ch-3', name: 'Chinese tea', description: 'A herbal tea origin from China', price: 3, category:
'Drinks', available: false },
],
},
]
export default vendors