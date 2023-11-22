from flask import Blueprint, jsonify, request
from app.models import UserStock, User, Company
from flask_login import login_required, current_user
from app.models import Watchlist
from app import db

# from forms import WatchListForm

watchlist_routes = Blueprint("watchlists", __name__)


@watchlist_routes.route("/<int:user_id>", methods=["POST"])
@login_required
def create_user_watchlist(user_id):
    url = request.url
    name = request.json.get("name")


    # !set up for new watchlist with name, companies in data
    watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()
    for i in range(len(watchlists)):
        watchlist = watchlists[i].to_dict()
        print("watchlist ------->", watchlist)
        if watchlist["name"] == name:
            return {"error": "watchlist already exists"}, 400

    new_watchlist2 = Watchlist(name=name, user_id=user_id, company_id="NULL")


    db.session.add(new_watchlist2)
    db.session.commit()

    return new_watchlist2.to_dict()



# Add a Company to a User's Watchlist By Watchlist Name

#                           /watchlists/watchlist_name/add
#                           /
@watchlist_routes.route("/<int:>/add", methods=["POST"])
@login_required
def add_to_user_watchlist(watchlist_id):
    company_id = request.json.get("company_id")
    watchlist = Watchlist.query.filter(Watchlist.company_id == company_id).first()
    watchlist_name = watchlist.name
    user_id = current_user.id

    #cannot add same company to existing watchlist
    watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()
    for i in range(len(watchlists)):
        watchlist_check = watchlists[i].to_dict()
        if watchlist_check["company_id"] == company_id:
            return {"error": "Your watchlist already includes this Company"}, 400

    new_company_to_watch = Watchlist(
        name = watchlist_name,
        user_id = user_id,
        company_id = company_id
    )

    db.session.add(new_company_to_watch)
    db.session.commit()

    print(new_company_to_watch)

    return new_company_to_watch.to_dict()
