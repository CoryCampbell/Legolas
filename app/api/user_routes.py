from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Company, Watchlist

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/watchlist')
@login_required
def watchlists(id):
    """
    Query for getting a user's watchlist by the user's ID
    """
    user = User.query.get(id)
    print(type(user),'user here ----------------')
    watchlists = Watchlist.query.filter(Watchlist.user_id == user.id).all()
    for i in range(len(watchlists)):
        watchlist = watchlists[i]
        company = Company.query.filter(Company.id == watchlist.company_id)
        print([comp.to_watchlist() for comp in company], 'test-----------')
        if i == len(watchlists) - 1 :
            return {'watchlists': [comp.to_watchlist() for comp in company]}

    # [watchlist.company_id for watchlist in watchlists]
    # companies = Company.query.filter(Company.id == [watchlist.company_id for watchlist in watchlists])
    # print(companies,' look ----------')
    # print(type(watchlists), 'look here -----------------')
    # see_watchlists = [watchlist.to_dict() for watchlist in watchlists]
    # print(see_watchlists, 'see here ------------')
    # return {'watchlists' : [watchlist.to_dict() for watchlist in watchlists]}
