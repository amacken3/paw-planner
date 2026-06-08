from marshmallow import Schema, fields


class MedicationSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    dosage = fields.Float()
    unit = fields.Str()
    instructions = fields.Str()
    frequency = fields.Str()
    start_date = fields.Date()
    end_date = fields.Date()
    notes = fields.Str()
    pet_id = fields.Int()