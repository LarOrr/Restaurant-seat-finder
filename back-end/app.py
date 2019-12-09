from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import config

app = Flask(__name__)
# Enable CORS
CORS(app)
# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app)

from places_database import Place, Address


@app.route('/places/<place_id>', methods=['GET'])
def get_place(place_id):
    """
    :return: all places (restaurants) in the database in json
    """
    place = Place.query.get(place_id)
    return jsonify(place.to_dict())


def update_place(place: Place, data: dict):
    """
    Updates place with information given in json
    :param place: Plcae object
    :param data: json with data
    :return: Place id
    """
    address = place.address
    # TODO make more efficient
    try:
        for attr in Place.place_attrs:
            # Setting all attributes
            try:
                setattr(place, attr, data[attr])
            except KeyError:
                pass
                # setattr(new_place, attr, None)
        for attr in Address.address_attrs:
            # Setting all attributes
            try:
                setattr(address, attr, data['address'][attr])
            except KeyError:
                pass
                # setattr(address, attr, None)
    except KeyError or TypeError:
        abort(400)
    db.session.add(place)
    db.session.commit()
    db.session.refresh(place)
    return place.id


@app.route('/places', methods=['POST'])
def create_new_place():
    """
    Creates new place in places with info given in JSON
    :return: ID of the new place
    """
    data = request.json
    new_place = Place()
    new_place.address = Address()
    update_place(new_place, data)
    return get_place(new_place.id)


@app.route('/places')
def get_all_places():
    """
    :return: all places (restaurants) in the database in json
    """
    places = list(map(lambda place: place.to_dict(), Place.query.all()))
    return jsonify(places)


@app.route('/places/<place_id>', methods=['PATCH'])
def patch_place(place_id):
    """
    Changes number of free seats of place with that id
    :param place_id: id of the place
    """
    place = Place.query.get(place_id)
    data = request.json
    # TODO separate for just free seats and make it more efficient
    update_place(place, data)
    return get_place(place_id)


if __name__ == '__main__':
    app.run(config.address, port=config.port, debug=config.debug)
