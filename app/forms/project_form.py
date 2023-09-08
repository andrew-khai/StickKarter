from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, FloatField
from wtforms.validators import DataRequired, ValidationError, NumberRange

class ProjectForm(FlaskForm):
  creator_id = IntegerField("creator id", validators=[DataRequired()])
  category_id = IntegerField("category id", validators=[DataRequired()])
  title = StringField("title", validators=[DataRequired()])
  description = StringField("description")
  story = StringField("story")
  faq = StringField("faq")
  project_image = StringField("project image", validators=[DataRequired()])
  start_date = DateField("start date", validators=[DataRequired()])
  end_date = DateField("end date", validators=[DataRequired()])
  funding_goal = FloatField("funding goal", validators=[DataRequired(), NumberRange(min=1)])
  location = StringField("location", validators=[DataRequired()])
