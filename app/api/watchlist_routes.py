from flask import Blueprint, jsonify, request
from app.models import Portfolio, User, Company, Watchlist_detail
from flask_login import login_required, current_user
from app.models import Watchlist
from app import db

# from forms import WatchListForm

watchlist_routes = Blueprint("watchlists", __name__)

# GET USER WATCHLIST BASED ON ID
@watchlist_routes.route("/<int:watchlist_id>")
@login_required
def get_user_watchlist(user_id):

    current_user_id = current_user.id
    watchlist = Watchlist.query.filter(Watchlist.user_id == current_user_id).first()

    return watchlist.to_dict()


# CREATE NEW WATCHLIST
@watchlist_routes.route("/new", methods=["POST"])
@login_required
def create_user_watchlist():

    name = request.json.get("name")
    current_user_id = current_user.id

    # !set up for new watchlist with name, companies in data
    watchlists = Watchlist.query.filter(Watchlist.user_id == current_user_id).all()
    for i in range(len(watchlists)):
        watchlist = watchlists[i].to_dict()

        if str(watchlist["name"]) == str(name):
            return {"error": "watchlist already exists"}, 400

    new_watchlist = Watchlist(
        name=name,
        user_id=current_user_id
    )

    db.session.add(new_watchlist)
    db.session.commit()

    print("NEW WATCHLIST:", new_watchlist.to_dict())

    return new_watchlist.to_dict()


# ADD COMPANY TO WATCHLIST
@watchlist_routes.route("/<int:watchlist_id>/add", methods=["POST"])
@login_required
def add_to_user_watchlist(watchlist_id):
    company_id = request.json.get("company_id")
    user_id = current_user.id
    watchlist = Watchlist.query.filter_by(id=watchlist_id, user_id=user_id).first()

    if not watchlist:
        return {"error": "Watchlist not found or does not belong to the user"}, 404

    # cannot add same company to existing watchlist
    all_companies_watched = Watchlist_detail.query.filter(Watchlist_detail.watchlist_id == watchlist_id).all();
    for i in range(len(all_companies_watched)):
        watchlist_check = all_companies_watched[i].to_dict()

        if int(watchlist_check["company_id"]) == int(company_id):
            return {"error": "Watchlist already includes this Company"}, 400


    company = Company.query.get(company_id)
    if not company:
        return {"error": "Company not found"}, 404

    print("test1")

    new_watchlist_detail = Watchlist_detail(
        watchlist_id=watchlist_id,
        company_id=company_id
    )


    db.session.add(new_watchlist_detail)
    db.session.commit()

    print("test2")
    return new_watchlist_detail.to_dict()

    # return {"error": "Unauthorized"}, 403
