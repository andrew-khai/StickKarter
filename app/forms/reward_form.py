from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange

class RewardForm(FlaskForm):
  project_id = IntegerField("project id", validators=[DataRequired()])
  title = StringField("title", validators=[DataRequired()])
  description = StringField("description", validators=[DataRequired(), Length(min=1, max=255)])
  price = IntegerField("price", validators=[DataRequired(), NumberRange(min=5)])
