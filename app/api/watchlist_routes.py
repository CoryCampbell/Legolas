from flask import Blueprint, jsonify, request
from app.models import UserStock, User, Company
from flask_login import login_required, current_user
from app.models import Watchlist
from forms import WatchListForm

watchlist_routes = Blueprint("watchlist", __name__)


@watchlist_routes.route("/<int:user_id>/watchlist", methods=["POST"])
@login_required
def create_user_watchlist(user_id):
    form = WatchListForm()

    if form.validate_on_submit():
        

    company_id = request.json.get('company_id')
    print(company_id, "COMPANY ID =============")

    if current_user.id != user_id:
        return jsonify({"error": "User not authorized"}), 403

    user = User.query.filter_by(id=user_id).all()
    Company = Company.query.filter_by().all()

    watchlist = Watchlist.query.filter_by(user_id == user.id).all()

    existing_watchlist = Watchlist.query.filter_by(
        user_id == user.id, company_id=company_id).all()
