from flask import jsonify
from app.api import bp
from werkzeug.http import HTTP_STATUS_CODES

def error_response(status_code, message=None):
    payload = {'error': HTTP_STATUS_CODES.get(status_code, 'Unknown error')}
    if message:
        payload['message'] = message
    response = jsonify(payload)
    response.status_code = status_code
    return response

@bp.app_errorhandler(400)
def bad_request(error):
    return error_response(400)

@bp.app_errorhandler(401)
def unauthorized(error):
    return error_response(401)

@bp.app_errorhandler(403)
def forbidden(error):
    return error_response(403)

@bp.app_errorhandler(404)
def not_found(error):
    return error_response(404)

@bp.app_errorhandler(429)
def too_many_requests(error):
    return error_response(429)

@bp.app_errorhandler(500)
def internal_server_error(error):
    return error_response(500) 