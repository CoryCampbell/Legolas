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

    # res = request.json.get('https://api.github.com')
    # print(user_id)
    # print("url ----->", url)
    name = request.json.get("name")
    # print("request.data --------->", name)

    # !set up for new watchlist with name, companies in data
    watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()
    for i in range(len(watchlists)):
        watchlist = watchlists[i].to_dict()
        print("watchlist ------->", watchlist)
        if watchlist["name"] == name:
            return {"error": "watchlist already exists"}, 400
    #     company = Company.query.filter(Company.id == watchlist.company_id).first()
    #     new_watchlist = Watchlist(
    #         name=request.data, user_id=user_id, company_id=company.id
    #     )
    #     # response = request.post(url,json=new_watchlist)
    #     return new_watchlist.to_dict()
    #     # db.session.add(new_watchlist)
    #     # db.session.commit()

    # new watchlist with just the name
    new_watchlist2 = Watchlist(name=name, user_id=user_id, company_id="NULL")

    # print("new ------->", new_watchlist2)

    db.session.add(new_watchlist2)
    db.session.commit()

    return new_watchlist2.to_dict()



@watchlist_routes.route("/<int:user_id>/add", methods=["POST"])
@login_required
def add_to_user_watchlist(company_id):

    watchlist = Watchlist.query.filter(Watchlist.company_id == company_id).first()
    watchlist_name = watchlist.name
    user_id = current_user.id
    new_company_to_watch = Watchlist(
        name = watchlist_name,
        user_id = user_id,
        company_id = company_id
    )

    print(new_company_to_watch)


    # company_id = request.json.get('company_id')
    # print(company_id, "COMPANY ID =============")

    # if current_user.id != user_id:
    #     return jsonify({"error": "User not authorized"}), 403

    # user = User.query.filter_by(id=user_id).all()
    # Company = Company.query.filter_by().all()

    # watchlist = Watchlist.query.filter_by(user_id == user.id).all()

    # existing_watchlist = Watchlist.query.filter_by(
    #     user_id == user.id, company_id=company_id).all()
