from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from app.models import User, Company


class WatchListForm(FlaskForm):
    selectName = StringField("name", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    submit = SubmitField("submit")
