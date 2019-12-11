# ! Problems with import
from app import db
from places_database import Address, Place

if db.exists:
    db.drop_all()
db.create_all()
# Testing data
places = [
    {'name': 'KFS', 'type': 'fast food', 'address':
        {'street': 'Greenstraat', 'house_number': '2', 'postcode': '9321CV', 'city': 'Groningen', 'country': 'Netherlands'},
     'total_seats': 20, 'free_seats': 10},
    {'name': 'Burgers Queen', 'type': 'restaurant', 'address':
        {'street': 'Redstraat', 'house_number': '3a', 'postcode': '9821CV', 'city': 'Amsterdam', 'country': 'Netherlands'},
     'total_seats': 120, 'free_seats': 75},
    {'name': 'MacersDruft', 'type': 'bar', 'address':
    {'street': 'Whitestraat', 'house_number': '12', 'postcode': '9342CV', 'city': 'Amsterdam', 'country': 'Netherlands'},
     'total_seats': 20, 'free_seats': 2}
    ]

for place in places:
    new_place = Place()
    new_place.address = Address()
    new_place.update_info(place)