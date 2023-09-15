from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class BackingForm(FlaskForm):
  user_id = IntegerField("user id", validators=[DataRequired()])
  project_id = IntegerField("project id", validators=[DataRequired()])
  reward_id = IntegerField("reward id")
  amount_pledged = IntegerField("amount pledged", validators=[DataRequired()])
