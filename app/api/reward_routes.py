from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app import db
from app.models import Reward, Project
from app.forms import RewardForm

reward_routes = Blueprint('rewards', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@reward_routes.route("/<int:id>")
def get_reward(id):
    """
    Test route to get specific reward
    """
    reward = Reward.query.get(id)
    if not reward:
        return {"errors": ["Reward not found"]}, 404
    return reward.to_dict()

@reward_routes.route("/<int:id>", methods=["PUT"])
def update_reward(id):
    form = RewardForm()
    reward = Reward.query.get(id)
    project = Project.query.get(reward.project_id)

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        reward.title = form.data["title"]
        reward.description = form.data["description"]
        reward.price = form.data["price"]
        db.session.commit()
        return {"reward": reward.to_dict()}
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}

@reward_routes.route("/<int:id>", methods=["DELETE"])
def delete_reward(id):
    reward = Reward.query.get(id)

    if not reward:
      return {"errors": ["Reward not found"]}, 404

    db.session.delete(reward)
    db.session.commit()
    return {"message": "Reward deleted"}
