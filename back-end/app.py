from flask import Flask, jsonify, request, abort
import json

app = Flask(__name__)

# TODO put it to another file and make other classes
class Address:
    def __init__(self, street, house_number, postcode, city, country):
        self.street = street
        self.house_number = house_number
        self.postcode = postcode
        self.city = city
        self.country = country

# Testing data for MVP:
places = [
    {'id': 1, 'name': 'KFS', 'address':
        Address("Greenstraat", "2", "9321CV", "Groningen", "Netherlands").__dict__,
     'total_seats': 20, 'free_seats': 10},
    {'id': 2, 'name': 'Burgers Queen',
     'address': Address("Bluestraat", "23a", "9371CV", "Amsterdam", "Netherlands").__dict__,
     'total_seats': 120, 'free_seats': 75},
    {'id': 3, 'name': 'MacersDruft',
     'address': Address("Whitestraat", "1", "9342CV", "Amsterdam", "Netherlands").__dict__,
     'total_seats': 20, 'free_seats': 2},
    ]

@app.route('/places')
def get_all_places():
    # TODO database
    return jsonify(places)

@app.route('/places/<place_id>', methods=['PATCH'])
def updates_seats(place_id):
    # args = json.loads(request.data)
    data = json.loads(request.json)
    try:
        new_seats = int(data['free_seats'])
    except KeyError:
        abort(400)
    # TODO database
    for p in places:
        if p['id'] == int(place_id):
            if new_seats > p['total_seats']:
                abort(400)
            p['free_seats'] = new_seats
            return jsonify(p)
    return None

if __name__ == '__main__':
    app.run()
