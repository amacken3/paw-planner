from marshmallow import Schema, fields


class PetSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    species = fields.Str()
    breed = fields.Str()
    age = fields.Int()
    weight = fields.Float()
    notes = fields.Str()
    user_id = fields.Int()