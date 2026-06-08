from marshmallow import Schema, fields

class CareRoutineSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    category = fields.Str()
    frequency = fields.Str()
    time_of_day = fields.Time()
    notes = fields.Str()
    pet_id = fields.Int()