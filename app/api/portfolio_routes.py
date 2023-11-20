from flask import Blueprint, jsonify
from app.models import UserStock
from flask_login import login_required

portfolio_routes = Blueprint("portfolio", __name__)


@portfolio_routes.route("/")
@login_required
def current_user_portfolio():
    """Gathers all info for the Current User's portfolio"""
    return "test hello"
