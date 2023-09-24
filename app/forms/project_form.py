from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, DateField, FloatField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from datetime import date
from ..api.aws_helper import ALLOWED_EXTENSIONS

def validate_start_date(form, field):
    """
    validates the start date
    """
    if field.data < date.today():
        raise ValidationError('Start date cannot be in the past.')

def validate_end_date(form, field):
    """
    validates the end date
    """
    if field.data < date.today():
        raise ValidationError('End date cannot be in the past.')
    if field.data < form.start_date.data:
        raise ValidationError('End date cannot be before the start date.')

def validate_project_image(form, field):
    if field.data:
        if not FileAllowed(ALLOWED_EXTENSIONS)(field.data):
            raise ValidationError("Invalid file format")

class ProjectForm(FlaskForm):
  creator_id = IntegerField("creator id", validators=[DataRequired()])
  category_id = IntegerField("category id", validators=[DataRequired()])
  title = StringField("title", validators=[DataRequired()])
  description = StringField("description")
  story = StringField("story")
  faq = StringField("faq")
  project_image = FileField("image file", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
  start_date = DateField("start date", validators=[DataRequired(), validate_start_date])
  end_date = DateField("end date", validators=[DataRequired(), validate_end_date])
  funding_goal = FloatField("funding goal", validators=[DataRequired(), NumberRange(min=1)])
  location = StringField("location", validators=[DataRequired()])
