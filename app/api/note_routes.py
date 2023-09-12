from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.forms import RewardForm
from app.models import Reward
from app import db

note_routes = Blueprint('notes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@note_routes.route("/<int:id>", methods=["PUT"])
def update_reward(id):
    form = RewardForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    reward = Reward.query.get(id)

    if form.validate_on_submit():
        reward.title = form.data["title"],
        reward.description = form.data["description"]
        db.session.commit()
        return {"Message": "reward updated"}
    else:
        return {"errors": form.errors}
