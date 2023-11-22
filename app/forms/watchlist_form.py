from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from app.models import User, Company


class WatchListForm(FlaskForm):
    selectName = StringField("name", validators=[DataRequired()])
    company_id = IntegerField("company_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    submit = SubmitField("submit")
