from app import db


class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.String(100))
    house_number = db.Column(db.String(20))
    postcode = db.Column(db.String(10))  # the longest postcode is 10 chars
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))
    address_attrs = ['street', 'house_number', 'postcode', 'city', 'country']

    def to_dict(self) -> dict:
        """
         :return: Dict that contain only attributes with needed information
        """
        res = {'id': self.id}
        for attr in self.address_attrs:
            res[attr] = getattr(self, attr)
        # res = self.__dict__

        return res


class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    description = db.Column(db.String(255))
    # TODO cuisine = db.Column(db.String(255))
    kind = db.Column(db.String(50), default='other')  # Can be: restaurant, cafe, bar, fast food, fast casual, other
    total_seats = db.Column(db.Integer)
    free_seats = db.Column(db.Integer)
    # One to one relationship with address
    address_id = db.Column(db.Integer, db.ForeignKey(Address.id))
    address = db.relationship(Address, backref='place', uselist=False)
    # Attributes of Place
    place_attrs = ['name', 'description', 'kind', 'total_seats', 'free_seats']
        # self.__table__.columns.keys()

    def to_dict(self) -> dict:
        """
        :return: Dict that contain only attributes with needed information
        """
        # + id and address
        res = {'id': self.id, 'address': self.address.to_dict()}
        for attr in self.place_attrs:
            res[attr] = getattr(self, attr)
        return res

