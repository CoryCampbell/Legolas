from flask import Blueprint, jsonify
from app.models import UserStock, User, Company
from flask_login import login_required

portfolio_routes = Blueprint("portfolio", __name__)


@portfolio_routes.route("/<int:user_id>")
@login_required
def current_user_portfolio(user_id):
    """Gathers all info for the Current User's portfolio"""

    user = User.query.filter_by(id=user_id).all()

    portfolio = UserStock.query.filter_by(user_id=user_id).all()

    if not user:
        return jsonify({"error": "User not found"}), 404

    portfolio_data = {data.id: data.to_dict() for data in portfolio}

    print("data ------->", portfolio_data)

    return jsonify(portfolio_data)
