from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Backing

backing_routes = Blueprint('backings', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@backing_routes.route("")
def backings():
  """
  Query for all backings and return them in a list of backings dictionaries
  """
  backings = Backing.query.all()
  return {'backings': [backing.to_dict() for backing in backings]}
