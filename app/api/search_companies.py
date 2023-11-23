from flask import request, jsonify, Blueprint
from flask_login import login_required, current_user
from app.models import Company, db

search_companies_routes = Blueprint("search_companies", __name__)


@search_companies_routes('/search_companies', methods=['GET'])
def search_companies():
    # Get the search query from URL parameters
    search_query = request.args.get('query', '')
    if search_query:
        results = Company.query.filter(
            (Company.name.ilike(f'%{search_query}%')) |
            (Company.symbol.ilike(f'%{search_query}%'))
        ).all()

        return jsonify([company.to_dict() for company in results])
    else:
        return jsonify([])
