from flask import Blueprint, jsonify
from app.models import Portfolio, User, Company
from flask_login import login_required, current_user

portfolio_routes = Blueprint("portfolio", __name__)


@portfolio_routes.route("/<int:user_id>")
@login_required
def current_user_portfolio(user_id):
    """Gathers all info for the Current User's portfolio"""

    if current_user.id != user_id:
        return jsonify({"error": "User not authorized"}), 403

    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    portfolioItems = Portfolio.query.filter_by(user_id=user_id).all()

    portfolio = {data.id: data.to_dict() for data in portfolioItems}

    return jsonify(portfolio)
