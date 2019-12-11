from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import config

app = Flask(__name__)
# Enable CORS
CORS(app)
# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

from places_database import Place, Address

# TODO delete

@app.route('/places/<place_id>', methods=['GET'])
def get_place(place_id):
    """
    :return: all places (restaurants) in the database in json
    """
    place = Place.query.get(place_id)
    return jsonify(place.to_dict())


@app.route('/places', methods=['POST'])
def create_new_place():
    """
    Creates new place in places with info given in JSON
    :return: ID of the new place
    """
    data = request.json
    new_place = Place()
    new_place.address = Address()
    new_place.update_info(data)
    return get_place(new_place.id)


@app.route('/places')
def get_all_places():
    """
    :return: all places (restaurants) in the database in json
    """
    places = list(map(lambda place: place.to_dict(), Place.query.all()))
    return jsonify(places)


@app.route('/places/<place_id>', methods=['PATCH'])
def patch_place(place_id: int):
    """
    Changes number of free seats of place with that id
    :param place_id: id of the place
    """
    place = Place.query.get(place_id)
    data = request.json
    # TODO separate for just free seats and make it more efficient
    place.update_info(data)
    return get_place(place_id)


if __name__ == '__main__':
    app.run(config.address, port=config.port, debug=config.debug)
