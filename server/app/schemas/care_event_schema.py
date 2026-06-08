from marshmallow import Schema, fields


class CareEventSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    category = fields.Str()
    scheduled_for = fields.DateTime()
    completed_at = fields.DateTime()
    status = fields.Str()
    notes = fields.Str()
    pet_id = fields.Int()
    care_routine_id = fields.Int(allow_none=True)
    medication_id = fields.Int(allow_none=True)