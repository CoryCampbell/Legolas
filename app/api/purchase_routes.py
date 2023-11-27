from flask import Blueprint, jsonify, request
from datetime import datetime
from app.models import db, User, Company, Transaction, Portfolio
from flask_login import login_required, current_user

purchase_routes = Blueprint("purchases", __name__)


@purchase_routes.route("/<int:company_id>", methods=["POST"])
# @login_required
def purchase(company_id):
    user = current_user
    user_id = current_user.id
    number_of_shares = request.json.get("number_of_shares")

    # Validate the data
    if float(number_of_shares) <= 0:
        return jsonify({"error": "Invalid number of shares"}), 400

    company = Company.query.get(company_id)

    if not company:
        return jsonify({"error": "Company does not exist"}), 404

    if not user:
        return jsonify({"error": "User does not exist"}), 400

    if user.balance < company.price * float(number_of_shares):
        return (
            jsonify({"error": "Insufficient funds, transaction cannot be processed"}),
            400,
        )

    # Update or create Portfolio
    portfolio = Portfolio.query.filter_by(
        user_id=user_id, company_id=company_id
    ).first()
    if portfolio:
        portfolio.shares += float(number_of_shares)
        # portfolio.price += company.price * float(number_of_shares)
        print(portfolio.shares, "==============> USER SHARES")
        # print(new_stock.price, "==============> USER PRICE")
    else:
        new_stock = Portfolio(
            user_id=user_id,
            company_id=company_id,
            shares=float(number_of_shares),
            price=company.price * float(number_of_shares),
        )
        print(new_stock.price, "==============> NEW STOCK")
        db.session.add(new_stock)

    # Create a transaction
    new_transaction = Transaction(
        user_id=user_id,
        company_id=company_id,
        total=company.price * float(number_of_shares),
        type="buy",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    db.session.add(new_transaction)

    print(new_transaction, "===========> NEW TRANSACTION")

    # Update user's balance
    user.balance -= company.price * float(number_of_shares)

    print(user.balance, "==============> USER BALANCE")

    # Commit changes
    try:
        db.session.commit()
        return jsonify({"message": "Shares purchased successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error processing transaction"}), 500
