from flask import Blueprint, jsonify, request
from app.models import Portfolio, User, Company, Watchlist_detail, Watchlist
from flask_login import login_required, current_user
from app import db

# from forms import WatchListForm

watchlist_routes = Blueprint("watchlists", __name__)

# GET ALL COMPANY DETAILS FROM A WATCHLIST BASED ON WATCHLIST ID
@watchlist_routes.route("/current/<int:watchlist_id>")
@login_required
def get_user_watchlist_details(watchlist_id):

    print("WATCHLIST ID============ ", watchlist_id)
    # USED TO GET THE WATCHLIST
    watchlist = Watchlist.query.filter(Watchlist.id == watchlist_id).first()

    # USED TO GET ALL COMPANIES INCLUDED IN WATCHLIST
    all_watchlist_companies = [list for list in Watchlist_detail.query.filter(Watchlist_detail.watchlist_id == watchlist.id)]

    # USED TO GET ALL DETAILS OF ALL COMPANIES IN WATCHLIST
    all_company_details = []

    for company in all_watchlist_companies:
        company_details = Company.query.filter(Company.id == company.company_id).first()
        all_company_details.append(company_details.to_dict())


    print("============> all company details: ", all_company_details)
    return jsonify(all_company_details)


# GET ALL WATCHLISTS OF A CURRENT USER
@watchlist_routes.route("/<int:user_id>")
@login_required
def get_all_user_watchlists(user_id):

    all_user_watchlists = [list.to_dict() for list in Watchlist.query.filter(Watchlist.user_id == user_id)]

    return jsonify(all_user_watchlists)







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
