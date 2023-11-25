from flask import Blueprint, jsonify
from app.models import Portfolio, User, Company, Transaction
from flask_login import login_required, current_user

transaction_routes = Blueprint("transactions", __name__)


@transaction_routes.route("/<int:user_id>")
@login_required
def current_user_transactions(user_id):
    """Gathers all info for the Current User's portfolio"""

    if current_user.id != user_id:
        return jsonify({"error": "User not authorized"}), 403

    user = User.query.filter_by(id=user_id).all()

    transactions = Transaction.query.filter_by(user_id=user_id).all()

    if not user:
        return jsonify({"error": "User not found"}), 404

    transactions_data = {data.id: data.to_dict() for data in transactions}

    return jsonify(transactions_data)
