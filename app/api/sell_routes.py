from flask import Blueprint, jsonify, request
from datetime import datetime
from app.models import db, User, Company, Transaction, Portfolio, Stocks_owned
from flask_login import login_required, current_user

sell_routes = Blueprint("sell", __name__)


@sell_routes.route("/<int:company_id>", methods=["POST"])
@login_required
def sell(company_id):
    user = current_user
    # number_of_shares = request.json.get("number_of_shares")
    company = Company.query.get(company_id)
    number_of_shares_to_sell = request.json.get("number_of_shares_to_sell")

    # Validate the data

    if current_user.id != user.id:
        return jsonify({"error": "User not authorized"}), 403

    if float(number_of_shares_to_sell) <= 0:
        return jsonify({"error": "Invalid number of shares"}), 400

    if not company:
        return jsonify({"error": "Company does not exist"}), 404

    # Check if user owns the stock and has enough shares to sell
    user_stock = Portfolio.query.filter_by(
        user_id=user.id, company_id=company_id
    ).first()

    if not user_stock or int(user_stock.shares) < int(number_of_shares_to_sell):
        return jsonify({"error": "Not enough shares to sell"}), 400

    # Update UserStock
    user_stock.shares -= int(number_of_shares_to_sell)
    user_stock.price -= int(number_of_shares_to_sell) * company.price
    if user_stock.shares == 0:
        db.session.delete(user_stock)

    # If user has sold all shares for this company, delete from Stocks_owned
    stocks_owned = Stocks_owned.query.filter_by(
        user_id=user.id, company_id=company_id
    ).first()

    stocks_owned.amt_shares -= int(number_of_shares_to_sell)

    if stocks_owned.amt_shares <= 0:
        db.session.delete(stocks_owned)

    # Create a transaction for the sale
    sale_transaction = Transaction(
        user_id=user.id,
        company_id=company_id,
        total=company.price * int(number_of_shares_to_sell),
        type="sell",
    )
    db.session.add(sale_transaction)

    # Update user's balance
    user.balance += company.price * int(number_of_shares_to_sell)

    try:
        db.session.commit()
        return jsonify({"message": "Shares sold successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error processing transaction"}), 500
