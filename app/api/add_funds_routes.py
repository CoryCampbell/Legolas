from flask import Blueprint, jsonify, request
from datetime import datetime
from app.models import db, User, Company, Transaction, Portfolio, Stocks_owned
from flask_login import login_required, current_user

add_funds_routes = Blueprint("addFunds", __name__)

@add_funds_routes.route("/add_funds", methods=["POST"])
# @login_required
def addfunds():
  user_id = request.json.get('user_id')
  amount_to_add = request.json.get('amount')
  
  if amount_to_add <= 0:
        return jsonify({"error": "Invalid amount"}), 400

  if current_user.id != user_id:
        return jsonify({"error": "User not authorized"}), 403
  
  user = User.query.get(user_id)

  user.balance += amount_to_add

  try:
      db.session.commit()
      return jsonify({"message": "Funds added successfully", "new_balance": user.balance}), 200
  except Exception as e:
      db.session.rollback()
      return jsonify({"error": "Error updating balance"}), 500