from flask import Blueprint, jsonify
from app.models import UserStock
from auth_routes import authenticate

user_routes = Blueprint('portfolio', __name__)


@user_routes.route('/')
@authenticate
def current_user_portfolio():
  """Gathers all info for the Current User's portfolio"""
  return "test hello"
